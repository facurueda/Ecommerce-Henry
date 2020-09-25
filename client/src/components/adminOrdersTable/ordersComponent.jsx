import React from 'react'
import './ordersComponent.css'
import { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { actionGetUserById } from '../../redux/usersActions'
import OrderByIdComponent from './orderByIdComponent'
import { useState } from 'react'

const Orders = (props) => {
    const dispatch = useDispatch()
    // RECIBO PROP.USER
    //     createdAt: "2020-09-07T21:03:29.137Z"
    // idOrder: 2
    // idUser: 3
    // status: "CREADA"
    // updatedAt: "2020-09-07T21:03:29.137Z"
    const user = useSelector(state => state.usersReducer.name)
    const [display, setDisplay] = useState('none');
    return (
        <div className='AdminOrdersTableComponentsContainer'>
            <h3><b>{user}</b></h3>
            <h5>Order: <b>{props.order.idOrder}</b></h5>
            <button onClick={() => {
                if (display === "none"){
                    setDisplay("flex");
                }else {
                    setDisplay('none');
                }
            }} className='buttonDetails'> Details</button>
            <div style={{display: display }}>
            <OrderByIdComponent order={props.order }/>
            </div>
        </div>
    )
}


export default Orders;