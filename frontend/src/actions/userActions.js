import fetch from 'cross-fetch'
import { userConstants } from '../constants/userConstants';

export function getLoginStatus() {
    return async function(dispatch) {
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/logged_in/');
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
               })
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