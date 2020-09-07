import { GET_ORDER_BY_ID, GET_ALL_ORDERS } from './constants'

var initialState = {
    loading: false,
    order: [],
    orders: []
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_BY_ID:
            return {
                ...state,
                order: action.payload
            }
        case GET_ALL_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        default:
            return state;
    }
};
export default ordersReducer;