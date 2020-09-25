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
            console.log(res.data)
            dispatch({ type: GET_USER_BY_ID, payload: res.data })
        })
    }
}
export const actionVerifyCookies = (cookie) => {
    return (dispatch) => {
        axios.post(url + 'auth/cookie', cookie).then((res) => {
            console.log('resVerifyCookie', res.data)
            if (res.verified) {
                dispatch({ type: AUTH_FAILED, payload: res.data })
            } else {
                dispatch({ type: USER_LOGGED_IN, payload: res.data })
            }
            return res
        }).catch(res => {
            console.log('resVerifyCookie', res)
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
        axios.post(url + 'auth/login', inputs).then((res) => {
            console.log('userData', res.data)
            return dispatch({ type: POST_LOGIN, payload: res.data })
        })
        // .then(() => {
        //     axios.get(url + 'auth/me').then(res => {
        //         return dispatch({ type: POST_LOGIN, payload: res.data })
        //     })
        // }).catch()
        // .then((res) => {
        //     axios.get(url + 'auth/me').then((res) => {
        //         if (res.status === 401) return dispatch({ type: AUTH_FAILED, payload: res.data })
        //         return dispatch({ type: USER_LOGGED_IN, payload: res.data })
        //     })
        // })-
    }
}

export const actionLogOut = (cookie) => {
    return (
        (dispatch) => {
            axios.post(url + 'auth/logout',cookie).then((res) => {
                console.log(res)
                return dispatch({ type: USER_LOGGED_OUT})
            }).catch(error => {console.log(error)})
        }
    )
}

export const actionSetVerified = (bool) => {
    return (dispatch) => { dispatch({ type: SET_VERIFIED, payload: bool }) }
}