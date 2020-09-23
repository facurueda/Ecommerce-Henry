import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { actionAddToCart, actionGetOrder, actionSetQuantity } from '../redux/ordersActions'
import './ButtonAddToCart.css'
import { useCookies } from 'react-cookie';

const ButtonAddToCart = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.usersReducer.idUser)
    const orders = useSelector(state => state.ordersReducer.order);


    const handleChancla = () => {
            dispatch(actionAddToCart({ idUser: user, idProduct: props.datos.idProduct, quantity: 1, price: props.datos.price }))
            console.log('ping')
    }
    return (<div>
        <button class="cart noselect" onClick={handleChancla}><span>
            Add to Cart</span>
            <i class="fa fa-shopping-cart fa_custom fa-1x"></i></button>
    </div>)
}
export default ButtonAddToCart;

//easterEgg?