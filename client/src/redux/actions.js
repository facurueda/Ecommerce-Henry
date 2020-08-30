import * as constans from "./constants";
import axios from "axios";

const url = "http://localhost:3000/";

const instance = axios.create({
  withCredentials: true,
  baseURL: url,
});

// ------------------------------------------------------------------------------------
// ---------------------------PRODUCTS-------------------------------------------------
// -----------------------------------------------------------------------------------
export const getProducts = () => {
  return (dispatch) => {
    instance.get("products").then((res) => {
      if (res.status === 200) {
        return dispatch({ type: constans.GET_PRODUCTS, payload: res.data });
      }
    });
  };
};

export const getProductById = (id) => {
  return function (dispatch) {
    instance.get("products/" + id).then((payload) => {
      dispatch({ type: constans.GET_PRODUCT_BY_ID, payload: payload.data });
    });
  };
};

export const postProduct = (value) => {
  return function (dispatch) {
    instance.post("products/", value).then((res) => {
      dispatch({ type: constans.POST_PRODUCT, payload: res.data });
    });
  };
};

export const putProduct = (id, value) => {
  return function (dispatch) {
    instance.put("products/" + id, value).then((payload) => {
      dispatch({ type: constans.POST_PRODUCT, payload: payload });
    });
  };
};

export const deleteProduct = (id) => {
  return function (dispatch) {
    instance.delete("products/" + id).then((res) => {
      dispatch({ type: constans.DELETE_PRODUCT, payload: res.data });
    });
  };
};

// ------------------------------------------------------------------------------------
// ---------------------------CATEGORIES-----------------------------------------------
// ------------------------------------------------------------------------------------

export const getCategories = () => {
  return (dispatch) => {
    instance.get("category").then((res) => {
      if (res.status == 200) {
        return dispatch({ type: constans.GET_CATEGORIES, payload: res.data });
      }
    });
  };
};

export const postCategories = (value) => {
  return function (dispatch) {
    instance.post("category/create", value).then((payload) => {
      dispatch({ type: constans.POST_CATEGORY, payload: payload });
    });
  };
};

export const putCategories = (id, value) => {
  return function (dispatch) {
    instance.put("category/" + id, value).then((payload) => {
      dispatch({ type: constans.PUT_CATEGORY, payload: payload });
    });
  };
};

export const deleteCategories = (id) => {
  return function (dispatch) {
    instance.delete("category/" + id).then((payload) => {
      dispatch({ type: constans.DELETE_CATEGORY, payload: payload });
    });
  };
};

// ------------------------------------------------------------------------------------
// ---------------------------RELATIONS------------------------------------------------
// ------------------------------------------------------------------------------------

export const postRelations = (idProduct, idCategory, value) => {
  return function (dispatch) {
    instance
      .post("products/" + idProduct + "/category" + idCategory, value)
      .then((payload) => {
        dispatch({ type: constans.POST_RELATIONS, payload: payload });
      });
  };
};

export const deleteRelations = (idProduct, idCategory, value) => {
  return function (dispatch) {
    instance
      .delete("products/" + idProduct + "/category" + idCategory, value)
      .then((payload) => {
        dispatch({ type: constans.DELETE_RELATIONS, payload: payload });
      });
  };
};

// export const getRelations = () => {
//   return function (dispatch) {
//     instance.get("relations").then((payload) => {
//       dispatch({ type: constans.GET_RELATIONS, payload: payload.data });
//     });
//   };
// };

// export const getRelationsById = (idCat) => {
//   return function (dispatch) {
//     instance.get("relations/" + idCat).then((payload) => {
//       dispatch({ type: constans.GET_RELATIONS_BY_ID, payload: payload.data });
//     });
//   };
// };

// export const getRelationsCategoriesById = (idCat) => {
//   return function (dispatch) {
//     instance.get("relations/product/" + idCat).then((payload) => {
//       dispatch({
//         type: constans.GET_RELATIONS_CATEGORIES_BY_ID,
//         payload: payload.data,
//       });
//     });
//   };
// };