import { POST_CATEGORY_ERROR, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE, PUT_CATEGORY} from "./constants";

var initialState = {
  loading: false,
  categories: [],
  error: '',
  productsByCategory: []
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
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