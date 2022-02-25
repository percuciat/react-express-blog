import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/post';
import categoryReducer from './slices/category';

export const store = configureStore({
  reducer: {
    post: postReducer,
    category: categoryReducer
  }
});

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = Store['dispatch'];
