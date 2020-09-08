import './adminOrdersTable.css'
import React, { useEffect } from 'react'
import Orders from './ordersComponent'
import { useSelector, connect } from 'react-redux'
import { actionGetAllOrders } from '../../redux/ordersActions'



const AdminOrdersTable = (props) => {

    useEffect(() => {
        props.actionGetAllOrders();
    }, [])

    const orders = useSelector(state => state.ordersReducer.orders)
    // const level = useSelector(state => state.usersReducer.level)
    return (
        <div>
            {orders.map(order => {
                return <Orders key={order.idOrder} order={order} />
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