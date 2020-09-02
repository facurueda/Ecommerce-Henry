import axios from "axios";
import { PRODUCT_PUT, PRODUCT_POST, DELETE_PRODUCT, GET_PRODUCTS, PRODUCTS_ERROR, PRODUCTS_LOADING, GET_PRODUCTS_BY_CATEGORY } from "./constants";
import productsReducer from "./productsReducer";


const url = "http://localhost:3000/";

export const actionGetProductsByCategory = (name) => {
    return (dispatch) => {
        axios.get(url + 'category/' + name).then(res => {
            dispatch({ type: GET_PRODUCTS_BY_CATEGORY, payload: res.data })
        })
    }
}
export const actionUpdateProduct = (product) => {
    return (dispatch) => {
        axios.put(url + 'products/' + product.idProduct, product).then(() => {
            dispatch({ type: PRODUCT_PUT })
        }).catch((error) => {
            dispatch({ type: PRODUCTS_ERROR, payload: error })
        })
    }
}
export const actionLoadingProducts = () => {
    return {
        type: PRODUCTS_LOADING
    }
}
export const actionGetProducts = () => {
    return (dispatch) => {
        dispatch(actionLoadingProducts())
        axios.get(url + 'products/').then(res => {
            dispatch({ type: GET_PRODUCTS, payload: res.data })
        }).catch(error => {
            dispatch({ type: PRODUCTS_ERROR, payload: error })
        })
    }
}
export const actionDeleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(url + 'products/' + id).then(dispatch({ type: DELETE_PRODUCT })).catch(error => {
            dispatch({ type: PRODUCTS_ERROR, payload: error })
        })
    }
}
export const actionPostProduct = (product) => {
    return (dispatch) => {
        axios.post(url + 'products/create', product).then(() => {
            dispatch({ type: PRODUCT_POST })
        })
    }
}