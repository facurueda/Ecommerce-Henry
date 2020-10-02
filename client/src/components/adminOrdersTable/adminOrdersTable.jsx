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
    const getUserName = () => {
        if (users) {
            const hola = users.filter(e => {
                console.log(e)
                if (e.idUser === props.order.idUser) {
                    return e.name
                }

            })
            console.log(Object.keys(hola[0]))
        }
    }
    getUserName()
    if (orders.length < 1) {
        return <div style={{ display: "flex", justifyContent: "center" }}>
            <h3><b>No se encontraron ordenes disponibles.</b></h3>
        </div>
    }
    return (
        <div >
            {orders.map(order => {
                return (<div className='divContainerOrders'>
                    <Orders key={order.idOrder} userName={"hola"} order={order} /></div>)
            })}
        </div>
    )
}
export default AdminOrdersTable;
