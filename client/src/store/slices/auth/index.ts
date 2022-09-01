import { createSlice, current } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
/* import { axiosBaseQuery } from 'utils/api'; */
import { loginUser, registerUser, logoutUser } from './actions';
import { Storage } from 'utils/storage';
//import setRefreshToken from 'utils/common/setRefreshToken';

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: {
    isAuth: Boolean(Storage.getStorage('refreshToken')),
    isLoading: false,
    token: null,
    errorsObj: null,
  },
  reducers: {
    setNewToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    function authUser(state, action) {
      state.isAuth = true;
      //setRefreshToken(action.payload.refreshToken);
      state.isLoading = false;
    }
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, authUser)

      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(registerUser.fulfilled, authUser)

      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
        Storage.removeStorage('tokenRefresh');
        Storage.removeStorage('tokenDate');
      })

      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectIsAuth = (state) => state.auth.isAuth;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAuthToken = (state) => state.auth.token;
export const { setNewToken } = actions;

export default reducer;

/*export const apiRTQ = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://api.thelabyrinth.world',
    credentials: false,
  }),
  tagTypes: ['User'],
   baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.thelabyrinth.world',
    credentials: false,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), 
  tagTypes: ['Post'], 
  endpoints: (build) => ({
    loginUser: build.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: (email, password) => ({
        url: `api/auth/login`,
        method: 'post',
        data: { email, password },
      }),
      // Pick out data and prevent nested properties in a hook or selector
      /* transformResponse: (response, meta, arg) => response.data,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
      async onQueryStarted(
        arg,
        { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData }
      ) {},
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
          updateCachedData,
        }
      ) {}, 
    }),
    registerUser: build.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: (email, password, password_confirmation) => ({
        url: `api/auth/register`,
        method: 'post',
        data: { email, password, password_confirmation },
      }),
    }),
  }),
});

const {
  useLoginUserMutation,
  useRegisterUserMutation,
   useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation, 
} = apiRTQ; */
