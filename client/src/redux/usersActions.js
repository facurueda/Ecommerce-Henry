import axios from "axios";
import { GET_USER_BY_ID, USER_CREATED, POST_LOGIN, USER_LOGGED, AUTH_FAILED } from "./constants";
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
export const actionLogin = (inputs) => {
    const { email , password } = inputs
    return (
        (dispatch) => {
            axios.post(url + '/auth/login', { email, password }).then(() => {
                return dispatch({ type: POST_LOGIN })
       }).then(() => {
            axios.get(url + '/auth/me').then((res)=> {
                if (res.status === 401)  return dispatch({ type: AUTH_FAILED })
                return dispatch({ type: USER_LOGGED })
            })
       })
    })
}