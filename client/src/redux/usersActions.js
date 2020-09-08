import axios from "axios";
import { GET_USER_BY_ID, USER_CREATED } from "./constants";
const url = "http://localhost:3000/";


export const actionGetUserById = (idUser) => {
    return (dispatch) => {
        axios.get(url + 'user/' + idUser ).then(res => {
            dispatch({ type: GET_USER_BY_ID, payload: res.data })
        })
    }
}
export const actionUserCreate = (props) => {
    const {name, email, password, level} = props
    return (dispatch) => {
        axios.post(url + 'user', {name, email, password, level}).then(() => {
            dispatch({type: USER_CREATED})
        })
    }
}