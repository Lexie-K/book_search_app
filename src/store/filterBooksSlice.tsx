import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MainBooksState, AsyncThunkConfig, IBookResponse } from './models';

const categories = [
  'all',
  'art',
  'biography',
  'computers',
  'history',
  'medical',
  'poetry',
];

const sorting = ['relevance', 'newest'];

const initialState: MainBooksState = {
  varietyOfCategories: categories,
  sortBy: sorting,
  showFilteredCategory: [],
  status: 'idle',
  error: '',
  message: "Can't fetch books",
  inputValue: '',
  categoryValue: 'all',
  sortValue: 'relevance',
  totalItems: 0,
  startPagination: 0,
  showBooks: [],
  showBtn: false,
  items: [],
};

export const fetchFilteredBooks = createAsyncThunk<
  IBookResponse,
  void,
  AsyncThunkConfig
>('filter/fetchFilteredBooks', async (_, thunkAPI) => {
  const state = thunkAPI.getState().filter;
  const startPagination = state.startPagination;
  let filter = state.categoryValue;

  const search = state.inputValue;
  const sort = state.sortValue;

  try {
    const apiKey = 'AIzaSyAQBwSmYFAHONvjiEu1FM4apzhkEMccURo';

    if (filter === 'all') {
      filter = '*';
    }

    if (search && filter) {
      const response = await axios.get<IBookResponse>(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${search}+subject:${filter}&orderBy=${sort}&startIndex=${startPagination}&maxResults=30&&key=${apiKey}`
      );

      return response.data;
    }

    if (!search) {
      const response = await axios.get<IBookResponse>(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${filter}&orderBy=${sort}&startIndex=${startPagination}&maxResults=30&key=${apiKey}`
      );

      return response.data;
    }

    const response = await axios.get<IBookResponse>(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&subject:${filter}&orderBy=${sort}&key=${apiKey}&startIndex=${startPagination}&maxResults=30`
    );

    return response.data;
  } catch (err: any) {
    const message = (err.response && err.response.data) || err.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const filterBooksSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.inputValue = action.payload;
    },
    setCategory: (state, action) => {
      state.categoryValue = action.payload;
    },
    setSort: (state, action) => {
      state.sortValue = action.payload;
    },
    setLoadmore: state => {
      state.startPagination = state.startPagination + 30;
    },
    setResetBooks: state => {
      state.showFilteredCategory = [];
      state.inputValue = '';
      state.categoryValue = 'all';
      state.sortValue = 'relevance';
      state.totalItems = 0;
      state.startPagination = 0;
      state.showBooks = [];
      state.showBtn = false;
    },
    setResetPagination: state => {
      state.startPagination = 0;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchFilteredBooks.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.totalItems = action.payload.totalItems;
        state.showFilteredCategory = action.payload.items;
        state.showBooks = [...state.showBooks, ...action.payload.items];
        state.showBtn = true;
      })
      .addCase(fetchFilteredBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.showFilteredCategory = [];
        state.error = action.payload as string | null;
        state.message = action.payload as string;
      });
  },
});

export const {
  setInput,
  setCategory,
  setSort,
  setLoadmore,
  setResetBooks,
  setResetPagination,
} = filterBooksSlice.actions;
// Export the reducer, either as a default or named export

export default filterBooksSlice.reducer;
