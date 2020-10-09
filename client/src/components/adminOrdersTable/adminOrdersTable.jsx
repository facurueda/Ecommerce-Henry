import './adminOrdersTable.css'
<<<<<<< HEAD
import '../../components/Categories/CategoriesComponents/CategoryTable.css'
import React, { useEffect } from 'react'
import { Table } from "reactstrap";
=======
import React, { useEffect, useState } from 'react'
import Orders from './ordersComponent'
>>>>>>> master
import { useSelector, useDispatch } from 'react-redux'
import { actionGetAllOrders } from '../../redux/ordersActions'
import { actionGetUsers } from '../../redux/usersActions'

const AdminOrdersTable = () => {
    
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
<<<<<<< HEAD
            <Table className='ordersCont'>
                <thead>
                    <tr className='NameAndDesc'>
                        <th className='Name'>Id</th>
                        <th className='Desc'>Cliente</th>
                        <th className='Desc'>Dirección de entrega</th>
                        <th className='Desc'>Estado</th>
                        <th className='Desc'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders > 0 ? (
                        orders.map(order => (
                            <tr className='categories' key={order.idCategory}>
                                <th className='categoryInfo'>{order.idCategory}</th>
                                <th className='categoryInfo'>{getUserName(order)}</th>
                                <th className='categoryInfo'>{order.direccion}</th>
                                <th className='categoryInfo'>{order.status}</th>
                                <th className='categoryInfo'>{order.total}</th>
                            </tr>
                        ))
                    ) : (
                            <tr>
                                <td>No hay ordenes</td>
                            </tr>
                        )}
                </tbody>
            </Table>

=======
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
>>>>>>> master
        </div>
    )
}
export default AdminOrdersTable;
