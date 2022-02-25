import { createSlice, current } from '@reduxjs/toolkit';
import { fetchCategories, createCategory, deleteCategory } from './actions';

const { actions, reducer } = createSlice({
  name: 'category',
  initialState: {
    categories: [] as any,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, function addFetchedPostsToStore(state, action) {
        state.isLoading = false;
        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(createCategory.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createCategory.fulfilled, function addCreatedPostToStore(state, { payload }) {
        state.isLoading = false;
        state.categories.push(payload);
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteCategory.fulfilled, function addCreatedPostToStore(state, { payload }) {
        state.isLoading = false;
        state.categories = state.categories.filter((el) => el._id !== payload._id);
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const selectCategoryData = (state) => state.category.categories;
export const selectIsLoading = (state) => state.category.isLoading;

export default reducer;
