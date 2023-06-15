import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './UserSlice';
import productSlice from './ProductSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;