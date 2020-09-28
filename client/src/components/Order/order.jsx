import React from 'react'
import TotalByProduct from './orderComponents/totalByProduct';
import './order.css'
import { useSelector } from 'react-redux'

const Order = (props) => {
    const propsOrder = props.order
    const storeOrder = useSelector(state => state.ordersReducer.order)

    const order = () => {
        if (props.order) {
            return propsOrder
        }else{
            return storeOrder
        }
    }
    const or = order()
    
    if (Object.keys(or).length < 1) {
        return (
            <div className='orderContainer'>
                <h3 className='orderVacia'>
                    <b>El carrito esta vacio</b>
                </h3>
            </div>
        )
    } else {
        return (
            <div className="orderContainer">
                {or.products.map(product => {
                    return <TotalByProduct
                        product={product}
                        className="target"
                        key={product.idProduct} />
                })}
                <br />
                <div className="footerContent">
                    <div className="footerOrder">
                        <span className="textPrice"> Total: ${
                            or.products.reduce((acum, product) => {
                                return acum + (product.Inter_Prod_Order.price * product.Inter_Prod_Order.quantity)
                            }, 0).toFixed(2)}
                        </span>
                        <div style={{ display: props.origin }}><button className="buttonEndOrden">Finalizar Orden</button></div>
                    </div>

                </div>
            </div>
        )
    }
}
export default Order;