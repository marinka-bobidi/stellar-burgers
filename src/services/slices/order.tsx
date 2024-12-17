import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi, registerUserApi, TRegisterData } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
interface initialState {
  order: TOrder | null;
  name: string | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: initialState = {
  order: null,
  name: null,
  isLoading: false,
  error: null
};

export const fetchNewOrder = createAsyncThunk(
  'order/new/fetch',
  orderBurgerApi
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNewOrder.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(fetchNewOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.order = payload.order;
        state.name = payload.name;
      });
  }
});

export default orderSlice.reducer;
