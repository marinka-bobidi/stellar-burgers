import reducer, {
  addIngredient,
  removeIngredient,
  initialState,
  moveUp,
  moveDown,
  clearConstructor
} from '../src/services/slices/burger-constructor';

const bunMockData = {
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
};
const ingredientMockData1 = {
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
};
const ingredientMockData2 = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0,
  id: 'U9x9kmKkz_1s4vz90H8bD'
};
const ingredientMockData3 = {
  _id: '643d69a5c3f7b9001cfa0947',
  name: 'Плоды Фалленианского дерева',
  type: 'main',
  proteins: 20,
  fat: 5,
  carbohydrates: 55,
  calories: 77,
  price: 874,
  image: 'https://code.s3.yandex.net/react/code/sp_1.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
  __v: 0,
  id: 'Rh0MapGiVuendtfIG-RF-'
};
const ingredientMockData4 = {
  _id: '643d69a5c3f7b9001cfa0949',
  name: 'Мини-салат Экзо-Плантаго',
  type: 'main',
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 6,
  price: 4400,
  image: 'https://code.s3.yandex.net/react/code/salad.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
  __v: 0,
  id: 'cML7RZ8ROZQ4RkDlUj45z'
};
describe('Тестирование burger-constructor reducer', () => {
  describe('Работа с булками', () => {
    test('Установка булки через addIngredient', () => {
      // Получаем state.bun и извлекаем генерируемый параметр id для проверки
      const state = reducer(initialState, addIngredient(bunMockData));
      const stateBun = state.bun;
      if (stateBun !== null) {
        let { id, ...stateBunNoId } = stateBun;
        expect(stateBunNoId).toEqual(bunMockData);
      } else {
        let stateBunNoId = stateBun;
        expect(stateBunNoId).toEqual(bunMockData);
      }
      expect(state.ingredients).toHaveLength(0);
    });
    test('Удаление ингредиента', () => {
      const initialStateNew = {
        bun: ingredientMockData1,
        ingredients: [ingredientMockData2],
        priceBun: 0,
        price: 0
      };
      const state = reducer(
        initialStateNew,
        removeIngredient(ingredientMockData2)
      );
      expect(state.ingredients).toHaveLength(0);
      expect(state.bun).toEqual(ingredientMockData1);
    });
    test('Движение ингредиентов', () => {
      const initialStateNew = {
        bun: null,
        ingredients: [
          ingredientMockData2,
          ingredientMockData3,
          ingredientMockData4
        ],
        priceBun: 0,
        price: 0
      };
      const state = reducer(
        initialStateNew,
        moveUp({ ingredient: ingredientMockData3, index: 1 })
      );
      expect(state.ingredients[0]).toEqual(ingredientMockData3);
      const state2 = reducer(
        state,
        moveDown({ ingredient: ingredientMockData2, index: 1 })
      );
      expect(state2.ingredients[2]).toEqual(ingredientMockData2);
      expect(state2.ingredients).toHaveLength(3);
    });
    test('Проверка очистки', () => {
      const initialStateNew = {
        bun: ingredientMockData1,
        ingredients: [
          ingredientMockData2,
          ingredientMockData3,
          ingredientMockData4
        ],
        priceBun: 500,
        price: 5000
      };
      const state = reducer(initialStateNew, clearConstructor());
      expect(state.bun).toBeNull();
      expect(state.ingredients).toEqual([]);
      expect(state.price).toEqual(0);
      expect(state.priceBun).toEqual(0);
    });
  });
});
