import { createAction } from 'redux-actions';

export const createTaxiOrder = createAction('ORDER/CREATE_TAXI_ORDER')
export const resetTaxiOrder = createAction('ORDER/RESET_TAXI_ORDER')
export const createRoute = createAction('ORDER/CREATE_ROUTE')
export const createRouteError = createAction('ORDER/CREATE_ROUTE_ERROR')