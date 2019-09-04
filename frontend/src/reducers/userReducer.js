/*
 src/reducers/userReducer.js
*/
import { userConstants } from '../constants/userConstants';

export default (state = {}, action) => {
    switch(action.type) {
        case userConstants.LOGIN_STATUS:
            return {
                login_status: action.payload
            }
        case userConstants.REGISTER_REQUEST:
            return {
                register_status: action.payload
            }
        case userConstants.EMAIL_STATUS:
            return {
                email_status: action.payload
            }
        default:
            return state
    }
}