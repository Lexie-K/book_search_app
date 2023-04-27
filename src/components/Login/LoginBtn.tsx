import React, { useEffect } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './StyledLogin.css';
import Form from 'components/Form/Form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from 'hook';
import { setUser } from 'store/userSlice';
import { openForm } from 'store/formSlice';
import { useNavigate } from 'react-router-dom';

const LoginBtn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    console.log({ auth });
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        })
      );
      navigate('/');  
    });
  };
  const { isOpen } = useAppSelector(state => state.form);
  const handleOpen = () => {
    dispatch(openForm());
    navigate('/loginpage');
  };


  return (
    <>
      <div className="styledLoginBtn">
        <button onClick={handleOpen}>
          <AccountCircleRoundedIcon />
        </button>
        <p className="styledLogIn">Log In</p>
      </div>
      {isOpen && (
        <div className="styledContainerForm">
          <Form title="Log In" handleClick={handleLogin} />
        </div>
      )}
    </>
  );
};

export default LoginBtn;
