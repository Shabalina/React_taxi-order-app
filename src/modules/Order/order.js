// Реализуйте редьюсер
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {resetTaxiOrder, createRoute, createRouteError} from './actions';

const isOrder = handleActions(
    {
        [createRoute]:() => true,
        [createRouteError]:() => false,
        [resetTaxiOrder]:() => false

    },false,
)

const route = handleActions(
    {
        [createRoute]:(_state, action) => action.payload,
        [createRouteError]:() => [],
        [resetTaxiOrder]:() => []

    },[],
)

const error = handleActions(
    {
        [createRoute]:() => null,
        [createRouteError]:(_state, action) => action.payload,
        [resetTaxiOrder]:() => null

    },null,
)   

export default combineReducers({
    isOrder,
    route,
    error
})

//export const getApiKey = state => state.auth.apiKey
export const getIsOrder = state => state.order.isOrder;
export const getRouteList = state => state.order.route.coords;


