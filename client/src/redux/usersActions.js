import axios from "axios";
import {
    RESET_PASSWORD,
    GET_USER_BY_ID,
    USER_CREATED,
    POST_LOGIN,
    USER_LOGGED_IN,
    AUTH_FAILED,
    USER_LOGGED_OUT,
    SET_VERIFIED,
    SET_COOKIE_TO_STORE,
    GET_ORDER_BY_ID
} from "./constants";
const url = "http://localhost:3000/";
var qs = require('qs');
axios.defaults.withCrendentails = true;

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
        axios.get(url + 'user/' + idUser, {
            withCredentials: true
        }).then(res => {
            console.log(res.data)
            dispatch({
                type: GET_USER_BY_ID,
                payload: res.data
            })
        })
    }
}
export const actionVerifyCookies = (cookie) => {
    return (dispatch) => {
        axios.post(url + 'auth/cookie', cookie, {
            withCredentials: true
        }).then((res) => {
            console.log('resVerifyCookie', res.data)
            if (res.verified) {
                dispatch({
                    type: AUTH_FAILED,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: USER_LOGGED_IN,
                    payload: res.data
                })
            }
            return res
        }).catch(res => {
            console.log('resVerifyCookie', res)
        })
    }
}

export const actionUserCreate = (props) => {
    return (dispatch) => {
        axios.post(url + 'user', props, {
            withCredentials: true
        }).then(() => {
            dispatch({
                type: USER_CREATED
            })
        })
    }
}

export const actionLogin = (inputs) => {
    return (dispatch) => {
        var data = qs.stringify(inputs);
        var config = {
            withCredentials: true,
            method: 'post',
            url: 'http://localhost:3000/auth/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios(config)
            .then(() => {
                axios.get(url + 'auth/me', {
                    withCredentials: true
                }).then(res => {
                    console.log(res.data)
                    return dispatch({
                        type: POST_LOGIN,
                        payload: res.data.dataValues
                    })
                })
            })
    }
}

export const actionLogOut = () => {
    return (
        (dispatch) => {
            axios.post(url + 'auth/logout', {
                withCredentials: true
            }).then((res) => {
                return dispatch({
                    type: USER_LOGGED_OUT,
                    payload: res.body
                })
            }).catch(error => {
                console.log(error)
            })
        }
    )
}

export const actionSetVerified = (bool) => {
    return (dispatch) => {
        dispatch({
            type: SET_VERIFIED,
            payload: bool
        })
    }
}

export const actionResetPassword = (email) => {
    return (
        (dispatch) => {
            axios.post(url + 'auth/forgot', email, {
                withCredentials: true
            }).then((res) => {
                return dispatch({
                    type: RESET_PASSWORD,
                    payload: res.data
                })
            })
        }
    )
}