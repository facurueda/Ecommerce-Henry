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
    if (orders.length < 1){
        return <div style={{display: "flex", justifyContent: "center"}}> 
        <h3><b>No se encontraron ordenes disponibles.</b></h3></div>
    }
    return (
        <div className='AdminOrdersTableComponentsContainer'>
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