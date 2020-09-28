import './adminOrdersTable.css'
import React, { useEffect } from 'react'
import Orders from './ordersComponent'
import { useSelector, useDispatch } from 'react-redux'
import { actionGetAllOrders } from '../../redux/ordersActions'

const AdminOrdersTable = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actionGetAllOrders());
    }, [])
    const orders = useSelector(state => state.ordersReducer.orders)
    if (orders.length < 1) {
        return  <div style={{ display: "flex", justifyContent: "center" }}>
                    <h3><b>No se encontraron ordenes disponibles.</b></h3>
                </div>
    }
    return (
        <div >
            {orders.map(order => {
                return (<div className='divContainerOrders'>
                        <Orders key={order.idOrder} order={order} /></div>)
            })}
        </div>
    )
}
export default AdminOrdersTable;
