import axios from "axios";
import { EMPTY_CART, SET_QUANTITY, UPDATE_ORDER, GET_ORDER_BY_ID, GET_ALL_ORDERS, ADD_TO_CART, END_CHECKOUT, SET_ORDER_CERRADA_TO_VIEW, SEND_DIRECCION_TO_DB, GET_DIRECCION, DELETE_DIRECCION } from "./constants";
const url = "http://localhost:3000/";
var qs = require('qs');
axios.defaults.withCrendentails = true;


///////////////////////////// Acciones de Direcciones

export const actionDeleteDireccion = (idOrderUser) => {
    console.log('IDORDEER', idOrderUser)
    return (dispatch) => {
            var data = qs.stringify({idOrderUser});
            console.log('DATAORDER', data)
            var config = {
                withCredentials: true,
                method: 'DELETE',
                url: 'http://localhost:3000/order/deleteDireccion',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };
            axios(config)
                .then((res) => {
                    dispatch({
                        type: DELETE_DIRECCION,
                    })
                }).catch(error => {
                    console.log('ERROR', error)
                })
    }
}

export const actionSendDirectionToDB = ({direccion, idOrderUser}) => {
    return (dispatch) => {
            var data = qs.stringify({direccion, idOrderUser});
            var config = {
                withCredentials: true,
                method: 'POST',
                url: 'http://localhost:3000/order/setDireccion',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };
            axios(config)
                .then((res) => {
                    console.log('RESPUESTAAAA', res.data)
                    dispatch({
                        type: SEND_DIRECCION_TO_DB,
                        payload: res.data
                    })
                }).catch(error => {
                    console.log('ERROOOOOR', error)
                })
    }
}

export const actionGetDirection = () => {
    return (dispatch) => {
        var config = {
            withCredentials: true,
            method: 'POST',
            url: 'http://localhost:3000/order/direccion',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        };
        axios(config)
            .then((res) => {
                dispatch({
                    type: GET_DIRECCION,
                    payload: res.data
                })
            }).catch(error => {
                console.log('ERROR', error)
            })
}
}

export const actionSetOrderCerradaToView = () => {
    return (dispatch) => {
        var config = {
            withCredentials: true,
            method: 'POST',
            url: 'http://localhost:3000/order/cerrada',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        };
        axios(config)
            .then((res) => {
                dispatch({
                    type: SET_ORDER_CERRADA_TO_VIEW,
                    payload: res.data
                })
            })
    }
}

export const actionCheckOut = (cancelarEnvio, idOrderUser,user) => {
    return (dispatch) => {
        axios.post(url + 'order/checkout', {cancelarEnvio, idOrderUser,user}, { withCredentials: true }).then(res => {
            dispatch({ type: END_CHECKOUT, payload: res.data })
        }).catch(error => {
                console.log(error);
            });
    }
}

export const actionUpdateOrder = (idUser) => {
    return async (dispatch) => {
        await axios.get(url + 'order/' + idUser, { withCredentials: true }).then(res => {
            dispatch({ type: UPDATE_ORDER, payload: res.data })
        })
    }
}
export const actionGetOrder = (idUser) => {
    return async (dispatch) => {
        await axios.get(url + 'order/' + idUser, { withCredentials: true }).then(res => {
            dispatch({ type: GET_ORDER_BY_ID, payload: res.data })
            return res.data
        }).then((data) => {
            if (data.products) {
                const acum = data.products.reduce((acum, product) => {
                    return acum + product.Inter_Prod_Order.quantity
                }, 0)
                dispatch({ type: SET_QUANTITY, payload: acum })
            }
        })
    }
}
export const actionGetOrdersByUser = (idUser) => {
    return (dispatch) => {
        axios.get(url + 'order/history/' + idUser, { withCredentials: true }).then(res => {
            dispatch({ type: GET_ALL_ORDERS, payload: res.data })
        })
    }
}
export const actionGetAllOrders = () => {
    return (dispatch) => {
        axios.get(url + 'order', { withCredentials: true }).then(res => {
            dispatch({ type: GET_ALL_ORDERS, payload: res.data })
        })
    }
}
export const actionSetQuantity = (quantity) => {
    return (dispatch) => {
        dispatch({ type: SET_QUANTITY, payload: quantity })
    }
}

export const actionAddToCart = (props) => {
    return (dispatch) => {
        axios.post(url + 'user/' + props.idUser + '/cart', props, { withCredentials: true }).then(() => {
            return dispatch({ type: ADD_TO_CART })
        }).then(() => {
            return dispatch(actionGetOrder(props.idUser))
        })
    }
}

export const actionEmptyCart = (idUser) => {
    return (dispatch) => {
      axios.delete( url + 'user/' + idUser + '/cart', { withCredentials: true }).then(()=> {
        dispatch(actionGetOrder(idUser))
      }).catch(error => {
        console.log('error', error)
    })
    }
}