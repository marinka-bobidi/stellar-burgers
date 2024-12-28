import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';
export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  /** DONE: взять переменную из стора */
  const buffer = useSelector((state) => state.construct);
  interface IBurgerConstructor {
    bun: {
      _id: string;
    };
    ingredients: TConstructorIngredient[];
  }
  let burgerConstructor: IBurgerConstructor = {
    bun: {
      _id: ''
    },
    ingredients: []
  };
  if (buffer.bun !== null) {
    burgerConstructor.bun = { _id: buffer.bun._id };
  }
  if (buffer.ingredients) {
    burgerConstructor.ingredients = buffer.ingredients;
  }

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);
  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
