import axios from "axios";
import { GET_PRODUCTS, PRODUCTS_ERROR } from "./constants";


const url = "http://localhost:3000/products/";

export const actionGetProducts = () => {
    return (dispatch) => {
        axios.get(url).then(res => {
            dispatch({type: GET_PRODUCTS, payload: res.data})
            }).catch(error => {
                dispatch({type: PRODUCTS_ERROR, payload: error})
        })
    }

}