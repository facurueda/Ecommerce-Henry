import axios from "axios";
import {
    RESET_STATUS_RESET,
    GET_ALL_USERS,
    RESET_OK,
    RESET_FAILED,
    RESET_PASSWORD,
    GET_USER_BY_ID,
    USER_CREATED,
    POST_LOGIN,
    USER_LOGGED_IN,
    AUTH_FAILED,
    USER_LOGGED_OUT,
    SET_VERIFIED,
    SET_COOKIE_TO_STORE,
    GET_ORDER_BY_ID,
    GET_ALL_USERS,
    USER_TO_ADMIN,
    ADMIN_TO_USER,
    DELETE_USER

} from "./constants";
const url = "http://localhost:3000/";
var qs = require('qs');
axios.defaults.withCrendentails = true;

export const actionGetUsers = () => {
    return (dispatch) => {
        axios.get(url + 'user/', {
            withCredentials: true
        }).then(res => {
            dispatch({
                type: GET_ALL_USERS,
                payload: res.data
            })
        })
    }
}

export const actionSetAdminUser = (user) => {
    return (dispatch) => {
        var data = qs.stringify(user);
        var config = {
            withCredentials: true,
            method: 'PUT',
            url: 'http://localhost:3000/auth/promote/' + user.idUser,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios(config)
            .then(() => {
                dispatch({
                    type: USER_TO_ADMIN,
                })
                return dispatch(actionGetUsers())
            })
    }
}

export const actionSetUser = (user) => {
    return (dispatch) => {
        var data = qs.stringify(user);
        var config = {
            withCredentials: true,
            method: 'PUT',
            url: 'http://localhost:3000/auth/degrade/' + user.idUser,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios(config)
            .then(() => {
                dispatch({
                    type: ADMIN_TO_USER,
                })
                return dispatch(actionGetUsers())
            })
    }
}

export const actionDeleteUser = (user) => {
    return (dispatch) => {
        var data = qs.stringify(user);
        var config = {
            withCredentials: true,
            method: 'DELETE',
            url: 'http://localhost:3000/user/' + user.idUser,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios(config)
            .then(() => {
                dispatch({
                    type: DELETE_USER,
                })
                return dispatch(actionGetUsers())
            })
    }
}

export const actionSetCookieToStore = (cookie) => {
    return (dispatch) => {
        dispatch({
            type: SET_COOKIE_TO_STORE,
            payload: cookie
        })
    }
}

// export const actionGetAllUsers = () => {
//     return (dispatch) => {
//         axios.get(url + 'user/', { withCredentials: true }).then(res => {
//             dispatch({ type: GET_ALL_USERS , payload: res.data})
//         })
//     }
// }

export const actionGetUserById = (idUser) => {
    return (dispatch) => {
        axios.get(url + 'user/' + idUser, {
            withCredentials: true
        }).then(res => {
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
        })
    }
}
export const actionResetStatusReset = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_STATUS_RESET
        })
    }
}
export const actionPasswordUpdate = (obj) => {
    return (dispatch) => {
        axios.post(url + 'auth/reset?token=' + obj.token, {
            password: obj.password
        }, {
            withCredentials: true
        }).then(() => {
            dispatch({
                type: RESET_OK,
                payload: ["Contraseña aplicada con éxito"]
            })
        }).catch(() => {
            dispatch({
                type: RESET_FAILED,
                payload: ["Algo falló al intentar cambiar la contraseña, intentelo denuevo."]
            })
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
        console.log('inputsInLogin', inputs)
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
                    return dispatch({
                        type: POST_LOGIN,
                        payload: res.data.dataValues
                    })
                })
            })
    }
}

export const actionGetMe = () => {
    return (dispatch) => {
        var config = {
            withCredentials: true,
            method: 'get',
            url: 'http://localhost:3000/auth/me',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        axios(config)
            .then( res => {
                return dispatch({
                    type: POST_LOGIN,
                    payload: res.data.dataValues
                })
            })
    }
}

export const actionLogOut = () => {
    return (
        (dispatch) => {
            axios.get(url + 'auth/logout', {
                withCredentials: true
            }).then((res) => {
                return dispatch({
                    type: USER_LOGGED_OUT,
                    payload: res.data
                })
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