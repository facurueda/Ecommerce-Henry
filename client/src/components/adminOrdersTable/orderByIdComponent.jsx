import React from 'react'
import Order from '../Order/order'

const OrderByIdComponent = (props) => {
    return (
        <div>
            <Order origin='none' idOrder={props.idOrder}/>
        </div>
    )
}
export default OrderByIdComponent;