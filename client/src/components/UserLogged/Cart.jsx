import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetOrder, actionSetQuantity } from '../../redux/ordersActions'
import './Cart.css'

const Cart = () => {
    const user = useSelector(state => state.usersReducer.idUser)
    const quantity = useSelector(store => store.ordersReducer.quantity)
    const orders = useSelector(state => state.ordersReducer.order);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actionGetOrder(user));
    }, [])
    const quant = () => {
        if (quantity === Infinity) {
            setQuantity()
            console.log('pong')
            return 0
        } else {
            return quantity
         }
    }
    const setQuantity = () => {
        console.log('ping')
        const reducedValue = orders.products.reduce((acum, product) => {
            return acum + product.Inter_Prod_Order.quantity
        }, 0)
        console.log('reducedValue',reducedValue)
        dispatch(actionSetQuantity(reducedValue))
    }

    return (
        <div className='Cart'>
            <a href='/order'>
                <i class="fa fa-shopping-cart fa_custom fa-1x"></i>
            </a>
            <div className='quantityProducts'>
                {orders ? "" : ""}
            </div>
        </div>
    )
}

export default Cart