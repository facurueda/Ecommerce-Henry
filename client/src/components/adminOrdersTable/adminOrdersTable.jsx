import './adminOrdersTable.css'
import React, { useEffect } from 'react'
import Orders from './ordersComponent'
import { useSelector, useDispatch } from 'react-redux'
import { actionGetAllOrders } from '../../redux/ordersActions'
import { actionGetUsers } from '../../redux/usersActions'

const AdminOrdersTable = (props) => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.ordersReducer.orders)
    const users = useSelector(state => state.usersReducer.users)
    useEffect(() => {
        dispatch(actionGetAllOrders());
        dispatch(actionGetUsers())
    }, [])
    console.log(users);
    const getUserName = (order) => {
        if (users.length >= 1) {
            const hola = users.filter(e => {
                if (e.idUser == order.idUser) {
                    return e.name
                }

            })
            //return hola[0]
            console.log(hola[0].name)
            return hola[0].name
        }
    }
    if (orders.length < 1) {
        return <div className='NoOrders'>
            <h3><b>No se encontraron ordenes disponibles.</b></h3>
        </div>
    }
    return (
        <div >
            {orders.map(order => {
                return (<div className='divContainerOrders'>
                    <Orders key={order.idOrder} userName={getUserName(order)} order={order} /></div>)
            })}
        </div>
    )
}
export default AdminOrdersTable;
