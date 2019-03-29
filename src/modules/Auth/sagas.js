import { takeEvery, put, call } from 'redux-saga/effects';
import {loginSuccess, loginError, addLoginData} from './actions'
import { sendLoginData } from './api';

function* authFlow(action) {
    const { login, password } = action.payload;
  
    try {
        const { success, error} = yield call(sendLoginData, login, password);  
        success
        ? yield put(loginSuccess())
        : yield put(loginError(error));
      
    } catch (error) {
      yield put(loginError(error));
    }
  }

export default function*() {
    
    yield takeEvery(addLoginData, authFlow);    
  }