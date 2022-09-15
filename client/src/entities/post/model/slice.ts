import { createSlice, current } from '@reduxjs/toolkit';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  resetErrorsFromStore,
  setOpenModal,
  setLocalPostInfo,
  resetNotification,
  showNotification
} from './actions';
import { TypePostState } from './types';
import { TypeRootState, startAppListening } from 'shared/config';

// Create the middleware instance and methods

/* startAppListening({
  type: 'post/FETCH_POSTS',
  effect: (action, listenerApi) => {
    const user = selectUserDetails(listenerApi.getState())

    const { specialData } = action.meta

    analyticsApi.trackUsage(action.type, user, specialData)
  },
}) */

const initialState: TypePostState = {
  posts: [],
  isOpenModal: false,
  postInfoForModal: {
    info: {},
    titleModal: '',
    operation: '',
  },
  pagination: {
    current: 1,
    minIndex: 0,
    maxIndex: 5,
    postsOnPage: 5,
  },
  notification: null,
  isLoading: false,
  errors: null,
};

export const { actions, reducer } = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLocalPostInfo, (state, action) => {
        //state.isOpenModal = true;
        state.postInfoForModal = action.payload;
      })
      .addCase(showNotification, (state, action) => {
        state.notification = action.payload;
      })
      .addCase(setOpenModal, (state, action) => {
        state.isOpenModal = action.payload;
      })
      .addCase(resetErrorsFromStore, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(resetNotification, (state, action) => {
        state.notification = action.payload;
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
        /* state.notification = {
          type: 'success',
          message: 'Post has created!',
        };
        state.isOpenModal = false; */
      })

      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.error;
       /*  state.notification = {
          type: 'error',
          message: 'Error has happened!',
        }; */
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
        state.notification = {
          type: 'success',
          message: 'Post has updated!',
        };
        state.isOpenModal = false;
      })

      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.error;
      })

      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
        //state.errors = {};
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter((el) => el.id !== action.payload);
        /* state.notification = {
          type: 'success',
          message: 'Post has deleted!',
        }; */
      })

      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.error;
      });
  },
});

export const selectPostData = (state: TypeRootState) => state.post.posts;
export const selectPostLoading = (state: TypeRootState) => state.post.isLoading;
export const selectPostErrors = (state: TypeRootState) => state.post.errors;
export const selectPostModalStatus = (state: TypeRootState) => state.post.isOpenModal;
export const selectPostInfoForModal = (state: TypeRootState) => state.post.postInfoForModal;
export const selectPostListPagination = (state: TypeRootState) => state.post.pagination;
export const selectPostNotification = (state: TypeRootState) => state.post.notification;
