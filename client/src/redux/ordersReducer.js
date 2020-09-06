import { GET_ORDER_BY_USER } from './constants'

var initialState = {
    loading: false,
    order: []
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_BY_USER:
            return {
                ...state,
                order: action.payload
            }
        default:
            return state;
    }
};
export default ordersReducer;