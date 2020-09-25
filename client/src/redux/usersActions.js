import axios from "axios";
import { GET_USER_BY_ID, USER_CREATED, POST_LOGIN, USER_LOGGED_IN, AUTH_FAILED, USER_LOGGED_OUT, SET_VERIFIED, SET_COOKIE_TO_STORE, GET_ORDER_BY_ID } from "./constants";
const url = "http://localhost:3000/";
// const cors = require('cors')
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
        
        var data = inputs;
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
            .then(function (res) {
                console.log(res)
                dispatch({
                    type: POST_LOGIN,
                    payload: res.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        
        
        // axios.post(url + 'auth/login', inputs).then((res) => {
        //     console.log('userData', res.data)
        //     return dispatch({ type: POST_LOGIN, payload: res.data })
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