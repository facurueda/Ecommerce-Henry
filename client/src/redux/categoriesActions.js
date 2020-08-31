import "./constants";
import axios from "axios";
import { GET_CATEGORIES, GET_PRODUCTS, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE } from "./constants";

const url = "http://localhost:3000/";



export const fetchCategoriesRequest = () => {
  return {
    type: GET_CATEGORIES,
  }
}
export const fetchCategoriesSuccess = (categories) => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: categories
  }
}
export const fetchCategoriesFailure = (error) => {
  return {
    type: GET_CATEGORIES_FAILURE,
    payload: error
  }
}

const fetchCategories = () => {
  return (dispatch) => {
    // dispatch(fetchCategoriesRequest())
    axios.get('http://localhost:3000/category/').then(res => {
      dispatch(fetchCategoriesSuccess(res.data))
    }).catch(error => {
      dispatch(fetchCategoriesFailure('Hubo un error al buscar las categorias'))
    })
  }
}

export default fetchCategories;