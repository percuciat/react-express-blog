import { combineReducers, configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/post';
import categoryReducer from './slices/category';

const rootReducer = combineReducers({
  post: postReducer,
  category: categoryReducer,
});

export const store = (initialState: any = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};

export type TStore = typeof store;
export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = ReturnType<typeof store>['dispatch'];
