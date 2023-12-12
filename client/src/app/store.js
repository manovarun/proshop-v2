import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice';
import cartSliceReducer from '../slices/cartSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devtools: true,
});

export default store;