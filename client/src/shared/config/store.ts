import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as PostReducer } from 'entities/post';
import { reducer as CategoryReducer } from 'entities/category';

const rootReducer = combineReducers({
  post: PostReducer,
  category: CategoryReducer,
});

export const store = (initialState: any = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};

export type TypeStore = typeof store;
export type TypeRootState = ReturnType<typeof rootReducer>;
export type TypeAppDispatch = ReturnType<typeof store>['dispatch'];
