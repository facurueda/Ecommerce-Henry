import { RESET_PASSWORD, SEND_EMAIL , GET_USER_BY_ID, SET_VERIFIED, USER_CREATED, USER_LOGGED_IN, POST_LOGIN, AUTH_FAILED, USER_LOGGED_OUT, SET_COOKIE_TO_STORE } from './constants'
const initialState = {
    idUser: 0,
    name: 'Guest',
    email: 'no-email',
    level: 'GUEST',
    verified: false,
    loggedOut: false
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_BY_ID:
            return {
                ...state,
                name: action.payload.name,
                level: action.payload.level,
                idUser: action.payload.idUser
            }
        case USER_CREATED:
            return state;
        case USER_LOGGED_IN:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                level: action.payload.level,
                idUser: action.payload.idUser,
                verified: action.payload.verified
            }
        case AUTH_FAILED:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                level: action.payload.level,
                idUser: action.payload.idUser,
                verified: action.payload.verified
            };
        case USER_LOGGED_OUT:
            return {
                ...state,
                idUser: 0,
                name: 'Guest',
                email: 'no-email',
                level: 'GUEST',
                loggedOut: true,
                verified: true
            };
        case POST_LOGIN:
            return {
                ...state,
                idUser: action.payload.idUser,
                name: action.payload.name,
                email: action.payload.email,
                level: action.payload.level,
                verified: action.payload.verified
            };

        case SET_VERIFIED:
            return {
                ...state,
                verified: action.payload
            }
        case SET_COOKIE_TO_STORE:
            return {
                ...state,
                idUser: action.payload.idUser,
                level: action.payload.level
            }
        case RESET_PASSWORD :
            return {
                ...state,
                email: action.payload.email
            }
        case SEND_EMAIL :
            return {
                ...state,
                email: action.payload.email
            }
        default:
            return state;
    }
}
export default usersReducer;