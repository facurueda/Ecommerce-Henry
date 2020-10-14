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
         <button className="closeButtonOrder" onClick={e => closeViewInfo()}>
                        <i class="fas fa-times"></i>
                    </button>
            <ModalBody className='modalBodyInfoOrder'>
                <FormGroup className='numberOrderContainer'>
                    <div className='orderNumber'>ORDEN {order.idOrder}</div>
                </FormGroup>
                <div className='ordersImgInfo'>
                {order.products.map(e => {
                    return (
                        <FormGroup className='infoOrderContainer'>
                            
                            <img src={e.images} alt="Image Product" className='imageInfo' />
                            <p className='imageTxtOrder'>{e.name}</p>
                            <div className='imgtxtCont'>
                            <p className='imageTxtOrderPrice'>{e.Inter_Prod_Order.quantity} u</p>
                            <p className='imageTxtOrderPrice'>$ {e.Inter_Prod_Order.price} </p>
                            </div>
                        </FormGroup>
                    )
                })}
                </div>
            </ModalBody>
        </div>

    )


}

export default ModalInfoOrder;