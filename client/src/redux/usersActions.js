import axios from "axios";
import { GET_USER_BY_ID } from "./constants";
const url = "http://localhost:3000/";


export const actionGetUserById = (idUser) => {
    return (dispatch) => {
        axios.get(url + 'user/' + idUser).then(res => {
            dispatch({ type: GET_USER_BY_ID, payload: res.data })
        })
    }
}