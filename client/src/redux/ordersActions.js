import axios from "axios";
import { GET_ORDER_BY_ID,GET_ALL_ORDERS } from "./constants";
const url = "http://localhost:3000/";


export const actionGetOrder = (idOrder) => {
    return (dispatch) => {
        axios.get(url + 'order/'+idOrder).then(res => {
            dispatch({type: GET_ORDER_BY_ID, payload: res.data})
        })
    }
}

export const actionGetAllOrders = () => {
    return (dispatch) => {
        axios.get(url + 'order').then(res => {
            dispatch({type: GET_ALL_ORDERS, payload: res.data})
        })
    }
}