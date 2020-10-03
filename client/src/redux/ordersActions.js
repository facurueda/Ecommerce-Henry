import axios from "axios";
import { SET_QUANTITY, UPDATE_ORDER, GET_ORDER_BY_ID, GET_ALL_ORDERS, ADD_TO_CART, END_CHECKOUT } from "./constants";
const url = "http://localhost:3000/";
var qs = require('qs');

export const actionCheckOut = () => {
    return (dispatch) => {
        axios.post(url + 'order/checkout', {}, { withCredentials: true, }).then(res => {
            dispatch({ type: END_CHECKOUT, payload: res.data })
            //   window.location.href = res.data
        }).catch(error => {
                console.log(error);
            });
    }
}

export const actionUpdateOrder = (idUser) => {
    return async (dispatch) => {
        await axios.get(url + 'order/' + idUser, { withCredentials: true }).then(res => {
            dispatch({ type: UPDATE_ORDER, payload: res.data })
        })
    }
}
export const actionGetOrder = (idUser) => {
    return async (dispatch) => {
        await axios.get(url + 'order/' + idUser, { withCredentials: true }).then(res => {
            dispatch({ type: GET_ORDER_BY_ID, payload: res.data })
            return res.data
        }).then((data) => {
            if (data.products) {
                const acum = data.products.reduce((acum, product) => {
                    return acum + product.Inter_Prod_Order.quantity
                }, 0)
                dispatch({ type: SET_QUANTITY, payload: acum })
            }
        })
    }
}
export const actionGetOrdersByUser = (idUser) => {
    return (dispatch) => {
        axios.get(url + 'order/history/' + idUser, { withCredentials: true }).then(res => {
            dispatch({ type: GET_ALL_ORDERS, payload: res.data })
        })
    }
}
export const actionGetAllOrders = () => {
    return (dispatch) => {
        axios.get(url + 'order', { withCredentials: true }).then(res => {
            dispatch({ type: GET_ALL_ORDERS, payload: res.data })
        })
    }
}
export const actionSetQuantity = (quantity) => {
    return (dispatch) => {
        dispatch({ type: SET_QUANTITY, payload: quantity })
    }
}

export const actionAddToCart = (props) => {
    return (dispatch) => {
        axios.post(url + 'user/' + props.idUser + '/cart', props, { withCredentials: true }).then(() => {
            return dispatch({ type: ADD_TO_CART })
        }).then(() => {
            return dispatch(actionGetOrder(props.idUser))
        })
    }
}