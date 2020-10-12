import './adminOrdersTable.css'
import '../../components/Categories/CategoriesComponents/CategoryTable.css'
import React, { useEffect, useState } from 'react'
import { Table } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { actionGetAllOrders } from '../../redux/ordersActions'
import { actionGetUsers } from '../../redux/usersActions'


const AdminOrdersTable = () => {
    
    const dispatch = useDispatch()
    const orders = useSelector(state => state.ordersReducer.orders)
    const direccion = useSelector(state => state.ordersReducer.direccion)
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
            return hola[0].name
        }
    }


    return (
        <div >
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
                    {(orders.length > 0) ? (
                        orders.filter(order => order.status === 'CERRADA').map(order => {
                            return ( <tr className='categories' key={order.idCategory}>
                                <th className='categoryInfo'>{order.idOrder}</th>
                                <th className='categoryInfo'>{getUserName(order)}</th>
                                <th className='categoryInfo'>{direccion}</th>
                                <th className='categoryInfo'>{order.status}</th>
                                <th className='categoryInfo'>{order.total}</th>
                            </tr> ) 
                        
                       } )
                    ) : ( <tr>
                                <th>No hay ordenes</th>
                            </tr>
                        )}
                </tbody>
            </Table>
            {orders ? (<div className='PagePrevNext'>
                    <button className='buttonEndOrden' onClick={() => {
                        if (pageLimits.min > 1) {
                            setPageLimits({ min: pageLimits.min - 5, max: pageLimits.max - 5 })
                        }
                    }}> {'<'} </button>
                    <button className='buttonEndOrden' onClick={() => {
                        if (pageLimits.max < orders.length) {
                            setPageLimits({ min: pageLimits.min + 5, max: pageLimits.max + 5 })
                        }
                    }}> {'>'} </button>
                </div>) : (<div></div>)}
        </div>
    )
}
export default AdminOrdersTable;
