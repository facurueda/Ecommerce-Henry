import Axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Order from '../Order/order'

const OrderByIdComponent = (props) => {
    return (
        <div>
            <Order origin='none' order={props.order}/>
        </div>
    )
}
export default OrderByIdComponent;