import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { registerUserApi, TRegisterData } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface initialState {
  user: TUser;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: initialState = {
  user: {
    name: '',
    email: ''
  },
  isAuthenticated: false,
  loading: false,
  error: null
};
export const registerThunk = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);
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
      });
  },
  selectors: {
    getUser: (state) => state
  }
});
export default authSlice.reducer;
