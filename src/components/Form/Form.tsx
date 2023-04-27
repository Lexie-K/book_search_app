import { Box, TextField, Button, Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react'
import { closeForm } from 'store/formSlice';
import './StyledForm.css'
import { useAppDispatch } from 'hook';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import GoogleSignin from 'components/GoogleSignin/GoogleSignin';

interface Props {
  handleClick: (email: string, password: string) => void; 
  title: string;
}


const Form = ({title, handleClick}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLog = () => {
    handleClick(email,password);
    dispatch(closeForm())
    navigate('/')
  }

  return (
    <div>
      <Box className="styledForm">
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <form className='styledFormSize'>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </form>
        
        <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleLog}>
          {title}
        </Button>
        <p>or</p>
        <GoogleSignin/>
        <Link color="inherit" href="/signuppage" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
      </Box>
      
    </div>
  );
};

export default Form;
