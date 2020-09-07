import React from 'react'
import { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { actionGetUserById } from '../../redux/usersActions'

const Order = (props) => {

    useEffect(() => {
        props.actionGetUserById()
    }, [])
    // RECIBO PROP.USER
    console.log(props)
    //     createdAt: "2020-09-07T21:03:29.137Z"
    // idOrder: 2
    // idUser: 3
    // status: "CREADA"
    // updatedAt: "2020-09-07T21:03:29.137Z"
    const orders = useSelector(state => state.usersReducer.user)
    return (<div>1</div>)
}
const mapDispatchToProps = (dispatch) => {
    return {
        actionGetUserById: (idUser) => {
            dispatch(actionGetUserById(idUser));
        }
    }
}

export default connect(() => { }, mapDispatchToProps)(Order);