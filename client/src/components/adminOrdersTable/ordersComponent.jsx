import React from 'react'
import { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { actionGetUserById } from '../../redux/usersActions'
import OrderByIdComponent from './orderByIdComponent'
import { useState } from 'react'

const Orders = (props) => {

    useEffect(() => {
        props.actionGetUserById(props.order.idUser)
    }, [])
    // RECIBO PROP.USER
    console.log(props)
    //     createdAt: "2020-09-07T21:03:29.137Z"
    // idOrder: 2
    // idUser: 3
    // status: "CREADA"
    // updatedAt: "2020-09-07T21:03:29.137Z"
    const user = useSelector(state => state.usersReducer.name)
    const level = useSelector(state => state.usersReducer.level)
    const [display, setDisplay] = useState('none');
    console.log(user, level)
    return (
        <div className='userDisplay' onClick={() => {
            if (display === "none"){
                setDisplay("flex");
            }else {
                setDisplay('none');
            }
        }}>
            <h3>Username: <b>{user}</b></h3>
            <h4>Level: <b>{level}</b></h4>
            <h5>Order: <b>{props.order.idOrder}</b></h5>
            <div style={{display: display }}>
            <OrderByIdComponent idOrder={props.order.idOrder }/>
            </div>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        actionGetUserById: (idUser) => {
            dispatch(actionGetUserById(idUser));
        }
    }
}

export default connect(() => { }, mapDispatchToProps)(Orders);