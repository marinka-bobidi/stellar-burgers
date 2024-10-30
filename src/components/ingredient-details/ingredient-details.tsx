/* eslint-disable react/jsx-boolean-value */
import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import {
  ingredientSelector,
  selectIsModalOpened
} from '../../services/slices/ingredient';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** DONE: взять переменную из стора */
  const ingredientData = useSelector(ingredientSelector);
  const isOpened = useSelector(selectIsModalOpened);
  const params = useParams<{ id: string }>();
  const ingredient = ingredientData.ingredients.find(
    (item) => item._id === params.id
  );

  if (!ingredient) {
    return <Preloader />;
  }
  if (!isOpened) {
    return <Navigate to={'/'} replace={true} />;
  }
  return <IngredientDetailsUI ingredientData={ingredient} />;
};
