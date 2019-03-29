import { takeEvery, put, call } from 'redux-saga/effects';
import {createTaxiOrder, createRoute, createRouteError} from './actions'
import { getRoute } from './api';

function* orderFlow(action) {
    const { from, to } = action.payload;  
    try {
        const coords = yield call(getRoute, from, to);  
        yield put(createRoute({coords}))      
    } catch (error) {
        yield put(createRouteError(error));
    }
  }

export default function*() {
    
    yield takeEvery(createTaxiOrder, orderFlow);    
  }