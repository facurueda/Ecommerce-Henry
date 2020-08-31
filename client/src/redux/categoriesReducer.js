import "./constants";
import { GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE } from "./constants";

var initialState = {
  loading: false,
  categories: [],
  error: ''
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        loading: true
      };
    case GET_CATEGORIES_SUCCESS:
      return{
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
      default:
        return state;
    }
  };
export default categoriesReducer;