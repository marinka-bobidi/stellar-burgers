import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  registerUserApi,
  TRegisterData,
  loginUserApi,
  TLoginData,
  updateUserApi,
  logoutApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface TinitialState {
  user: TUser;
  isAuthenticated: boolean;
  loading: boolean;
  loadingSuccess: boolean;
  error: string | null;
  acessToken: string;
  refreshToken: string;
}

export const initialState: TinitialState = {
  user: {
    name: '',
    email: ''
  },
  isAuthenticated: false,
  loading: false,
  error: null,
  acessToken: '',
  refreshToken: '',
  loadingSuccess: false
};

export const registerThunk = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);
export const loginThunk = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);
export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);
export const userLogoutThunk = createAsyncThunk('user/logout', async () => {
  logoutApi();
});

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.loadingSuccess = false;
      })
      .addCase(loginThunk.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error as string;
        state.loadingSuccess = false;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload.user;
        state.acessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.isAuthenticated = true;
        state.loadingSuccess = true;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error as string;
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload.user;
        state.loadingSuccess = true;
      })
      .addCase(userLogoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogoutThunk.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(userLogoutThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user.email = '';
        state.user.name = '';
      });
  },
  selectors: {
    getUser: (state) => state
  }
});
export default authSlice.reducer;
