import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { makeRequestXHR } from 'shared/lib';
import { TypeLocalPostInfo } from './types';

export const fetchPosts = createAsyncThunk(
  'post/FETCH_POSTS',
  async (params: any, { rejectWithValue }) => {
    try {
      /* params: {
                count: 4,
                page: 1,
                filter: 'desc'
            }*/

      const posts = await makeRequestXHR('get', { url: '/post', params });
      return posts.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createPost = createAsyncThunk(
  'post/CREATE_POST',
  async (postDataForm: any, { rejectWithValue }) => {
    try {
      const newPost = await makeRequestXHR('post', {
        url: '/post',
        data: postDataForm,
      });
      return newPost.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updatePost = createAsyncThunk(
  'post/UPDATE_POST',
  async (updatePostDataForm: any, { rejectWithValue }) => {
    try {
      const newPost = await makeRequestXHR('put', {
        url: '/post/id/:id',
        params: {
          id: updatePostDataForm.id,
        },
        data: updatePostDataForm,
      });
      return newPost.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/DELETE_POST',
  async (idPost: string, { rejectWithValue }) => {
    try {
      const newPost = await makeRequestXHR('delete', {
        url: '/post/id/:id',
        params: {
          id: idPost,
        },
      });
      return newPost.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const resetErrorsFromStore = createAction('post/RESET_ERRORS');
export const setOpenModal = createAction<boolean>('post/OPEN_MODAL');
export const setLocalPostInfo = createAction<TypeLocalPostInfo>('post/SET_postInfoForModal');
