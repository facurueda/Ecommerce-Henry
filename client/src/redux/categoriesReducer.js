import "./constants";
import { POST_CATEGORY_ERROR, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE, PUT_CATEGORY, GET_PRODUCTS_BY_CATEGORY } from "./constants";

var initialState = {
  loading: false,
  categories: [],
  error: '',
  productsByCategory: []
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      state.categories = action.payload
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: ''
      }
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        categories: [],
        error: action.payload
      }
    case PUT_CATEGORY:
      return {
        ...state,
        loading: false,
        categories: [...state.categories],
        error: ''
      }
    case GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        productsByCategory: action.payload
      }
    case POST_CATEGORY_ERROR:
      return {
        ...state,
        error: 'Hubo un error al enviar la categoria'
      }
    default:
      return state;
  }
};
export default categoriesReducer;