import React from 'react'
import TotalByProduct from './orderComponents/totalByProduct';
import { Button } from 'reactstrap';
import { useState } from 'react';
import { connect } from 'react-redux';



// Detalles de la Orden (el carrito) de un usuario.
// Debe incluir los items que compró junto con el precio, y los totales.

//PEDIR QUE SE DEVUELVAN LOS PRODUCTOS COMPLETOS PARA PROPS.ORDER.PRODUCT
// {
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
//         }
//     ]
// }

const Order = (props) => {

    return (
        <div>
            {props.order.products.map(product => {
                return <TotalByProduct product={product}/>
            })}
            <br/>
            <div>
                <span>Precio Total: $</span><span>{props.order.products.reduce((acum, product) => {
                    return acum + product.Inter_Prod_Order.price
                }, 0)}</span>
                <div><Button>Finalizar Orden</Button></div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      order: state.orderReducer.order,
      user: state.userReducer.user
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      actionGetOrder: (idOrder) => {
        dispatch(actionGetOrder(idOrder))
      }
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Order);