import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BookDetailsState } from './models';

const initialState: BookDetailsState = {
  currentbook: null,
  status: 'idle',
  error: null,
  message: '',
};

export const fetchBookDetails = createAsyncThunk(
  'details/fetchBookDetails',
  async (id: string, thunkAPI) => {
    try {
      const apiKey = 'AIzaSyAQBwSmYFAHONvjiEu1FM4apzhkEMccURo';
      const HOST = 'https://www.googleapis.com/books/v1/volumes';
      if (id) {
        const response = await axios.get(`${HOST}/${id}?key=${apiKey}`);
        return response.data;
      }
    } catch (error: any) {
      const message = (error.response && error.response.data) || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setCurrentBook: (state, action) => {
      state.currentbook = action.payload;
    },
    setReset: state => {
      state.currentbook = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchBookDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentbook = action.payload;
      })

      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.currentbook = null;
        state.error = action.payload as string | null;
        state.message = action.payload as string;
      });
  },
});

export const { setCurrentBook, setReset } = detailsSlice.actions;

export default detailsSlice.reducer;
