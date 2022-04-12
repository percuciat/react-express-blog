import { createSlice, current } from '@reduxjs/toolkit';
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  resetErrorsFromStore,
  setCurrentCategory,
} from './actions';
import { CategoryState } from './types';

const initialState: CategoryState = {
  categories: [],
  currentCategory: '',
  isLoading: false,
  errors: {},
};

const { actions, reducer } = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentCategory, (state, action) => {
        state.currentCategory = action.payload.currentCategory;
      })
      .addCase(resetErrorsFromStore, (state) => {
        state.errors = {};
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(fetchCategories.fulfilled, function addFetchedPostsToStore(state, action) {
        state.isLoading = false;
        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })

      .addCase(createCategory.pending, (state, action) => {
        state.isLoading = true;
        state.errors = {};
      })

      .addCase(createCategory.fulfilled, function addCreatedPostToStore(state, { payload }) {
        state.isLoading = false;
        state.categories.push(payload);
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })

      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
        state.errors = {};
      })

      .addCase(deleteCategory.fulfilled, function addCreatedPostToStore(state, { payload }) {
        state.isLoading = false;
        state.categories = state.categories.filter((el) => el._id !== payload._id);
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export const selectCategoryData = (state) => state.category.categories;
export const selectCurrentCategory = (state) => state.category.currentCategory;
export const selectIsLoading = (state) => state.category.isLoading;
export const selectCategoryErrors = (state) => state.category.errors;

export default reducer;
