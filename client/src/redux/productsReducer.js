import {PRODUCTS_ERROR, GET_PRODUCTS} from './constants'

var initialState = {
    loading: false,
    products: [],
    error: '',
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_ERROR:
            return {
                ...state,
                error: 'hubo un error al manejar los productos: \n' + action.payload
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return state;
    }
};
export default productsReducer;
