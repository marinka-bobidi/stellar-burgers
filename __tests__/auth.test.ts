import {
  registerThunk,
  loginThunk,
  updateUserThunk,
  userLogoutThunk,
  refreshTokenThunk,
  getUserApiThunk,
  initialState
} from '../src/services/slices/auth';
import reducer from '../src/services/slices/auth';

const loginMockData = {
  email: 'abrakadabra@gmail.com',
  password: '1234567890'
};
const loginMockData2 = {
  success: true,
  accessToken: 'asdawl2k13jlk12jlkjaslk',
  refreshToken: 'asdkasdkjkasjlk1j23lkj',
  user: {
    email: 'abrakadabra@gmail.com',
    name: 'asdasd',
    password: '1234567890'
  }
};
const registerMockData = {
  email: 'abrakadabra@gmail.com',
  name: 'asdasd',
  password: '1234567890'
};
const updateUserInitialState = {
  user: {
    name: 'A',
    email: 'AAA@gmail.com'
  },
  isAuthenticated: true,
  loading: false,
  error: null,
  acessToken: 'asdawl2k13jlk12jlkjaslk',
  refreshToken: 'asdkasdkjkasjlk1j23lkj',
  loadingSuccess: false
};
const partialUserData = {
  name: 'BBB',
  email: 'BBB@gmail.com'
};
const updateUserData = {
  success: true,
  user: {
    name: 'BBB',
    email: 'BBB@gmail.com'
  }
};
const refreshResponseData = {
  success: true,
  accessToken: 'asdsadasdasjdkasjdkl123asjdlkasjd',
  refreshToken: 'asdaskldjaskdjklnrojnwaqr123213kpoaks'
};
describe('Тестирование аутентификации', () => {
  describe('Логин тест', () => {
    test('Отправление', () => {
      const state = reducer(
        initialState,
        loginThunk.pending('pending', loginMockData)
      );
      expect(state.error).toBeNull();
      expect(state.loading).toEqual(true);
    });
    test('Ошибка', () => {
      const error = 'Ошибка логина!';
      const state = reducer(
        initialState,
        loginThunk.rejected(new Error(error), 'rejected', loginMockData)
      );
      expect(state.error).toEqual(error);
      expect(typeof state.error).toBe('string');
      expect(state.loading).toEqual(false);
    });
    test('Успешная отправка логин', () => {
      const error = 'Ошибка логина!';
      const state = reducer(
        initialState,
        loginThunk.fulfilled(loginMockData2, 'fulfilled', loginMockData)
      );
      expect(state.error).toBeNull();
      expect(state.loading).toEqual(false);
      expect(state.user.email).toEqual(loginMockData.email);
      expect(state.isAuthenticated).toBeTruthy();
    });
  });
  describe('Регистрация тест', () => {
    test('Отправление', () => {
      const state = reducer(
        initialState,
        registerThunk.pending('pending', registerMockData)
      );
      expect(state.error).toBeNull();
      expect(state.loading).toEqual(true);
    });
    test('Регистрация Ошибка', () => {
      const error = 'Ошибка регистрации!';
      const state = reducer(
        initialState,
        registerThunk.rejected(new Error(error), 'rejected', registerMockData)
      );
      expect(state.error).toEqual(error);
      expect(typeof state.error).toBe('string');
      expect(state.loading).toEqual(false);
    });
    test('Регистрация Успешная отправка', () => {
      const error = 'Ошибка логина!';
      const state = reducer(
        initialState,
        registerThunk.fulfilled(loginMockData2, 'fulfilled', registerMockData)
      );
      expect(state.error).toBeNull();
      expect(state.loading).toEqual(false);
      expect(state.user.email).toEqual(loginMockData.email);
      expect(state.user.name).toEqual(loginMockData2.user.name);
      expect(state.isAuthenticated).toBeTruthy();
    });
  });
  describe('Обновление пользователя тест', () => {
    test('Отправление', () => {
      const state = reducer(
        initialState,
        updateUserThunk.pending('pending', partialUserData)
      );
      expect(state.error).toBeNull();
      expect(state.loading).toEqual(true);
    });
    test('Ошибка', () => {
      const error = 'Ошибка!';
      const state = reducer(
        initialState,
        updateUserThunk.rejected(new Error(error), 'rejected', partialUserData)
      );
      expect(state.error).toEqual(error);
      expect(typeof state.error).toBe('string');
      expect(state.loading).toEqual(false);
    });
    test('Успешная отправка', () => {
      const state = reducer(
        initialState,
        updateUserThunk.fulfilled(updateUserData, 'fulfilled', partialUserData)
      );
      expect(state.error).toBeNull();
      expect(state.loading).toEqual(false);
      expect(state.user.email).toEqual(updateUserData.user.email);
      expect(state.user.name).toEqual(updateUserData.user.name);
    });
  });
  // Обновление куки
  describe('Обновление куки тест', () => {
    test('Отправление', () => {
      const state = reducer(initialState, refreshTokenThunk.pending('pending'));
      expect(state.error).toBeNull();
      expect(state.loading).toEqual(true);
    });
    test('Ошибка', () => {
      const error = 'Ошибка!';
      const state = reducer(
        initialState,
        refreshTokenThunk.rejected(new Error(error), 'rejected')
      );
      expect(state.error).toEqual(error);
      expect(typeof state.error).toBe('string');
      expect(state.loading).toEqual(false);
    });
    test('Успешная отправка', () => {
      const state = reducer(
        initialState,
        refreshTokenThunk.fulfilled(refreshResponseData, 'fulfilled')
      );
      expect(state.error).toBeNull();
      expect(state.loading).toEqual(false);
      expect(state.refreshToken).toEqual(refreshResponseData.refreshToken);
      expect(state.acessToken).toEqual(refreshResponseData.accessToken);
    });
  });
  // Лог аут
  describe('Лог аут пользователя тест', () => {
    test('Отправление', () => {
      const state = reducer(initialState, userLogoutThunk.pending('pending'));
      expect(state.error).toBeNull();
      expect(state.loading).toEqual(true);
    });
    test('Ошибка', () => {
      const error = 'Ошибка!';
      const state = reducer(
        initialState,
        userLogoutThunk.rejected(new Error(error), 'rejected')
      );
      expect(state.error).toEqual(error);
      expect(typeof state.error).toBe('string');
      expect(state.loading).toEqual(false);
    });
    test('Успешная отправка', () => {
      const state = reducer(
        initialState,
        userLogoutThunk.fulfilled(undefined, 'fulfilled')
      );
      expect(state.error).toBeNull();
      expect(state.loading).toEqual(false);
      expect(state.user.email).toEqual('');
      expect(state.user.name).toEqual('');
      expect(state.isAuthenticated).toBeFalsy();
    });
  });
  // Получение пользователя
  describe('Получение пользователя тест', () => {
    test('Отправление', () => {
      const state = reducer(initialState, getUserApiThunk.pending('pending'));
      expect(state.error).toBeNull();
      expect(state.loading).toEqual(true);
    });
    test('Ошибка', () => {
      const error = 'Ошибка!';
      const state = reducer(
        initialState,
        getUserApiThunk.rejected(new Error(error), 'rejected')
      );
      expect(state.error).toEqual(error);
      expect(typeof state.error).toBe('string');
      expect(state.loading).toEqual(false);
    });
    test('Успешная отправка', () => {
      const state = reducer(
        initialState,
        getUserApiThunk.fulfilled(updateUserData, 'fulfilled')
      );
      expect(state.error).toBeNull();
      expect(state.loading).toEqual(false);
      expect(state.user).toEqual(updateUserData.user);
    });
  });
});
