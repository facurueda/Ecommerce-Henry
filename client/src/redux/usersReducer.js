import {GET_USER_BY_ID, USER_CREATED} from './constants'

var initialState = {
    idUser: 0,
    name: '',
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
        default:
            return state;
    }
}
export default usersReducer;