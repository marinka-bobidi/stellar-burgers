import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersThunk } from '../../services/slices/orders';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  let ordersResponse = useSelector((state) => state.ordersReducer.orders);
  if (ordersResponse.length === 0) {
    ordersResponse = [];
  }
  const orders = ordersResponse;

  // if (!orders.length) {
  //   return <Preloader />;
  // }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getOrdersThunk());
      }}
    />
  );
};
