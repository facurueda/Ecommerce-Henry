import React, { useEffect, useState } from 'react'
import '../../components/Categories/CategoriesComponents/CategoryTable.css'
import { Table } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { actionGetOrder, actionGetOrdersByUser } from '../../redux/ordersActions'
import { actionGetUsers } from '../../redux/usersActions'
import MenuUser from './MenuUser';


const UserOrders = () => {

    const dispatch = useDispatch()
    const orders = useSelector(state => state.ordersReducer.orders)
    const direccion = useSelector(state => state.ordersReducer.direccion)
    const user = useSelector(state => state.usersReducer.idUser)
    const [pageLimits, setPageLimits] = useState({ min: 0, max: 4 });
    useEffect(() => {
        dispatch(actionGetOrdersByUser(user));
        // dispatch(actionGetOrder())
    }, [])

    return (
        <div className='myAccountContainer' >
            <MenuUser />
            <div>
                <Table className='ordersCont'>
                    <thead>
                        <tr className='NameAndDesc'>
                            <th className='Name'>Id</th>
                            <th className='Desc'>Estado</th>
                            <th className='Desc'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(orders.length > 0) ? (
                            orders.map(order => {
                                return (
                                    <tr className='categories' key={order.idCategory}>
                                        <th className='categoryInfo'>{order.idOrder}</th>
                                        <th className='categoryInfo'>{order.status}</th>
                                        <th className='categoryInfo'>{order.total}</th>
                                    </tr>)
                            })
                        ) : (<tr>
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
        </div>
    )
}
export default UserOrders;
