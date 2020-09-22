import axios from "axios";
import { GET_USER_BY_ID, USER_CREATED, POST_LOGIN, USER_LOGGED_IN, AUTH_FAILED, USER_LOGGED_OUT, SET_VERIFIED, SET_COOKIE_TO_STORE, GET_ORDER_BY_ID } from "./constants";
const url = "http://localhost:3000/";

export const actionSetCookieToStore = (cookie) => {

    return (dispatch) => {
        dispatch({
            type: SET_COOKIE_TO_STORE,
            payload: cookie
        })
    }
}

export const actionGetUserById = (idUser) => {
    return (dispatch) => {
        axios.get(url + 'user/' + idUser).then(res => {
            dispatch({ type: GET_USER_BY_ID, payload: res.data })
        })
    }
}
export const actionVerifyCookies = (cookie) => {
    console.log('cookieInDispatchToSendBack', cookie)
    return (dispatch) => {
        axios.post(url + 'auth/cookie', cookie).then((res) => {
            console.log('res',res)
            if (res.verified){
                dispatch({ type: AUTH_FAILED, payload: res.data })
                dispatch({ type: GET_ORDER_BY_ID, payload: res.data.order })
            } else {
                dispatch({type: USER_LOGGED_IN, payload: res.data })
                dispatch({ type: GET_ORDER_BY_ID, payload: res.data.order })
            } 
        })
    }
}
export const actionUserCreate = (props) => {
    return (dispatch) => {
        axios.post(url + 'user', props).then(() => {
            dispatch({ type: USER_CREATED })
        })
    }
}
export const actionLogin = (inputs) => {
    return (dispatch) => {
            axios.post(url + 'auth/login', inputs).then(() => {
                return dispatch({ type: POST_LOGIN })
            })
            // .then((res) => {
            //     axios.get(url + 'auth/me').then((res) => {
            //         if (res.status === 401) return dispatch({ type: AUTH_FAILED, payload: res.data })
            //         return dispatch({ type: USER_LOGGED_IN, payload: res.data })
            //     })
            // })
        }
}
export const actionLogOut = (user) => {
    return (
        (dispatch) => {
            axios.post(url + 'auth/logout', user).then((res) => {
                localStorage.removeItem("user");
                return dispatch({ type: USER_LOGGED_OUT , payload: res.data})
            })
        }
    )
}
export const actionSetVerified = (bool) => {
    return (dispatch) =>  { dispatch({ type: SET_VERIFIED , payload: bool }) }   
}