import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { TOrder } from '@utils-types';
import { getOrdersThunk } from '../../services/slices/orders';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useDispatch();

  const { number } = useParams();
  const orderList = useSelector((state) => state.ordersReducer.orders);
  const orderBuffer: TOrder | undefined = orderList.find((state) => {
    if (number !== undefined) {
      return state.number === parseInt(number);
    }
  });
  let order: TOrder;
  if (orderBuffer === undefined) {
    order = {
      createdAt: '',
      ingredients: [],
      _id: '',
      status: '',
      name: '',
      updatedAt: '',
      number: 0
    };
  } else {
    order = orderBuffer;
  }
  const orderData = {
    createdAt: order.createdAt,
    ingredients: order.ingredients,
    _id: order._id,
    status: order.status,
    name: order.name,
    updatedAt: order.updatedAt,
    number: order.number
  };

  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.ingredients
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
