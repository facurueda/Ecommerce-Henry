import React, { useEffect } from 'react'
import './myAccount.css'
import { useDispatch, useSelector } from 'react-redux';
import { actionGetOrdersByUser } from '../../redux/ordersActions';
import Orders from '../adminOrdersTable/ordersComponent';
import AdminNavBar from '../AdminNavBar/AdminNavBar'

const MyAccount = () => {
    const orders = useSelector(store => store.ordersReducer.orders)
    const name = useSelector(store => store.usersReducer.name)
    const email = useSelector(store => store.usersReducer.email)
    const user = useSelector(store => store.usersReducer.idUser)
    const level = useSelector(store => store.usersReducer.level)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actionGetOrdersByUser(user))
    }, [])
    return (
        <div>
            <div className='userDataContainer'>
                <div className='dataContainer'>
                    <div className='nameeContainer'>
                        <span className='valueData'>{name}</span>
                    </div>

                    <div className='emaillContainer'>
                        <span className='valueData'>{email}</span>
                    </div>
                </div>
            </div>
            <div className='ComponentContainer'>
                {level === 'admin' ? (<div><AdminNavBar /></div>): (<div></div>)}
                <div id='orden' className='ordersContainer'>
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