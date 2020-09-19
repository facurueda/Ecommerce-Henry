import axios from "axios";
import { GET_ORDER_QUANTITY, UPDATE_ORDER, GET_ORDER_BY_ID, GET_ALL_ORDERS, ADD_TO_CART } from "./constants";
const url = "http://localhost:3000/";

export const actionUpdateOrder = (idUser) => {
    return async (dispatch) => {
        await axios.get(url + 'order/' + idUser).then(res => {
            dispatch({ type: UPDATE_ORDER, payload: res.data })
        })
    }
}
export const actionGetOrder = (idUser) => {
    return async (dispatch) => {
        await axios.get(url + 'order/' + idUser).then(res => {
            console.log('res.data: ', res.data)
            if(res.data.products !== undefined) {
                dispatch({
                    type: GET_ORDER_QUANTITY, payload: res.data.products.reduce((acum, product) => {
                        return acum + product.Inter_Prod_Order.quantity
                    }, 0)
                })
            } else {
                dispatch({
                    type: GET_ORDER_QUANTITY, payload: 0
                })
            }
             
            dispatch({ type: GET_ORDER_BY_ID, payload: res.data })
        })
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