import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './UserSlice';
import productSlice from './ProductSlice';
import authReducer from './AuthSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productSlice,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;