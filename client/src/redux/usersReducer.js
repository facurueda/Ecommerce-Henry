import {GET_USER_BY_ID, USER_CREATED, USER_LOGGED_IN, POST_LOGIN, AUTH_FAILED, USER_LOGGED_OUT} from './constants'

var initialState = {
    idUser: 0,
    name: '',
    email: '',
    level: ''
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
                idUser: action.payload.idUser
            }
        case USER_LOGGED_OUT:
            return state;
        case POST_LOGIN:
            return state;
        case AUTH_FAILED:
            return state;

        default:
            return state;
    }
}
export default usersReducer;