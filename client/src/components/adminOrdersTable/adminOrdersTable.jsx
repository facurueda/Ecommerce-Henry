import './adminOrdersTable.css'
import React, { useEffect } from 'react'
import Order from './orderComponent'
import { useSelector, connect } from 'react-redux'
import { actionGetAllOrders } from '../../redux/ordersActions'



const AdminOrdersTable = (props) => {

    useEffect(() => {
        props.actionGetAllOrders();
    }, [])

    const orders = useSelector(state => state.ordersReducer.orders)
    const level = useSelector(state => state.userReducer.level)
    return (
        <div>
            {orders.map(order => {
                return <Order key={order.idOrder} order={order} />
            })}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionGetAllOrders: () => {
            dispatch(actionGetAllOrders())
        }
    }
}
export default connect(() => { }, mapDispatchToProps)(AdminOrdersTable);