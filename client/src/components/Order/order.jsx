import React from 'react'
import TotalByProduct from './orderComponents/totalByProduct';
import { Button } from 'reactstrap';
import './order.css'
import { useEffect } from 'react';
import { actionGetOrder } from '../../redux/ordersActions';
import { connect } from 'react-redux'



// Detalles de la Orden (el carrito) de un usuario.
// Debe incluir los items que compró junto con el precio, y los totales.

// PEDIR QUE SE DEVUELVAN LOS PRODUCTOS COMPLETOS PARA PROPS.ORDER.PRODUCT
// const props = {
//     "idOrder": 1,
//     "idUser": 1,
//     "idProduct": 1,
//     "states": null,
//     "createdAt": "2020-09-02T20:50:31.728Z",
//     "updatedAt": "2020-09-02T20:50:31.728Z",
//     "products": [
//         {
//             "idProduct": 1,
//             "name": "Dragon",
//             "description": "Escupe Fuego",
//             "precio": 10,
//             "rating": 5,
//             "stock": 10,
//             "createdAt": "2020-09-02T20:50:14.149Z",
//             "updatedAt": "2020-09-02T20:50:14.149Z",
//             "Inter_Prod_Order": {
//                 "id": 1,
//                 "idOrder": 1,
//                 "idProduct": 1,
//                 "quantity": 3,
//                 "price": 2222,
//                 "createdAt": "2020-09-02T20:50:31.774Z",
//                 "updatedAt": "2020-09-02T20:50:31.774Z"
//             }
//         },
//         {
//             "idProduct": 2,
//             "name": "Perro",
//             "description": " NO Escupe Fuego",
//             "precio": 50,
//             "rating": 5,
//             "stock": 5,
//             "createdAt": "2020-09-02T20:50:14.149Z",
//             "updatedAt": "2020-09-02T20:50:14.149Z",
//             "Inter_Prod_Order": {
//                 "id": 2,
//                 "idOrder": 2,
//                 "idProduct": 2,
//                 "quantity": 15,
//                 "price": 5000,
//                 "createdAt": "2020-09-02T20:50:31.774Z",
//                 "updatedAt": "2020-09-02T20:50:31.774Z"
//             }
//         }
//     ]
// }

const Order = (props) => {

    useEffect(() => {
        props.actionGetOrder(props.idOrder)
    }, [])
    console.log(props)
    if (Object.keys(props.order).length < 1) {
        return (
            <div className='orderContainer'>
                <h3 style={{display: 'flex', justifyContent: 'center' }}><b>El carrito esta vacio</b></h3>
            </div>
        )
    } else {

        return (
            <div className="orderContainer">
                {props.order.products.map(product => {
                    return <TotalByProduct product={product} className="target" key={product.idProduct} />
                })}
                <br />
                <div className="footerContent">
                    <div className="footerOrder">
                        <span className="textPrice">Precio Total: ${props.order.products.reduce((acum, product) => {
                            return acum + product.Inter_Prod_Order.price
                        }, 0)}</span>
                    </div>
                    <div style={{display: props.origin }}><Button color="success" id="buttonEndOrden">Finalizar Orden</Button></div>
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