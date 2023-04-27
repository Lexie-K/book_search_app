import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterBooksSlice';
import detailslReducer from './detailsSlice';
import userReducer from './userSlice';
import formReducer from './formSlice';
import favouritesReducer from './favouritesSlice';
const store = configureStore({
  reducer: {
    filter: filterReducer,
    details: detailslReducer,
    user: userReducer,
    form: formReducer,
    favourites: favouritesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
