import { createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient[] | null;
  priceBun: number;
  price: number;
};

export const initialState: TConstructorState = {
  ingredients: [],
  priceBun: 0,
  bun: null,
  price: 0
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient(state, { payload }) {
      if (payload.type !== 'bun') {
        const id = nanoid();
        const ingredient: TConstructorIngredient = {
          ...payload,
          id: id
        };
        state.ingredients.push(ingredient);
        state.price += payload.price;
      } else {
        state.bun = payload;
        state.priceBun = payload.price;
      }
    },
    removeIngredient(state, { payload }) {
      state.ingredients = state.ingredients.filter(
        (value) => value.id !== payload.id
      );
      state.price -= payload.price;
    }
  },
  selectors: {
    getConstructState: (state) => state
  }
});
export const { addIngredient, removeIngredient } = constructorSlice.actions;
export const { getConstructState } = constructorSlice.selectors;
export default constructorSlice.reducer;
