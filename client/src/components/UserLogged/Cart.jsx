import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionAddToCart, actionEmptyCart, actionGetOrder, actionUpdateOrder } from '../../redux/ordersActions'
import './Cart.css'

const Cart = () => {

    const dispatch = useDispatch()
    const quantity = useSelector(state => state.ordersReducer.quantity)
    const order = useSelector(state => state.ordersReducer.order)
    const products = order.products;
    const user = useSelector(state => state.usersReducer.idUser)

    const emptyCart = () => {
        dispatch(actionEmptyCart(user))
        dispatch(actionGetOrder(user))
    }
    const checkOut = () => {
        window.location.href = '/order'
    }
    const btnRestar = (product) => {
        dispatch(actionAddToCart({ idUser: user, idProduct: product.idProduct, quantity: -product.Inter_Prod_Order.quantity, price: product.price }))
        dispatch(actionGetOrder(user))
    }

    return (

        <div class="Cart">
            <div class="dropdown-wrapper">
                <a href='/order'>
                    <i class="fa fa-shopping-cart fa_custom fa-1x"></i>
                </a>
                <div class="cart-dropdown">
                    {products ? (
                        <div className='productsCartContainer'>
                            <div className='productsHoverCont'>
                                {products.map(product => {
                                    return (
                                        <div className='cartHoverProd'>
                                            <div className='imgContCart'>
                                                <td className='imgProdHover'><img className='prodImgHover' src={product.images} /></td>
                                                <div className='textHoverCont'>
                                                    <td className='textCartHover'>{product.name}</td>
                                                    <div className='totalHoverCont'>
                                                        <td><p className='totalCartHover'>{product.Inter_Prod_Order.quantity} x </p></td>
                                                        <td className='totalCartHover'>$ {product.precio}</td>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='buttonHoverCont'>
                                                <button className='closeButtonOrder'
                                                    onClick={e => btnRestar(product,product.Inter_Prod_Order.quantity)}>
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </div>
                                        </div>)
                                })}
                            </div>
                            <div className='subtotalCont'>
                                <p className='textCartHover'>SUBTOTAL:</p>
                                {order.products ? (
                                    <p className='textCartHover'>$ {order.products
                                        .reduce((acum, product) => {
                                            return (
                                                acum +
                                                product.Inter_Prod_Order.price *
                                                product.Inter_Prod_Order.quantity
                                            );
                                        }, 0)} </p>
                                ) : (
                                        <p className='textCartHover'>$ 0</p>
                                    )}

                            </div>

                            <button className='buttonVaciar' onClick={e => emptyCart()}>VACIAR CARRITO</button>
                            <button className='buttonVaciar' onClick={e => checkOut()}>CHECKOUT</button>

                        </div>

                    ) : (
                            <div className='cartHoverProd' >
                                <td className='textContent'>Carrito Vacio</td>
                            </div>


                        )}

                </div>
            </div>
            {quantity ? (<div className='quantityProducts'>
                {quantity}
            </div>) : (<div></div>)}
        </div>
    )
}

export default Cart