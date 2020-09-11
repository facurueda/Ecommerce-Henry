import axios from "axios";
import { GET_ORDER_BY_ID, GET_ALL_ORDERS, ADD_TO_CART } from "./constants";
const url = "http://localhost:3000/";


export const actionGetOrder = (idOrder) => {
    return (dispatch) => {
        axios.get(url + 'order/' + idOrder).then(res => {
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
        axios.post(url + 'user/' + props.idUser + '/cart',props)
            .then(() => {
                dispatch({ type: ADD_TO_CART })
            })
    }
}