import { createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { randomUUID } from 'crypto';
import { PayloadAction } from '@reduxjs/toolkit';
type TConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
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
    // addIngredient(state, { payload }) {
    //   if (payload.type !== 'bun') {
    //     const ingredient: TConstructorIngredient = {
    //       ...payload,
    //       id: nanoid()
    //     };
    //     state.ingredients.push(ingredient);
    //     state.price += payload.price;
    //   } else {
    //     state.bun = payload;
    //     state.priceBun = payload.price;
    //   }
    // },
    addIngredient: {
      prepare(ingredient) {
        return {
          payload: {
            ...ingredient,
            id: nanoid()
          }
        };
      },
      reducer(state, action: PayloadAction<TIngredient & { id: string }>) {
        if (action.payload.type !== 'bun') {
          const ingredient: TConstructorIngredient = {
            ...action.payload
          };
          state.ingredients.push(ingredient);
          state.price += action.payload.price;
        } else {
          state.bun = action.payload;
          state.priceBun = action.payload.price;
        }
      }
    },
    removeIngredient(state, { payload }) {
      state.ingredients = state.ingredients.filter(
        (value) => value.id !== payload.id
      );
      state.price -= payload.price;
    },
    clearConstructor(state) {
      state.ingredients = [];
      state.priceBun = 0;
      state.bun = null;
      state.price = 0;
    },
    moveUp(state, { payload }) {
      // const UpperIngredient = state.ingredients[index + 1];
      // state.ingredients[index + 1] = ingredient.payload;
      // state.ingredients[index] = UpperIngredient;
      state.ingredients.splice(
        payload.index - 1,
        0,
        state.ingredients.splice(payload.index, 1)[0]
      );
    },
    moveDown(state, { payload }) {
      // const UpperIngredient = state.ingredients[index + 1];
      // state.ingredients[index + 1] = ingredient.payload;
      // state.ingredients[index] = UpperIngredient;
      state.ingredients.splice(
        payload.index + 1,
        0,
        state.ingredients.splice(payload.index, 1)[0]
      );
    }
  },
  selectors: {
    getConstructState: (state) => state
  }
});
export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveUp,
  moveDown
} = constructorSlice.actions;
export const { getConstructState } = constructorSlice.selectors;
export default constructorSlice.reducer;
