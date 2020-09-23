import React from 'react'
import {  useSelector } from 'react-redux'
import './Cart.css'

const Cart = () => {
    const quantity = useSelector(store => store.ordersReducer.quantity)

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