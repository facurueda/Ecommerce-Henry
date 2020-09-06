import axios from "axios";
import { GET_ORDER_BY_USER } from "./constants";
const url = "http://localhost:3000/";


export const actionGetOrder = (idUser) => {
    return (dispatch) => {
        axios.get(url + '/'+idUser+'/cart').then(res => {
            dispatch({type: GET_ORDER_BY_USER, payload: res.data})
        })
    }
}