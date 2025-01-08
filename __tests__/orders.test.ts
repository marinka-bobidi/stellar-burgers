import {
  getOrdersThunk,
  getUserOrderThunk,
  initialState
} from '../src/services/slices/orders';
import reducer from '../src/services/slices/orders';

const Order1Data = {
  _id: 'asdasd',
  status: 'afsfas',
  name: 'wqewqer',
  createdAt: '1245',
  updatedAt: '125215',
  number: 5125,
  ingredients: ['25', '155', '125215']
};
const Order2Data = {
  _id: 'qwqt',
  status: 'qwt',
  name: 'qwtqwt',
  createdAt: '152',
  updatedAt: '525',
  number: 5125,
  ingredients: ['123', '125', '68589']
};

const getOrdersThunkResponseData = {
  success: true,
  total: 11,
  orders: [Order1Data, Order2Data],
  totalToday: 25
};

describe('Тестирование order slicer', () => {
  describe('Асинхронное получение заказа', () => {
    test('Отправление', () => {
      const state = reducer(initialState, getOrdersThunk.pending('pending'));
      expect(state.loading).toEqual(true);
      expect(state.error).toBeNull();
    });
    test('Ошибка', () => {
      const error = 'Ошибка!';
      const state = reducer(
        initialState,
        getOrdersThunk.rejected(new Error(error), 'rejected')
      );

      expect(state.loading).toEqual(false);
      expect(typeof state.error).toBe('string');
      expect(state.error).toEqual(error);
    });
    test('Успешное отправление', () => {
      const state = reducer(
        initialState,
        getOrdersThunk.fulfilled(getOrdersThunkResponseData, 'fulfulled')
      );
      expect(state.loading).toEqual(false);
      expect(state.sucess).toEqual(true);
      expect(state.orders).toEqual(getOrdersThunkResponseData.orders);
      expect(state.total).toEqual(getOrdersThunkResponseData.total);
      expect(state.totalToday).toEqual(getOrdersThunkResponseData.totalToday);
    });
  });
  describe('Асинхронное получение заказа по пользователю', () => {
    test('Отправление', () => {
      const state = reducer(initialState, getUserOrderThunk.pending('pending'));
      expect(state.loading).toEqual(true);
      expect(state.error).toBeNull();
    });
    test('Ошибка', () => {
      const error = 'Ошибка!';
      const state = reducer(
        initialState,
        getUserOrderThunk.rejected(new Error(error), 'rejected')
      );

      expect(state.loading).toEqual(false);
      expect(typeof state.error).toBe('string');
      expect(state.error).toEqual(error);
    });
    test('Успешное отправление', () => {
      const state = reducer(
        initialState,
        getUserOrderThunk.fulfilled(
          getOrdersThunkResponseData.orders,
          'fulfulled'
        )
      );
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(null);

      expect(state.userOrders).toEqual(getOrdersThunkResponseData.orders);
    });
  });
});
