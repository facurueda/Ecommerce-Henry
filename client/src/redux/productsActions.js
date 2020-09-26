import axios from "axios";
import { SET_PRODUCT, GET_PRODUCT_BY_ID, GET_PRODUCTS_BY_SEARCH_TERM, PRODUCT_PUT, PRODUCT_POST, DELETE_PRODUCT, GET_PRODUCTS, PRODUCTS_ERROR, PRODUCTS_LOADING, GET_PRODUCTS_BY_CATEGORY } from "./constants";


const url = "http://localhost:3000/";

export const actionGetProduct = (idProduct) => {
    return (dispatch) => {
        axios.get(url + 'products/' + idProduct, { withCredentials: true }).then((res) => {
            dispatch({ type: GET_PRODUCT_BY_ID, payload: res.data })
        })
    }
}
export const actionGetProductsBySearchTerm = (term) => {
    return (dispatch) => {
        axios.get(url + 'products/search?query=' + term, { withCredentials: true }).then(res => {
            dispatch({ type: GET_PRODUCTS_BY_SEARCH_TERM, payload: res.data })
        }).catch((error) => {
            console.log(error);
        })
    }
}

export const actionGetProductsByCategory = (name) => {
    return (dispatch) => {
        axios.get(url + 'category/' + name, { withCredentials: true }).then(res => {
            dispatch({ type: GET_PRODUCTS_BY_CATEGORY, payload: res.data })
        })
    }
}
export const actionUpdateProductLocalStore = (product) => {
    return (dispatch) => {
        dispatch({ type: PRODUCT_PUT, payload: product })
    }
}
export const actionUpdateProduct = (product) => {
    return (dispatch) => {
        axios.put(url + 'products/' + product.idProduct, product, { withCredentials: true }).then((res) => {
            dispatch({ type: PRODUCT_PUT, payload: res.data })
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
        axios.get(url + 'products/', { withCredentials: true }).then(res => {
            console.log("actionGetProducts:\n", res.data);
            dispatch({ type: GET_PRODUCTS, payload: res.data })
        }).catch(error => {
            dispatch({ type: PRODUCTS_ERROR, payload: error })
        })
    }
}
export const actionSetProduct = (product) => {
    return (dispatch) => {
        dispatch({ type: SET_PRODUCT, payload: product })
    }
}
export const actionDeleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(url + 'products/' + id, { withCredentials: true }).then(dispatch({ type: DELETE_PRODUCT })).catch(error => {
            dispatch({ type: PRODUCTS_ERROR, payload: error })
        })
    }
}
export const actionPostProduct = (product) => {
    return (dispatch) => {
        axios.post(url + 'products/create', product, { withCredentials: true }).then(() => {
            dispatch({ type: PRODUCT_POST })
        })
    }
}