import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { makeRequestXHR, TypeApiResponseData, TypeApiResponseError } from 'shared/api';
import { TypeCategoryResponse, TypeCategoryFormCreate, TypeCategoryInfoForModal } from '../model';

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
    return categories;
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
      url: `/post/category/id/${id}`,
    });
    return categories.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const createCategory = createAsyncThunk<
  TypeApiResponseData<TypeCategoryResponse>,
  Omit<TypeCategoryFormCreate, 'id'>,
  {
    rejectValue: TypeApiResponseError;
  }
>('category/CREATE_CATEGORY', async (categoryInfo, { rejectWithValue, dispatch }) => {
  try {
    const newCategory = await makeRequestXHR('post', {
      url: '/post/category',
      data: categoryInfo,
    });
    await dispatch(setOpenModal(false));
    return newCategory;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const deleteCategory = createAsyncThunk<
  number,
  number,
  {
    rejectValue: TypeApiResponseError;
  }
>('category/DELETE_CATEGORY', async (id, { rejectWithValue, dispatch }) => {
  try {
    await makeRequestXHR('delete', {
      url: `/post/category/id/${id}`,
    });
    const data = id;
    await dispatch(setOpenModal(false));
    return data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const resetErrorsFromStore = createAction<null>('category/RESET_ERRORS');
export const setCurrentCategory = createAction<string>('category/SET_CURRENT_CATEGORY');
export const setOpenModal = createAction<boolean>('category/OPEN_MODAL');
export const setLocalCategoryInfo = createAction<TypeCategoryInfoForModal>(
  'category/SET_CategoryInfoForModal'
);
