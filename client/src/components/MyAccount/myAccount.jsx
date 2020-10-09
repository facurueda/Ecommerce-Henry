import React, { useEffect, useState } from 'react'
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
    const [pageLimits, setPageLimits] = useState({ min: 0, max: 4 });
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
                {level === 'admin' ? (<div><AdminNavBar /></div>) : (<div></div>)}
                <div id='orden' className='ordersContainer'>
                    <div>
                        {orders.map(order => {
                            if (order.status = 'CERRADA') {
                                return <Orders userName={name} key={order.idOrder} order={order} />
                            }
                        })}
                    </div>
                </div>
                {orders ? (<div className='PagePrevNext'>
                    <button className='categoryButton' onClick={() => {
                        if (pageLimits.min > 1) {
                            setPageLimits({ min: pageLimits.min - 5, max: pageLimits.max - 5 })
                        }
                    }}> {'<'} </button>
                    <button className='categoryButton' onClick={() => {
                        if (pageLimits.max < orders.length) {
                            setPageLimits({ min: pageLimits.min + 5, max: pageLimits.max + 5 })
                        }
                    }}> {'>'} </button>
                </div>) : (<div></div>)}
            </div>
        </div>
    )
}
export default MyAccount;