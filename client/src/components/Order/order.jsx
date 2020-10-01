import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import TotalByProduct from './orderComponents/totalByProduct';
import './order.css';
import { useSelector } from 'react-redux'
const axios = require('axios');
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");



const Order = (props) => {


    const handleClick = async (event) => {
        const stripe = await stripePromise;
        const response = await fetch("http://localhost:3000/order/create-session", {
            credentials: 'include',
            method: 'post',
            headers: {'Content-Type': 'application/json'}
        });
        const session = await response.json();
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        })
    }



    const propsOrder = props.order
    const storeOrder = useSelector(state => state.ordersReducer.order)

    const order = () => {
        if (props.order) {
            return propsOrder
        }else{
            return storeOrder
        }
    }
    const or = order()
    
    if (Object.keys(or).length < 1) {
        return (
            <div className='orderContainer'>
                <h3 className='orderVacia'>
                    <b>El carrito esta vacio</b>
                </h3>
            </div>
        )
    } else {
        return (
            <div className="orderContainer">
                {or.products.map(product => {
                    return <TotalByProduct
                        product={product}
                        className="target"
                        key={product.idProduct} />
                })}
                <br />
                <div className="footerContent">
                    <div className="footerOrder">
                        <span className="textPrice"> Total: ${
                            or.products.reduce((acum, product) => {
                                return acum + (product.Inter_Prod_Order.price * product.Inter_Prod_Order.quantity)
                            }, 0).toFixed(2)}
                        </span>
                        <div style={{ display: props.origin }}><button className="buttonEndOrden" onClick={handleClick}>Finalizar Orden</button></div>
                    </div>

                </div>
            </div>
        )
    }
}
export default Order;