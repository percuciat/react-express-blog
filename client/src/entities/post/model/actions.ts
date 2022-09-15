import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { makeRequestXHR, TypeApiResponseData, TypeApiResponseError } from 'shared/api';
import { TypeLocalPostInfo, TypePostResponse, TypePostFormData } from './types';

type TypeFetchPostsParams = {
  category?: string;
};

export const fetchPosts = createAsyncThunk<
  TypeApiResponseData<Array<TypePostResponse> | []>,
  any,
  {
    rejectValue: TypeApiResponseError;
  }
>(
  'post/FETCH_POSTS',
  async (params: TypeFetchPostsParams = { category: '' }, { rejectWithValue }) => {
    try {
      const posts = await makeRequestXHR('get', {
        url: '/post',
        params,
      });
      return posts;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createPost = createAsyncThunk<
  TypeApiResponseData<TypePostResponse>,
  TypePostFormData,
  {
    rejectValue: TypeApiResponseError;
  }
>('post/CREATE_POST', async (postDataForm, { rejectWithValue, dispatch }) => {
  try {
    const newPost = await makeRequestXHR('post', {
      url: '/post',
      data: postDataForm,
    });
    await dispatch(setOpenModal(false));
    /* await dispatch(
      showNotification({
        type: 'success',
        message: 'Post has created!',
      })
    ); */
    return newPost;
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
>('post/UPDATE_POST', async (updatePostDataForm, { rejectWithValue, dispatch }) => {
  try {
    console.log('updatePostDataForm--', updatePostDataForm);

    const newPost = await makeRequestXHR('put', {
      url: `/post/id/${updatePostDataForm.id}`,
      data: updatePostDataForm,
    });
    await dispatch(setOpenModal(false));
    return newPost.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const deletePost = createAsyncThunk<
  string,
  string,
  {
    rejectValue: TypeApiResponseError;
  }
>('post/DELETE_POST', async (idPost, { rejectWithValue, dispatch }) => {
  try {
    await makeRequestXHR('delete', {
      url: `/post/id/${idPost}`,
    });
    const data = idPost;
    await dispatch(setOpenModal(false));
    return data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const resetErrorsFromStore = createAction<null>('post/RESET_ERRORS');
export const resetNotification = createAction<null>('post/RESET_NOTIFICATION');
export const setOpenModal = createAction<boolean>('post/OPEN_MODAL');
export const setLocalPostInfo = createAction<TypeLocalPostInfo>('post/SET_PostInfoForModal');
export const setPostListPagination = createAction<any>('post/SET_PostListPagination');
export const showNotification = createAction<{ type: string; message: string }>(
  'post/SET_PostListPagination'
);
