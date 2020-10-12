
import React, { useEffect, useState } from 'react'
import './myAccount.css'
import { useDispatch, useSelector } from 'react-redux';
import { actionGetOrdersByUser } from '../../redux/ordersActions';
import Orders from '../adminOrdersTable/ordersComponent';
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import iconuser from './iconuser.png'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalEditData from './ModalEditData';
// import Avatara from './avatar';
/* import Avatar from 'react-avatar'; */
/* import Avatar, { ConfigProvider } from 'react-avatar'; */
/*  import {Avatar} from 'antd' */

import SelectImage from '../selectImageAvatar/SelectImage'
import { actionGetMe, actionSetAvatar } from '../../redux/usersActions';





const MyAccount = (props) => {

    useEffect(() => {
        dispatch(actionGetMe())
      }, [])

    const dispatch = useDispatch();


    const [usuario, setUsuario] = useState(props.user)

    const orders = useSelector(store => store.ordersReducer.orders)
    const name = useSelector(store => store.usersReducer.name)
    const email = useSelector(store => store.usersReducer.email)
    const user = useSelector(state => state.usersReducer.idUser)
    const level = useSelector(store => store.usersReducer.level)
    const img = useSelector(store => store.usersReducer.img)

    /* const profile = useSelector(store => store.usersReducer.profile) */


    //modal


    const [modalEdit, modalInsertEdit] = useState(false);
    const modalEditView = () => modalInsertEdit(!modalEdit);
    const modalEditViewFalse = () => modalInsertEdit(false);

    const modalAvatarView = () => modalInsertAvatar(!modalAvatar);
    const modalAvatarViewFalse = () => modalInsertAvatar(false);
    const [modalAvatar, modalInsertAvatar] = useState(false);





    const updateData = (updatedData) => {
        props.actionDataUpdate(updatedData)
    }



    const [loading, setLoading] = useState(false)
    const [imagesUpload, setImagesUpload] = useState('')
    const uploadImage = async e => {
        const files = e
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'ecommerceHenry')
        setLoading(true)
        const res = await fetch('https://api.cloudinary.com/v1_1/facu9685/image/upload',
            {
                method: 'POST',
                body: data
            })
        const file = await res.json()
        dispatch(actionSetAvatar(file.secure_url))
        console.log('this file', file.secure_url)
        setImagesUpload(file.secure_url)
        setLoading(false)
    }


    return (
        <div className='conteiner-maximo'>
            <div className='conteiner-tittle'>
                <div className='conteiner-fluid'>
                    <h1 className='textoa'>Mi Cuenta</h1>
                    <h3 className='textob'>Datos Personales</h3>
                </div>
            </div>

            <div className='img'>
                <img className='img-user' src={img} style={{borderRadius:'50%'}}></img>


                <button
                    className="btn btn-dark"
                    onClick={() => modalAvatarView()}> Add Image</button>
                {/* OPEN TO UPLOAD IMAGE */}
                <Modal isOpen={modalAvatar}>
                    <SelectImage uploadImage={uploadImage} modalAvatarViewFalse={modalAvatarViewFalse}/>

                </Modal>


            </div>
            <div className='cajauser'>
                <div className='nameContainer'>
                    <span className='valueData'><h2>{name}</h2></span>
                </div>
                <div className='emaillContainer'>
                    <span className='valueData'>{email}</span>
                </div>
                <div className='edit'>
                    <button   /* className='editButton' */
                        data-toggle="modal"
                        data-target="#editModal"
                        onClick={() => modalEditView()}  // que prop va ahi?
                        className="btn btn-dark" >
                        Editar mis datos </button>
                    <Modal isOpen={modalEdit}>
                        <ModalEditData
                            modalEditViewFalse={modalEditViewFalse}
                            user={user}
                            updateData={updateData}
                        />
                    </Modal>
                </div>
                <div className='ComponentContainer'>
                    {level === 'admin' ? (<div><AdminNavBar /></div>) : (<div></div>)}
                    <div id='orden' className='ordersContainer'>
                        <div>
                            {orders.map(order => {
                                return <Orders key={order.idOrder} order={order} />
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default MyAccount;