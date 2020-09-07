import {GET_USER_BY_ID} from './constants'

var initialState = {
    name: '',
    level: ''
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_BY_ID:
            return {
                ...state,
                name: action.payload.name,
                level: action.payload.level
            }
        default:
            return state;
    }
}
export default usersReducer;