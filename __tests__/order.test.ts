import { orderThunk, initialState } from '../src/services/slices/order';
import reducer from '../src/services/slices/order';

const orderMockingData: string[] = ['215', '25215', '125125'];
const orderMockingResponseData = {
  success: true,
  order: {
    _id: '12312315',
    status: 'Готовится',
    name: 'Заказ',
    createdAt: '125',
    updatedAt: '15',
    number: 25252,
    ingredients: ['215', '25215', '125125']
  },
  name: 'Заказ'
};
describe('Тестирование order slicer', () => {
  describe('Асинхронное добавление ингредиента', () => {
    test('Отправление', () => {
      const state = reducer(
        initialState,
        orderThunk.pending('pending', orderMockingData)
      );
      expect(state.loading).toEqual(true);
      expect(state.error).toBeNull();
    });
    test('Ошибка', () => {
      const error = 'Ошибка!';
      const state = reducer(
        initialState,
        orderThunk.rejected(new Error(error), 'rejected', orderMockingData)
      );

      expect(state.loading).toEqual(false);
      expect(typeof state.error).toBe('string');
      expect(state.error).toEqual(error);
    });
    test('Успешное отправление', () => {
      const state = reducer(
        initialState,
        orderThunk.fulfilled(
          orderMockingResponseData,
          'fulfulled',
          orderMockingData
        )
      );
      expect(state.status).toEqual(orderMockingResponseData.order.status);
      expect(state._id).toEqual(orderMockingResponseData.order._id);
      expect(state.name).toEqual(orderMockingResponseData.order.name);
      expect(state.createdAt).toEqual(orderMockingResponseData.order.createdAt);
      expect(state.updatedAt).toEqual(orderMockingResponseData.order.updatedAt);
      expect(state.number).toEqual(orderMockingResponseData.order.number);
      expect(state.ingredients).toEqual(
        orderMockingResponseData.order.ingredients
      );
    });
  });
});
