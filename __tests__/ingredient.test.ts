import {
  openModal,
  closeModal,
  ingredientThunk,
  initialState
} from '../src/services/slices/ingredient';
import reducer from '../src/services/slices/ingredient';

const ingredientMockData = [
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
    id: 'IdnWAJHU3Hl2uP_xd-3JV'
  }
];

describe('Тестирование ingredient Slicer', () => {
  describe('Асинхронное добавление ингредиента', () => {
    test('Отправление', () => {
      const state = reducer(initialState, ingredientThunk.pending('pending'));
      expect(state.isLoading).toEqual(true);
      expect(state.error).toBeNull();
    });
    test('Ошибка', () => {
      const error = 'Ошибка!';
      const state = reducer(
        initialState,
        ingredientThunk.rejected(new Error(error), 'rejected')
      );

      expect(state.isLoading).toEqual(false);
      expect(typeof state.error).toBe('string');
      expect(state.error).toEqual(error);
    });
    test('Успешное отправление', () => {
      const state = reducer(
        initialState,
        ingredientThunk.fulfilled(ingredientMockData, 'fulfulled')
      );
      expect(state.ingredients).toEqual(ingredientMockData);
    });
  });
});
