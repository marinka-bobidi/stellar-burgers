import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrderThunk } from '../../services/slices/orders';
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  dispatch(getUserOrderThunk());
  const orders: TOrder[] = useSelector(
    (state) => state.ordersReducer.userOrders
  );

  return <ProfileOrdersUI orders={orders} />;
};
