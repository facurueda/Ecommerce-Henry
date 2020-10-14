import './adminOrdersTable.css'
import '../../components/Categories/CategoriesComponents/CategoryTable.css'
import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, Table } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { actionGetAllOrders, actionCancelarOrden } from '../../redux/ordersActions'
import { actionGetUsers } from '../../redux/usersActions'
import MenuUser from '../MyAccount/MenuUser';
import Products from '../product/products';
import ModalInfoOrder from './modalInfoOrder.jsx';


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

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [filterOrder, setFilterOrder] = useState(null)

    const cancelarOrden = (idOrder) => {
        dispatch(actionCancelarOrden(idOrder))
        window.location.reload()
    }

    const [modalAdd, setModalAdd] = useState(false);

    const clickViewInfo = () => setModalAdd(!modalAdd);
    const closeViewInfo = () => { setModalAdd(false); }

    const [stateOrderView, setStateOrderView] = useState()

    return (
        <div className='myAccountContainer' >
            <MenuUser />
            <div className="contentContainer">
                <label className='productDetail'>Seleccionar un status de order: </label>
                <Dropdown className='dropdownCat' isOpen={dropdownOpen} toggle={toggle}>

                    <DropdownToggle className='dropdownCat' caret>
                        Todas las ordenes
                </DropdownToggle>
                    <DropdownMenu className='dropdownCat' >
                        <DropdownItem name='direcciones' value={'Todas las ordenes'} onClick={e => setFilterOrder(null)}>Todas las ordenes</DropdownItem>
                        <DropdownItem name='direcciones' value={'Todas las ordenes'} onClick={e => setFilterOrder('CON ENVIO')}>Con envío</DropdownItem>
                        <DropdownItem name='direcciones' value={'Todas las ordenes'} onClick={e => setFilterOrder('CON RETIRO')}>Retiro en local</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <div className='ordersAccountCont'>
                    <Table className='ordersCont'>

                        <thead>
                            <tr className='NameAndDesc'>
                                <th className='Name'>Id</th>
                                <th className='Desc'>Cliente</th>
                                <th className='Desc'>Estado</th>
                                <th className='Desc'>Total</th>
                                <th className='Desc'>Ver Info</th>
                                <th className='Desc'>Cancelar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(orders.length > 0) ? (
                                filterOrder ? (
                                    orders.filter(order => order.status === filterOrder)
                                        .map(
                                            order => {
                                                return (
                                                    <tr className='categories' key={order.idCategory}>
                                                        <td className='categoryInfo'>{order.idOrder}</td>
                                                        <td className='categoryInfo'>{getUserName(order)}</td>
                                                        <td className='categoryInfo'>{order.status}</td>
                                                        <td className='categoryInfo'> $
                                                        {order.products.reduce((acum, product) => {
                                                            return (
                                                                acum +
                                                                product.Inter_Prod_Order.price *
                                                                product.Inter_Prod_Order.quantity
                                                            );
                                                        }, 0)}
                                                        </td>
                                                        <td className='categoryInfo'><button onClick={e => { clickViewInfo(); setStateOrderView(order) }}>Ver Info</button>
                                                            <Modal isOpen={modalAdd}>
                                                                <ModalInfoOrder
                                                                    order={stateOrderView}
                                                                    closeViewInfo={closeViewInfo}
                                                                />
                                                            </Modal>
                                                        </td>
                                                        <td className='categoryInfo'><button onClick={e => cancelarOrden(order.idOrder)}>Cancelar Orden</button></td>
                                                    </tr>
                                                )

                                            })



                                ) : (
                                        orders.filter(order => order.status !== 'CARRITO')
                                            .filter(ord => ord.status !== 'CREADA')
                                            .map(order => {
                                                return (
                                                    <tr className='categories' key={order.idCategory}>
                                                        <td className='categoryInfo'>{order.idOrder}</td>
                                                        <td className='categoryInfo'>{getUserName(order)}</td>
                                                        <td className='categoryInfo'>{order.status}</td>
                                                        <td className='categoryInfo'> $
                                                        {order.products.reduce((acum, product) => {
                                                            return (
                                                                acum +
                                                                product.Inter_Prod_Order.price *
                                                                product.Inter_Prod_Order.quantity
                                                            );
                                                        }, 0)}
                                                        </td>
                                                        <td className='categoryInfo'><button onClick={e => { clickViewInfo(); setStateOrderView(order) }}>Ver Info</button>
                                                            <Modal isOpen={modalAdd}>
                                                                <ModalInfoOrder
                                                                    order={stateOrderView}
                                                                    closeViewInfo={closeViewInfo}
                                                                />
                                                            </Modal>
                                                        </td>
                                                        <td className='categoryInfo'><button onClick={e => cancelarOrden(order.idOrder)}>Cancelar Orden</button></td>

                                                    </tr>)

                                            })



                                    )
                            ) : (<tr>
                                <td>No hay ordenes</td>
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
        </div>
    )
}
export default AdminOrdersTable;
