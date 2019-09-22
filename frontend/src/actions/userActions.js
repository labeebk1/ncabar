import fetch from 'cross-fetch'
import { userConstants } from '../constants/userConstants';

export function getLoginStatus() {
    return async function(dispatch) {
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/logged_in/', {
                credentials: 'include',
            });
            const json = await response.json();
            if (json.result === userConstants.LOGGED_OUT) {
                dispatch({
                    type: userConstants.LOGIN_STATUS,
                    payload: userConstants.LOGGED_OUT
                });
            }
            if (json.result === userConstants.LOGGED_IN) {
                dispatch({
                    type: userConstants.LOGIN_STATUS,
                    payload: userConstants.LOGGED_IN
                });
                dispatch({
                    type: userConstants.LOGIN_NAME,
                    payload: json.first_name
                });
            }
        }
        catch (error) {
            console.log('An error occured.', error);
        }
    }
}
export function logout() {
    return async function(dispatch) {
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/logout/', {
               method: 'GET',
               headers: {'Content-Type': 'application/json'},
               mode: 'cors',
               cache: 'default',
               credentials: 'include',
            });
            const json = await response.json();
            if (json.result === userConstants.LOGOUT_SUCCESS) {
                dispatch({
                    type: userConstants.LOGIN_STATUS,
                    payload: userConstants.LOGGED_OUT
                });
            }
        }
        catch (error) {
            console.log('An error accured.', error);
        }
    }
}
export function resetLoginPage(){
    return async function(dispatch){
        dispatch({
            type: userConstants.LOGIN_REQUEST,
            payload: userConstants.LOGIN_REQUEST
        })
    }
}

export function login(email, password) {
    return async function(dispatch) {
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               mode: 'cors',
               cache: 'default',
               body: JSON.stringify({
                'email': email,
                'password': password
               }),
               credentials: 'include',
            });
            const json = await response.json();
            if (json.result === userConstants.LOGIN_SUCCESS) {
                dispatch({
                    type: userConstants.LOGIN_REQUEST,
                    payload: userConstants.LOGIN_SUCCESS
                });
                dispatch({
                    type: userConstants.LOGIN_NAME,
                    payload: json.first_name
                });
                dispatch({
                    type: userConstants.LOGIN_STATUS,
                    payload: userConstants.LOGGED_IN
                });
            }
            if (json.result === userConstants.LOGIN_FAILURE) {
                dispatch({
                    type: userConstants.LOGIN_REQUEST,
                    payload: userConstants.LOGIN_FAILURE
                });
            }
        }
        catch (error) {
            console.log('An error occured.', error);
        } 
    }
}

export function resetRegisterUser(){
    return async function(dispatch){
        dispatch({
            type: userConstants.REGISTER_REQUEST,
            payload: userConstants.REGISTER_REQUEST
        })
    }
}

export function registerUser(first_name, last_name, email, password){
    return async function(dispatch){
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/create_account/', {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               mode: 'cors',
               cache: 'default',
               body: JSON.stringify({
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'password': password
               }),
               credentials: 'include',
            });
            const json = await response.json();
            if (json.result === userConstants.REGISTER_SUCCESS) {
                dispatch({
                    type: userConstants.REGISTER_REQUEST,
                    payload: userConstants.REGISTER_SUCCESS
                });
            }
            if (json.result === userConstants.REGISTER_FAILURE) {
                dispatch({
                    type: userConstants.REGISTER_REQUEST,
                    payload: userConstants.REGISTER_FAILURE
                });
            }
        }
        catch(error) {
            console.log('An error occured.', error);
        }
    }
}

export function resetForgotPassword(){
    return async function(dispatch){
        dispatch({
            type: userConstants.EMAIL_STATUS,
            payload: userConstants.EMAIL_STATUS
        })
    }
}

export function forgotPassword(email) {
    return async function(dispatch) {
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/forgot_password/', {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               mode: 'cors',
               cache: 'default',
               body: JSON.stringify({
                'email': email,
               }),
               credentials: 'include',
            });
            const json = await response.json();
            if (json.result === userConstants.EMAIL_DOES_NOT_EXIST) {
                dispatch({
                    type: userConstants.EMAIL_STATUS,
                    payload: userConstants.EMAIL_DOES_NOT_EXIST
                });
            }
            if (json.result === userConstants.EMAIL_EXISTS_SUCCESS) {
                dispatch({
                    type: userConstants.EMAIL_STATUS,
                    payload: userConstants.EMAIL_EXISTS_SUCCESS
                })
            }
            if (json.result === userConstants.EMAIL_SERVICE_UNAVAILABLE) {
                dispatch({
                    type: userConstants.EMAIL_STATUS,
                    payload: userConstants.EMAIL_SERVICE_UNAVAILABLE
                })
            }
        }
        catch(error) {
            console.log('An error occured.', error);
        }
    }
}

// return fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, cors, *same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//         'Content-Type': 'application/json',
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrer: 'no-referrer', // no-referrer, *client
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
// })