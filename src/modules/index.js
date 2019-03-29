import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import auth, { sagas as authSagas } from './Auth';
import order, { sagas as orderSagas } from './Order';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({ auth, order, form:formReducer });

export function* rootSaga() {
  yield fork(authSagas);
  yield fork(orderSagas);
}
