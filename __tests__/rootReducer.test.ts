import store, { rootReducer } from '../src/services/store';

describe('Тестирование rootReducer', () => {
  test('Проверка rootReducer', () => {
    const before = store.getState();

    const after = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(after).toEqual(before);
  });
});
