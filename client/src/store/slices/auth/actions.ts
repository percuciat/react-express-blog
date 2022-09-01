import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequestXHR, axiosConfig } from 'api';
//import { apiClient } from 'utils/api/AxiosInstance';
//import { resetUserData } from 'store/slices/user';
import { setNewToken } from './';

type TypeLogin = { user_name: string; user_password: string };
type TypeRegistration = TypeLogin & { user_email: string };

export const loginUser = createAsyncThunk(
  'auth/AUTH_LOGIN',
  async (dataForm: TypeLogin, { dispatch, rejectWithValue }) => {
    try {
      const { user_name, user_password } = dataForm;
      const { token, refresh_token } = (await makeRequestXHR('post', {
        url: 'api/auth/login',
        data: { user_name, user_password },
      })) as any;
      // dispatch(setNewToken(token));
      axiosConfig.defaults.headers.common['Authorization'] = token;
      return {
        token,
        refreshToken: refresh_token,
      };
    } catch (error: unknown) {
      console.log('ERROR sending token--', error);
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/AUTH_REGISTER',
  async (dataForm: TypeRegistration, { dispatch, rejectWithValue }) => {
    const { user_name, user_email, user_password } = dataForm;
    try {
      const { access_token, refresh_token } = (await makeRequestXHR('post', {
        url: 'api/auth/registration',
        data: { user_name, user_email, user_password },
      })) as any;
      //dispatch(setNewToken(token));
      axiosConfig.defaults.headers.common['Authorization'] = access_token;
      return {
        access_token: access_token,
        refreshToken: refresh_token,
      };
    } catch (error: unknown) {
      console.log('ERROR Register--', error);
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/AUTH_LOGOUT',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await makeRequestXHR('get', { url: 'api/auth/logout' });
      //dispatch(resetUserData());
      return response.data;
    } catch (error: unknown) {
      console.log('error--', error);
      return rejectWithValue(error);
    }
  }
);
