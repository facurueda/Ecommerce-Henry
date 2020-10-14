import React, { useState } from "react";
import {
    ModalBody,
    FormGroup,
} from "reactstrap";
import './modalInfoOrder.css'

const ModalInfoOrder = (props) => {

    const { order, closeViewInfo } = props;

    console.log(order)

    return (

        <div className='modalInfoContainer'>
            <ModalBody className='modalBodyInfoOrder'>
                <FormGroup >
                    <button onClick={e => closeViewInfo()}>X</button>
                </FormGroup>
                <FormGroup className='numberOrderContainer'>
                    <div className='orderNumber'>ORDEN: {order.idOrder}</div>
                </FormGroup>
                {order.products.map(e => {
                    return (
                        <FormGroup className='infoOrderContainer'>
                            <p>{e.name}</p>
                            <img src={e.images} alt="Image Product" className='imageInfo' />
                            <p> {e.Inter_Prod_Order.price} </p>
                            <p> {e.Inter_Prod_Order.quantity} </p>
                        </FormGroup>
                    )
                })}
            </ModalBody>
        </div>

    )


}

export default ModalInfoOrder;