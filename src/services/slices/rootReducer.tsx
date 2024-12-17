import ingredientReducer from './ingredient';
import { combineReducers } from 'redux';
import constructReducer from './burger-constructor';
import authReducer from './auth';
export const rootReducerCombine = combineReducers({
  ingredients: ingredientReducer,
  construct: constructReducer,
  authentication: authReducer
});
