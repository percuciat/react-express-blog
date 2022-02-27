import { createSlice, current } from '@reduxjs/toolkit';
import { fetchCategories, createCategory, deleteCategory, resetErrorsFromStore } from './actions';

const { actions, reducer } = createSlice({
  name: 'category',
  initialState: {
    categories: [] as any,
    isLoading: false,
    errors: {} as any,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetErrorsFromStore, (state, action) => {
        state.errors = {};
      })
      .addCase(fetchCategories.pending, (state, action) => {
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
export const selectIsLoading = (state) => state.category.isLoading;
export const selectCategoryErrors = (state) => state.category.errors;

export default reducer;
