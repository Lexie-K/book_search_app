import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterBooksSlice';
import detailslReducer from './detailsSlice';

const store = configureStore({
  reducer: {
    filter: filterReducer,
    details: detailslReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;