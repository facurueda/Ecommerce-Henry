import React from 'react'
import './ordersComponent.css'
import { useSelector } from 'react-redux'
import OrderByIdComponent from './orderByIdComponent'
import { useState } from 'react'

const Orders = (props) => {
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
            }} /* className='buttonDetails'  */ type="button" className="btn btn-dark" > Details</button>
            <div style={{display: display }}>
            <OrderByIdComponent order={props.order }/>
            </div>
        </div>
    )
}
export default Orders;