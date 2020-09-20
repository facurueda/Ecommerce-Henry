import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetOrder } from '../../redux/ordersActions'
import { actionLogOut } from '../../redux/usersActions'
import CartImg from '../NavBar/Images/Cart.png'
import './Cart.css'

const Cart = () => {
    const user = useSelector(state => state.usersReducer.idUser)
    const quantity = useSelector(store => store.ordersReducer.quantity)
    const dispatch = useDispatch()
    useEffect(async () => {
        dispatch(actionGetOrder(user));
    }, [])


    return (
        <div className='Cart'>
            <a href='/order'>
                <i class="fa fa-shopping-cart fa_custom fa-1x"></i>
            </a>
            <div className='quantityProducts'>
                {quantity}
            </div>
        </div>
    )
}

export default Cart