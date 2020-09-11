import { GET_PRODUCTS_BY_SEARCH_TERM, PRODUCT_PUT, PRODUCT_POST, DELETE_PRODUCT, PRODUCTS_ERROR, GET_PRODUCTS, PRODUCTS_LOADING, GET_PRODUCTS_BY_CATEGORY } from './constants'

var initialState = {
    loading: false,
    products: [],
    error: '',
    term: [],
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_PUT:
            return state;
        case PRODUCT_POST:
            return state;
        case DELETE_PRODUCT:
            return state;
        case GET_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                products: action.payload
            }
        case GET_PRODUCTS_BY_SEARCH_TERM:
            return {
                ...state,
                term: action.payload
            };
        case PRODUCTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case PRODUCTS_ERROR:
            return {
                ...state,
                error: 'hubo un error al manejar los productos: \n' + action.payload
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        default:
            return state;
    }
};
export default productsReducer;
