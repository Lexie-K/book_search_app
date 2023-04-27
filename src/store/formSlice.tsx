import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    openForm: state => {
      state.isOpen = true;
    },
    closeForm: state => {
      state.isOpen = false;
    },
  },
});

export const { openForm, closeForm } = formSlice.actions;

export default formSlice.reducer;
