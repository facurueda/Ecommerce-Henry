import {
    SET_MODAL_LOGIN,
    RESET_STATUS_RESET,
    RESET_OK,
    RESET_FAILED,
    RESET_PASSWORD,
    SEND_EMAIL,
    GET_USER_BY_ID,
    SET_VERIFIED,
    USER_CREATED,
    USER_LOGGED_IN,
    POST_LOGIN,
    AUTH_FAILED,
    USER_LOGGED_OUT,
    GET_ALL_USERS,
    SET_COOKIE_TO_STORE,
    USER_TO_ADMIN,
    ADMIN_TO_USER,
    DELETE_USER,
    GET_ALL_DIRECTIONS,
    UPDATE_USER,
    FILE_UPLOAD,
    PUT_DATA
} from './constants'

const initialState = {
    idUser: 0,
    name: 'Guest',
    email: 'no-email',
    level: 'GUEST',
    verified: false,
    loggedOut: false,
    resetStatus: [],
    users: [],
    direcciones: [],
    modalLogin: false,
    img: ''
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email
            }
        case SET_MODAL_LOGIN:
            return {
                ...state,
                modalLogin: action.payload
            }
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload
            }
        case USER_TO_ADMIN:
            return state;
        case ADMIN_TO_USER:
            return state;
        case DELETE_USER:
            return state;
        case RESET_STATUS_RESET:
            return state;
        case RESET_OK:
            return {
                ...state,
                resetStatus: action.payload
            }
        case RESET_FAILED:
            return {
                ...state,
                resetStatus: action.payload
            }
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
                verified: true,
                loggedOut: action.payload
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
        case RESET_PASSWORD:
            return {
                ...state,
                email: action.payload.email
            }
        case SEND_EMAIL:
            return {
                ...state,
                email: action.payload.email
            }
        case GET_ALL_DIRECTIONS:
            return {
                ...state,
                direcciones: action.payload
            }
            case PUT_DATA:
                return {
                  ...state,
                  email: action.payload.email,
                  name: action.payload.name,
                };
          
              case FILE_UPLOAD:
                return {
                  ...state,
                };
        default:
            return state;
    }
}
export default usersReducer;
