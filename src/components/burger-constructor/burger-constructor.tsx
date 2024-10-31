import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { getConstructState } from '../../services/slices/burger-constructor';
import { useSelector } from '../../services/store';
export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const user = null;
  const isAuthenticated = false;
  const ingredients = useSelector((state) => state.construct);
  const constructorItems = {
    bun: ingredients.bun,
    price: ingredients.price,
    bunPrice: ingredients.priceBun,
    ingredients: ingredients.ingredients
  };
  const orderRequest = isAuthenticated;
  const orderModalData: TOrder | null = isAuthenticated
    ? {
        _id: 'kkdkd',
        status: 'completed',
        name: 'Order Name',
        createdAt: '2022-12-01T00:00:00Z',
        updatedAt: '2022-12-01T01:00:00Z',
        number: 6,
        ingredients: []
      }
    : null;

  const onOrderClick = () => {
    if (
      (constructorItems.bun && constructorItems.ingredients.length > 0) ||
      !orderRequest
    ) {
      navigate('/login', { replace: true });
      console.log(orderModalData?._id);
    } else if (
      (constructorItems.bun && constructorItems.ingredients.length > 0) ||
      orderRequest
    ) {
      !isAuthenticated;
    }
  };
  const closeOrderModal = () => {};
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
