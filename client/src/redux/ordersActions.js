import axios from "axios";
import { GET_ORDER_BY_ID } from "./constants";
const url = "http://localhost:3000/";


export const actionGetOrder = (idOrder) => {
    return (dispatch) => {
        axios.get(url + 'order/'+idOrder).then(res => {
            dispatch({type: GET_ORDER_BY_ID, payload: res.data})
        })
    }
}