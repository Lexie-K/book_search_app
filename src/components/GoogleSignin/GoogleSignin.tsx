import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "hook";
import { setUser } from "store/userSlice";
import { Button } from '@mui/material';
const GoogleSignin = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleGoogleSignin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      dispatch(
        setUser({
          email: result.user.email,
          id: result.user.uid,
          token: result.user.refreshToken,
        })
      );
      navigate('/');  
    });
  };

 
  return (
    <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleGoogleSignin}>Use Your Google Account</Button>
  )
};

export default GoogleSignin;
