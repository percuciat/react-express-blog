import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { makeRequestXHR } from 'shared/lib';

export const fetchCategories = createAsyncThunk(
  'category/FETCH_CATEGORIES',
  async (_, { rejectWithValue }) => {
    try {
      //TODO: типизация
      const categories = await makeRequestXHR('get', { url: '/post/category' });
      return categories.data as any;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createCategory = createAsyncThunk(
  'category/CREATE_CATEGORY',
  async (category: { category_name: string, author_id: number }, { rejectWithValue }) => {
    try {
      const categories = await makeRequestXHR('post', {
        url: '/post/category',
        data: {
          category,
        },
      });
      return categories.data as any;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/DELETE_CATEGORY',
  async (id: number, { rejectWithValue }) => {
    try {
      const categories = await makeRequestXHR('delete', {
        url: '/post/category/id/:id',
        params: {
          id,
        },
      });
      return categories.data as any;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const resetErrorsFromStore = createAction('category/RESET_ERRORS');
export const setCurrentCategory = createAction<string>('category/SET_CURRENT_CATEGORY');
