import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { makeRequestXHR, TypeApiResponseData, TypeApiResponseError } from 'shared/api';
import { TypeLocalPostInfo, TypePostResponse, TypePostFormData } from './types';

export const fetchPosts = createAsyncThunk<
  TypeApiResponseData<Array<TypePostResponse> | []>,
  void,
  {
    rejectValue: TypeApiResponseError;
  }
>('post/FETCH_POSTS', async (params, { rejectWithValue }) => {
  try {
    /* params: {
                count: 4,
                page: 1,
                filter: 'desc'
            }*/

    const posts = await makeRequestXHR('get', { url: '/post', params });
    return posts.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const createPost = createAsyncThunk<
  TypeApiResponseData<TypePostResponse>,
  TypePostFormData,
  {
    rejectValue: TypeApiResponseError;
  }
>('post/CREATE_POST', async (postDataForm, { rejectWithValue }) => {
  try {
    const newPost = await makeRequestXHR('post', {
      url: '/post',
      data: postDataForm,
    });
    return newPost.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const updatePost = createAsyncThunk<
  TypeApiResponseData<TypePostResponse>,
  TypePostFormData,
  {
    rejectValue: TypeApiResponseError;
  }
>('post/UPDATE_POST', async (updatePostDataForm, { rejectWithValue }) => {
  try {
    const newPost = await makeRequestXHR('put', {
      url: '/post/id/:id',
      params: {
        id: updatePostDataForm.id,
      },
      data: updatePostDataForm,
    });
    return newPost.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const deletePost = createAsyncThunk<
  TypeApiResponseData<number>,
  string,
  {
    rejectValue: TypeApiResponseError;
  }
>('post/DELETE_POST', async (idPost, { rejectWithValue }) => {
  try {
    const newPost = await makeRequestXHR('delete', {
      url: '/post/id/:id',
      params: {
        id: idPost,
      },
    });
    return newPost.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const resetErrorsFromStore = createAction('post/RESET_ERRORS');
export const setOpenModal = createAction<boolean>('post/OPEN_MODAL');
export const setLocalPostInfo = createAction<TypeLocalPostInfo>('post/SET_postInfoForModal');
