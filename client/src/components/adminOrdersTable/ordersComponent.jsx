import React, { useEffect } from 'react'
import './ordersComponent.css'
import { useDispatch, useSelector } from 'react-redux'
import OrderByIdComponent from './orderByIdComponent'
import { useState } from 'react'
import { actionGetUsers } from '../../redux/usersActions'

const Orders = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actionGetUsers())
    }, [])
    const user = useSelector(state => state.usersReducer.name)
    const AllUsers = useSelector(store => store.usersReducer.users)
    const [display, setDisplay] = useState('none');
    return (
        <div className='AdminOrdersTableComponentsContainer'>
            
            <h3><b>{props.userName}</b></h3>
            <h5>Order: <b>{props.order.idOrder}</b></h5>
            <div style={{ display: display }}>
                <OrderByIdComponent order={props.order} />
            </div>
        </div>
    )
}
export default Orders;