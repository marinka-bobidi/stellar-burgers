import { FC, useEffect, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { orderClear, orderThunk } from '../../services/slices/order';
import { closeModal, openModal } from '../../services/slices/ingredient';
import { useNavigate } from 'react-router-dom';
import { clearConstructor } from '../../services/slices/burger-constructor';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const ingredients = useSelector((state) => state.construct);
  const isModalOpen = useSelector((state) => state.ingredients.isModalOpened);
  const orderRequest = useSelector((state) => state.order.loading);
  const buffer = useSelector((state) => state.order);
  const constructorItems = {
    bun: ingredients.bun,
    price: ingredients.price,
    bunPrice: ingredients.priceBun,
    ingredients: ingredients.ingredients
  };

  let orderModalData = null;
  if (buffer._id == '' || !isModalOpen) {
    orderModalData = null;
  } else {
    orderModalData = buffer;
  }
  const [ingredients_array, set_ing_array] = useState<string[]>([]);

  useEffect(() => {
    if (ingredients_array.length > 0) {
      dispatch(orderThunk(ingredients_array));
    }
  }, [ingredients_array, dispatch]);

  const onOrderClick = () => {
    if (user.name !== '' && user.email !== '') {
      const ing: string[] = [];
      if (
        !isModalOpen &&
        constructorItems.bun &&
        constructorItems.ingredients.length > 0
      ) {
        dispatch(openModal());
        constructorItems.ingredients.forEach((element) => {
          ing.push(element._id);
        });
        ing.push(constructorItems.bun._id);
        set_ing_array(ing);
        dispatch(clearConstructor());
      }
    } else {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(closeModal());
  };
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bunPrice * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
export default BurgerConstructor;
