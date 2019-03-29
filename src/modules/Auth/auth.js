// Реализуйте редьюсер
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {loginSuccess, loginError, logOut} from './actions';

const isAuthorized = handleActions(
    {
        [loginSuccess]:() => true,
        [loginError]:() => false,
        [logOut]:() => false

    },false,
)

const error = handleActions(
    {
        [loginSuccess]:() => null,
        [loginError]:(_state, action) => action.payload,
        [logOut]:() => null

    },null,
)   

export default combineReducers({
    isAuthorized,
    error
})

//export const getApiKey = state => state.auth.apiKey
export const getIsAuthorized = state => state.auth.isAuthorized;
export const getIsError = state => {
    console.log('from reducer', !!state.auth.error)
    return !!state.auth.error
};


