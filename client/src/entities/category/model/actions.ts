import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { makeRequestXHR, TypeApiResponseData, TypeApiResponseError } from 'shared/api';
import { TypeCategoryResponse, TypeCategoryRequest } from '../model';

export const fetchCategories = createAsyncThunk<
  TypeApiResponseData<Array<TypeCategoryResponse> | []>,
  void,
  {
    rejectValue: TypeApiResponseError;
  }
>('category/FETCH_CATEGORIES', async (_, { rejectWithValue }) => {
  try {
    const categories = await makeRequestXHR('get', {
      url: '/post/category',
    });
    return categories.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

const fetchCategoryById = createAsyncThunk<
  TypeApiResponseData<TypeCategoryResponse>,
  number,
  {
    rejectValue: TypeApiResponseError;
  }
>('category/FETCH_CATEGORY_BY_ID', async (id, { rejectWithValue }) => {
  try {
    const categories = await makeRequestXHR('get', {
      params: {
        id,
      },
      url: '/post/category/id/:id',
    });
    return categories.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const createCategory = createAsyncThunk<
  TypeApiResponseData<TypeCategoryResponse>,
  Omit<TypeCategoryRequest, 'id'>,
  {
    rejectValue: TypeApiResponseError;
  }
>('category/CREATE_CATEGORY', async (category, { rejectWithValue }) => {
  try {
    const categories = await makeRequestXHR('post', {
      url: '/post/category',
      data: {
        category,
      },
    });
    return categories.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const deleteCategory = createAsyncThunk<
  TypeApiResponseData<number>,
  number,
  {
    rejectValue: TypeApiResponseError;
  }
>('category/DELETE_CATEGORY', async (id, { rejectWithValue }) => {
  try {
    const categories = await makeRequestXHR('delete', {
      url: '/post/category/id/:id',
      params: {
        id,
      },
    });
    return categories.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const resetErrorsFromStore = createAction('category/RESET_ERRORS');
export const setCurrentCategory = createAction<string>('category/SET_CURRENT_CATEGORY');
