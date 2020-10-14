import { CANCELAR_ORDER, EMPTY_CART, SET_QUANTITY, UPDATE_ORDER, GET_ORDER_BY_ID, GET_ALL_ORDERS, ADD_TO_CART, END_CHECKOUT, SET_ORDER_CERRADA_TO_VIEW, SEND_DIRECCION_TO_DB, GET_DIRECCION, DELETE_DIRECCION } from './constants'

var initialState = {
    loading: false,
    order: [],
    orders: [],
    quantity: 0,
    urlCheckout: '',
    orderCerrada: [],
    direccion: []
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
        case SET_ORDER_CERRADA_TO_VIEW:
            return {
                ...state,
                orderCerrada: action.payload
            }
        case SEND_DIRECCION_TO_DB:
            return {
                ...state,
                direccion: action.payload
            }
        case GET_DIRECCION:
            return {
                ...state,
                direccion: action.payload
            }
        case DELETE_DIRECCION:
            return state
        case EMPTY_CART:
            return {
                ...state,
            }  
        case CANCELAR_ORDER:
            return {
                ...state
            }
        default:
            return state;
    }
};
export default ordersReducer;