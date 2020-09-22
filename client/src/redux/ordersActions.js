import axios from "axios";
import { SET_QUANTITY, UPDATE_ORDER, GET_ORDER_BY_ID, GET_ALL_ORDERS, ADD_TO_CART } from "./constants";
const url = "http://localhost:3000/";

export const actionUpdateOrder = (idUser) => {
    return async (dispatch) => {
        await axios.get(url + 'order/' + idUser).then(res => {
            dispatch({ type: UPDATE_ORDER, payload: res.data })
        })
    }
}
export const actionGetOrder = (idUser) => {
    return (dispatch) => {
        axios.get(url + 'order/' + idUser).then(res => {
            dispatch({ type: GET_ORDER_BY_ID, payload: res.data })
        })
    }
}

export const actionSetQuantity = (quantity) => {
    return (dispatch) => {
        dispatch({ type: SET_QUANTITY, payload: quantity })
    }
}

export const actionGetAllOrders = () => {
    return (dispatch) => {
        axios.get(url + 'order').then(res => {
            dispatch({ type: GET_ALL_ORDERS, payload: res.data })
        })
    }
}
export const actionAddToCart = (props) => {
    return (dispatch) => {
        axios.post(url + 'user/' + props.idUser + '/cart', props)
            .then(() => {
                dispatch({ type: ADD_TO_CART })
            })
    }
}