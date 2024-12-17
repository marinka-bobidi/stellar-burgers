import ingredientReducer from './ingredient';
import { combineReducers } from 'redux';
import constructReducer from './burger-constructor';
import authReducer from './auth';
import orderReducer from './order';
import ordersReducer from './orders';
export const rootReducerCombine = combineReducers({
  ordersReducer,
  ingredients: ingredientReducer,
  construct: constructReducer,
  authentication: authReducer,
  order: orderReducer
});
