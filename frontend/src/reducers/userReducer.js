/*
 src/reducers/userReducer.js
*/
import { userConstants } from '../constants/userConstants';

export default (state = {}, action) => {
    switch(action.type) {
        case userConstants.LOGIN_STATUS:
            return {
                ...state,
                login_status: action.payload
            }
        case userConstants.REGISTER_REQUEST:
            return {
                ...state,
                register_status: action.payload
            }
        case userConstants.EMAIL_STATUS:
            return {
                ...state,
                email_status: action.payload
            }
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                login_request: action.payload
            }
        default:
            return state
    }
}