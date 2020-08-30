import * as constans from "./constants";

var initialState = {
  products: [],
  categories: [],
  // relations: [],
//   relationsCategories: [],
//   productByID: {},
//   filterProducts: [],
//   users: [],
//   user: [],
//   cart: [],
//   orders: [],
//   reviews: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //PRODUCTS--------------------------------
    case constans.GET_PRODUCTS:
    case constans.POST_PRODUCT:
    case constans.PUT_PRODUCT:
    case constans.DELETE_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case constans.GET_PRODUCT_BY_ID:
      return {
        ...state,
        productByID: action.payload,
      };
    //CATEGORIES-----------------------------
    case constans.GET_CATEGORIES:
    case constans.POST_CATEGORY:
    case constans.PUT_CATEGORY:
    case constans.DELETE_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    //RELATIONS-------------------------------
    case constans.GET_RELATIONS:
    case constans.POST_RELATIONS:
    case constans.DELETE_RELATIONS:
    case constans.GET_RELATIONS_BY_ID:
      return {
        ...state,
        relations: action.payload,
      };
    case constans.GET_RELATIONS_CATEGORIES_BY_ID:
      return {
        ...state,
        relationsCategories: action.payload,
      }
      default:
        return state;
    }
  };
