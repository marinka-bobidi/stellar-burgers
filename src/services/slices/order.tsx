import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface TinitialState extends TOrder {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
  loading: boolean;
  error: string | null;
}

const initialState: TinitialState = {
  _id: '',
  status: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  number: 0,
  ingredients: [],
  loading: false,
  error: null
};

export const orderThunk = createAsyncThunk('id/order', async (data: string[]) =>
  orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderClear(state) {
      state._id = '';
      state.createdAt = '';
      state.error = '';
      state.ingredients = [];
      state.updatedAt = '';
      state.loading = false;
      state.error = null;
      state.name = '';
      state.status = '';
      state.number = 0;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(orderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderThunk.rejected, (state, { error }) => {
        state.loading = true;
        state.error = error.message as string;
      })
      .addCase(orderThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state._id = payload.order._id;
        state.status = payload.order.status;
        state.name = payload.order.name;
        state.createdAt = payload.order.createdAt;
        state.updatedAt = payload.order.updatedAt;
        state.number = payload.order.number;
        state.ingredients = payload.order.ingredients;
      });
  }
});
export const { orderClear } = orderSlice.actions;
export default orderSlice.reducer;
