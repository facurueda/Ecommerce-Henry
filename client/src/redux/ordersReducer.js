import { SET_QUANTITY, UPDATE_ORDER, GET_ORDER_BY_ID, GET_ALL_ORDERS, ADD_TO_CART, END_CHECKOUT } from './constants'

var initialState = {
    loading: false,
    order: [],
    orders: [],
    quantity: 0,
    urlCheckout: ''
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_BY_ID:
            return {
                ...state,
                order: action.payload
            }
        case SET_QUANTITY:
            return {
                ...state,
                quantity: action.payload
            }
        case UPDATE_ORDER:
            return {
                ...state,
                order: action.payload
            }
        case GET_ALL_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case ADD_TO_CART:
            return state
        case END_CHECKOUT:
            return {
                ...state,
                urlCheckout: action.payload
            }

        default:
            return state;
    }
};
export default ordersReducer;