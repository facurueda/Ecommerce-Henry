import './adminOrdersTable.css'
import React, { useEffect, useState } from 'react'
import Orders from './ordersComponent'
import { useSelector, useDispatch } from 'react-redux'
import { actionGetAllOrders } from '../../redux/ordersActions'
import { actionGetUsers } from '../../redux/usersActions'

const AdminOrdersTable = (props) => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.ordersReducer.orders)
    const users = useSelector(state => state.usersReducer.users)
    const [pageLimits, setPageLimits] = useState({ min: 0, max: 4 });
    useEffect(() => {
        dispatch(actionGetAllOrders());
        dispatch(actionGetUsers())
    }, [])
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
            {orders.map((order, index) => {
                if (index <= pageLimits.max && index >= pageLimits.min) {
                    return (<div className='divContainerOrders'>
                        <Orders key={order.idOrder} userName={getUserName(order)} order={order} /></div>)
                }
            })}
            <div className='PagePrevNext'>
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
            </div>
        </div>
    )
}
export default AdminOrdersTable;
