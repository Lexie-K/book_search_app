import React from 'react';
import Form from 'components/Form/Form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from 'hook';
import { setUser } from 'store/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
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
  return (
    <>
      <Form title="Log In" handleClick={handleLogin} />
    </>
  );
};

export default LoginPage;
