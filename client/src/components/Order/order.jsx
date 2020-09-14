import React from 'react'
import TotalByProduct from './orderComponents/totalByProduct';
import { Button } from 'reactstrap';
import './order.css'
import { useEffect } from 'react';
import { actionGetOrder } from '../../redux/ordersActions';
import { connect, useDispatch, useSelector } from 'react-redux'

const Order = (props) => {

    const user = useSelector(state => state.usersReducer.idUser);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionGetOrder(user));
    }, [])
    const order = useSelector(state => state.ordersReducer.order)

    if (Object.keys(props.order).length < 1) {
        return (
            <div className='orderContainer'>
                <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                    <b>El carrito esta vacio</b>
                </h3>
            </div>
        )
    } else {

        return (
            <div className="orderContainer">
                {order.products.map(product => {
                    return <TotalByProduct
                        product={product}
                        className="target"
                        key={product.idProduct} />
                })}
                <br />
                <div className="footerContent">
                    <div className="footerOrder">
                        <span className="textPrice"> Total: ${
                            order.products.reduce((acum, product) => {
                                return acum +
                                    (product.Inter_Prod_Order.price * product.Inter_Prod_Order.quantity)
                            }, 0)}
                        </span>
                    </div>
                    <div style={{ display: props.origin }}><button className="buttonEndOrden">Finalizar Orden</button></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.ordersReducer.order,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actionGetOrder: (idOrder) => {
            dispatch(actionGetOrder(idOrder))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Order);