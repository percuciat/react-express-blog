import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  resetErrorsFromStore,
  setCurrentCategory,
} from './actions';
import { TypeCategoryState } from './types';
import { TypeRootState } from 'shared/config';

const initialState: TypeCategoryState = {
  categories: [],
  currentCategory: '',
  isLoading: false,
  errors: {},
};

export const { actions, reducer } = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentCategory, (state, action) => {
        state.currentCategory = action.payload;
      })
      .addCase(resetErrorsFromStore, (state) => {
        state.errors = {};
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        // state.errors = {};
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.data;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.error
      })

      .addCase(createCategory.pending, (state, action) => {
        state.isLoading = true;
        // state.errors = {};
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remember - not provide empty Array [] -> any[]
        state.categories.push(action.payload.data);
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.error;
      })

      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
        //state.errors = {};
      })

      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = state.categories.filter((el) => el.id !== payload);
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.error;
      });
  },
});

export const selectCategoryData = (state: TypeRootState) => state.category.categories;
export const selectCurrentCategory = (state: TypeRootState) => state.category.currentCategory;
export const selectIsLoading = (state: TypeRootState) => state.category.isLoading;
export const selectCategoryErrors = (state: TypeRootState) => state.category.errors;
