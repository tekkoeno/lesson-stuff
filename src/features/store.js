import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import categories from './categories/slice';
import products from './products/slice';
import user from './user/userSlice';

export const store = configureStore({
  reducer: {
    categories,
    products,
    [apiSlice.reducerPath]: apiSlice.reducer,
    user,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
