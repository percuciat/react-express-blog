import { createSlice, current } from '@reduxjs/toolkit';
import { fetchPosts, createPost, updatePost, deletePost } from './actions';

const { actions, reducer } = createSlice({
  name: 'post',
  initialState: {
    posts: [] as any,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, function addFetchedPostsToStore(state, action) {
        state.isLoading = false;
        state.posts = action.payload;
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(createPost.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createPost.fulfilled, function addCreatedPostToStore(state, { payload }) {
        state.isLoading = false;
        state.posts.push(payload);
      })

      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(updatePost.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updatePost.fulfilled, function addUpdatedPostToStore(state, { payload }) {
        const { _id } = payload as any;
        state.posts = state.posts.map((el) => {
          if (el._id === _id) {
            return payload;
          }
          return el;
        });
        state.isLoading = false;
      })

      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deletePost.fulfilled, function addCreatedPostToStore(state, { payload }) {
        state.isLoading = false;
        const { _id } = payload as any;
        state.posts = state.posts.filter((el) => el._id !== _id);
      })

      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const selectPostData = (state) => state.post.posts;
export const selectPostLoading = (state) => state.post.isLoading;

export default reducer;
