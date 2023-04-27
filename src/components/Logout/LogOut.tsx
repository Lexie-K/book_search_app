import React from 'react';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useAppDispatch } from 'hook';
import { removeUser } from 'store/userSlice';
import './StyledLogout.css'
const LogOut = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="styledLogoutBtn">
      <button onClick={()=> dispatch(removeUser())}>
        <ExitToAppOutlinedIcon />
      </button>
      <p className="styledLogOut">Log Out</p>
    </div>
  );
};

export default LogOut;
