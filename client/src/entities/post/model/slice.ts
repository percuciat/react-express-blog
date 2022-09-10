import { createSlice, current } from '@reduxjs/toolkit';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  resetErrorsFromStore,
  setOpenModal,
  setLocalPostInfo,
} from './actions';
import { TypePostState } from './types';
import { TypeRootState } from 'shared/config';

const initialState: TypePostState = {
  posts: [],
  isOpenModal: false,
  postInfoForModal: {
    info: {},
    titleModal: '',
    operation: '',
  },
  isLoading: false,
  errors: {},
};

export const { actions, reducer } = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(setLocalPostInfo, (state, action) => {
        state.isOpenModal = true;
        state.postInfoForModal = action.payload;
      })
      .addCase(setOpenModal, (state, action) => {
        state.isOpenModal = action.payload;
      })
      .addCase(resetErrorsFromStore, (state, action) => {
        state.errors = {};
      })

      .addCase(fetchPosts.pending, (state, action) => {
        state.isLoading = true;
        //state.errors = {};
      })
      .addCase(fetchPosts.fulfilled, function addFetchedPostsToStore(state, action) {
        state.isLoading = false;
        state.posts = action.payload.data;
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.error;
      })

      .addCase(createPost.pending, (state, action) => {
        state.isLoading = true;
        //state.errors = {};
      })

      .addCase(createPost.fulfilled, function addCreatedPostToStore(state, action) {
        state.isLoading = false;
        state.posts.push(action.payload.data);
      })

      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.error;
      })

      .addCase(updatePost.pending, (state, action) => {
        state.isLoading = true;
        //state.errors = {};
      })

      .addCase(updatePost.fulfilled, function addUpdatedPostToStore(state, { payload }) {
        const { id } = payload as any;
        state.posts = state.posts.map((el) => {
          if (el.id === id) {
            return payload;
          }
          return el;
        });
        state.isLoading = false;
      })

      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })

      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
        state.errors = {};
      })

      .addCase(deletePost.fulfilled, function addCreatedPostToStore(state, { payload }) {
        state.isLoading = false;
        const { id } = payload as any;
        state.posts = state.posts.filter((el) => el.id !== id);
      })

      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export const selectPostData = (state: TypeRootState) => state.post.posts;
export const selectPostLoading = (state: TypeRootState) => state.post.isLoading;
export const selectPostErrors = (state: TypeRootState) => state.post.errors;
export const selectPostModalStatus = (state: TypeRootState) => state.post.isOpenModal;
export const selectPostInfoForModal = (state: TypeRootState) => state.post.postInfoForModal;
