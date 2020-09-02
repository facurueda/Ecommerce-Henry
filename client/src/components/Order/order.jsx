import React from 'react'
import TotalByProduct from './orderComponents/totalByProduct';
import { Button } from 'reactstrap';



// Detalles de la Orden (el carrito) de un usuario.
// Debe incluir los items que compró junto con el precio, y los totales.
const Order = (props) => {
    return (
        <div>
            {props.products.map(product => {
                <TotalByProduct product={product}/>

            })}
            <br/>
            <div>
        <p>Precio Total</p><p>{"Precio total final"}</p>
        <Button>Comprar</Button>
            </div>
        </div>
    )
}
export default Order;