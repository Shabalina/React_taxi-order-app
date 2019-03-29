import { createAction } from 'redux-actions';

export const addLoginData = createAction('AUTH/ADD_LOGIN_DATA')
export const loginSuccess = createAction('AUTH/LOGIN_SUCCESS')
export const loginError = createAction('AUTH/LOGIN_ERROR')
export const logOut = createAction('AUTH/LOG_OUT')
