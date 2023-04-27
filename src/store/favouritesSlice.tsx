import { createSlice } from '@reduxjs/toolkit';
import { FavoritesBooks } from './models';

const initialState: FavoritesBooks = {
  favouritesBooks: [],
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      state.favouritesBooks = [...state.favouritesBooks, action.payload];
      debugger;
    },
    removeFromFavourites: (state, action) => {
      state.favouritesBooks = state.favouritesBooks.filter(
        item => item.id !== action.payload
      );
      debugger;
    },
  },
});

export const { addToFavourites, removeFromFavourites } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
