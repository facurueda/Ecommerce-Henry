import axios from "axios";
import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE, PUT_CATEGORY, POST_CATEGORY_ERROR } from "./constants";

const url = "http://localhost:3000/";

/////////////////////////////////////////////////////////////////////// GET

export const actionGetCategoriesSuccess = (categories) => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: categories
  }
}

export const actionCategoriesFailure = (error) => {
  return {
    type: GET_CATEGORIES_FAILURE,
    payload: error
  }
}
export const actionGetCategories = () => {
  return (dispatch) => {
    axios.get('http://localhost:3000/category/', {withCredentials: true}).then(res => {
      dispatch(actionGetCategoriesSuccess(res.data))
    }).catch(error => {
      dispatch(actionCategoriesFailure('Hubo un error al buscar las categorias'))
    })
  }
}
export const actionPostCategory = (category) => {
  return (dispatch) => {
    axios.post(url + 'category/create', category, {withCredentials: true}).then(() => {
      actionGetCategories()
    }).catch(error => {
      dispatch({ type: POST_CATEGORY_ERROR })
    })
  }
}
export const actionDeleteCategory = (category) => {
  return (dispatch) => {
    axios.delete(url + 'category/' + category.idCategory,{withCredentials: true}).then(() => {
      dispatch(actionGetCategories())
    }).catch(actionCategoriesFailure('Hubo un error al eliminar la categoria.'))
  }
}
export const actionUpdateCategory = (category) => {
  return (dispatch) => {
    axios.put(url + 'category/' + category.idCategory, category, {withCredentials: true}).then(() => {
      dispatch({ type: PUT_CATEGORY })
      dispatch(actionGetCategories())
    })
  }
}



export default actionGetCategories;