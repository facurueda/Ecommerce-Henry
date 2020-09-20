import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { actionAddToCart, actionGetOrder } from '../redux/ordersActions'
import './ButtonAddToCart.css'
import { useCookies } from 'react-cookie';

const ButtonAddToCart = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.usersReducer.idUser)

    const [cookies, setCookie] = useCookies(['cart'])

    const handleChancla = () => {
        if (user) {
            dispatch(actionAddToCart({ idUser: user, idProduct: props.datos.idProduct, quantity: 1, price: props.datos.price }))
            dispatch(actionGetOrder(user))
        } else {
            if (typeof cookies.carrito !== 'object') {
                setCookie('carrito', [])
                window.alert('Su solicitud no pudo ser procesada, por favor intente nuevamente.')
                window.location.reload()
            } else {
                const prepareCookie = [...cookies.carrito, {description: '', idUser: user, idProduct: props.datos.idProduct, quantity: 1, price: props.datos.price }]
                setCookie('carrito', prepareCookie)
            }
        }
    }
    return (<div>
        <button class="cart noselect" onClick={handleChancla}><span>
            Add to Cart</span>
            <i class="fa fa-shopping-cart fa_custom fa-1x"></i></button>
    </div>)
}
export default ButtonAddToCart;

//easterEgg?