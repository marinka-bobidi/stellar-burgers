import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export interface TinitialState {
  isLoading: boolean;
  ingredients: TIngredient[];
  error: null | string;
  isModalOpened: boolean;
  isInit: boolean;
}

export const initialState: TinitialState = {
  isLoading: false,
  ingredients: [],
  error: null,
  isModalOpened: true,
  isInit: false
};

export const ingredientThunk = createAsyncThunk(
  'ingredients/get',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    init(state) {
      state.isInit = true;
    },
    openModal(state) {
      state.isModalOpened = true;
    },
    closeModal(state) {
      state.isModalOpened = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(ingredientThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ingredientThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(ingredientThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.ingredients = payload;
      });
  },
  selectors: {
    ingredientSelector: (state) => state,
    selectIsModalOpened: (state) => state.isModalOpened
  }
});

export default ingredientsSlice.reducer;
export const { ingredientSelector, selectIsModalOpened } =
  ingredientsSlice.selectors;
export const { openModal, closeModal, init } = ingredientsSlice.actions;
