import React, { useEffect } from 'react'
import './myAccount.css'
import { useDispatch, useSelector } from 'react-redux';
import { actionGetAllOrders, actionGetOrdersByUser } from '../../redux/ordersActions';
import Orders from '../adminOrdersTable/ordersComponent';

const MyAccount = () => {
    const orders = useSelector(store => store.ordersReducer.orders)
    const name = useSelector(store => store.usersReducer.name)
    const email = useSelector(store => store.usersReducer.email)
    const user = useSelector(store => store.usersReducer.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actionGetOrdersByUser(user))
    }, [])
    console.log('ororororor', orders)
    return (
        <div>
            <div className='userDataContainer'>
                <div> Nombre: {name}</div>
                <div> Email: {email}</div>
            </div>
            <div className='ComponentContainer'>
                <div className='ordersContainer'>
                    <div>
                        {orders.map(order => {
                            return <Orders key={order.idOrder} order={order} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyAccount;