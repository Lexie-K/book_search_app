import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  currentbook: [],
  status: 'idle',
  error: null,
  message: '',
};

export const fetchBookDetails = createAsyncThunk(
  'details/fetchBookDetails',
  async ({ id }, thunkAPI) => {
    try {
      const apiKey = 'AIzaSyAQBwSmYFAHONvjiEu1FM4apzhkEMccURo';

      if (id) {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
        );
        return response.data;
      }
    } catch (err) {
      const message = (err.response && err.response.data) || err.message;
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
      state.currentbook = [];
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
        state.currentbook = [];
        state.error = action.payload;
        state.message = action.payload;
      });
  },
});

export const { setCurrentBook, setReset } = detailsSlice.actions;

export default detailsSlice.reducer;
