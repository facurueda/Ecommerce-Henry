import './adminOrdersTable.css'
import '../../components/Categories/CategoriesComponents/CategoryTable.css'
import React, { useEffect } from 'react'
import { Table } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { actionGetAllOrders } from '../../redux/ordersActions'
import { actionGetUsers } from '../../redux/usersActions'

const AdminOrdersTable = () => {
    
    const dispatch = useDispatch()
    const orders = useSelector(state => state.ordersReducer.orders)
    const users = useSelector(state => state.usersReducer.users)
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
                        orders.map(order => { if(order.status === 'CERRADA'){
                            return ( <tr className='categories' key={order.idCategory}>
                                <th className='categoryInfo'>{order.idOrder}</th>
                                <th className='categoryInfo'>{getUserName(order)}</th>
                                <th className='categoryInfo'>{order.direccion}</th>
                                <th className='categoryInfo'>{order.status}</th>
                                <th className='categoryInfo'>{order.total}</th>
                            </tr> ) 
                        } 
                       } )
                    ) : ( <tr>
                                <th>No hay ordenes</th>
                            </tr>
                        )}
                </tbody>
            </Table>

        </div>
    )
}
export default AdminOrdersTable;
