import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './models';

const initialState : IUser
 = {
  email: '',
  token: '',
  id: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = '';
      state.token = '';
      state.id = '';
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
