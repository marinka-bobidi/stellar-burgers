import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { create } from 'domain';
interface TinitialState {
  sucess: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
  activeOrder: TOrder | null;
  userOrders: TOrder[];
}

const initialState: TinitialState = {
  sucess: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  activeOrder: null,
  userOrders: []
};

export const getOrdersThunk = createAsyncThunk('feed/get', async () =>
  getFeedsApi()
);
export const getUserOrderThunk = createAsyncThunk('profile/orders', async () =>
  getOrdersApi()
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderClear(state) {},
    setOrder(state, { payload }) {
      state.activeOrder = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersThunk.rejected, (state, { error }) => {
        state.loading = true;
        state.error = error.message as string;
      })
      .addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.sucess = payload.success;
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      })
      .addCase(getUserOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrderThunk.rejected, (state, { error }) => {
        state.loading = true;
        state.error = error.message as string;
      })
      .addCase(getUserOrderThunk.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.error = null;
        state.userOrders = payload;
      });
  }
});
export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
