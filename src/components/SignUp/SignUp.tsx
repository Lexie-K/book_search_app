import React from 'react';
import './StyledSignUp.css';
import Form from 'components/Form/Form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from 'hook';
import { setUser } from 'store/userSlice';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        })
      );
      navigate('/loginpage')
    });
  };

  return (
    <div className="styledContainerForm">
      <Form title="Sign Up" handleClick={handleRegister} />
    </div>
  );
};

export default SignUp;
