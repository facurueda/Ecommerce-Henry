import React, { useEffect, useState } from 'react'
import './myAccount.css'
import { useDispatch, useSelector } from 'react-redux';
import { actionGetOrdersByUser } from '../../redux/ordersActions';
import Orders from '../adminOrdersTable/ordersComponent';
import AdminNavBar from '../AdminNavBar/AdminNavBar'

import { actionUpdateUser } from '../../redux/usersActions';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalEditData from './ModalEditData';
import SelectImage from '../selectImageAvatar/SelectImage'
import { actionGetMe, actionSetAvatar } from '../../redux/usersActions';


const MyAccount = (props) => {
    toast.configure()
    useEffect(() => {
        dispatch(actionGetMe())
        dispatch(actionGetOrdersByUser(user))
    }, [])

    const dispatch = useDispatch();
    const [usuario, setUsuario] = useState(props.user)

    const name = useSelector(state => state.usersReducer.name)
    const email = useSelector(state => state.usersReducer.email)
    const user = useSelector(state => state.usersReducer.idUser)
    const level = useSelector(state => state.usersReducer.level)
    const img = useSelector(store => store.usersReducer.img)
    

    const [inputs, setInputs] = useState({ name: name, email: email, idUser: user })



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

    const uploadImage = async e => {
        setLoading(true)
        const files = e
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'ecommerceHenry')
        const res = await fetch('https://api.cloudinary.com/v1_1/facu9685/image/upload',
            {
                method: 'POST',
                body: data
            })
        const file = await res.json()
        dispatch(actionSetAvatar(file.secure_url))
        setLoading(false)
        window.location.reload()
    }

    const handleChange = (e) => {
        const { type, value } = e.target;
        console.log("type: ", type);
        if (type === 'text') {
            setInputs({ ...inputs, idUser: user, name: value })
        } else {
            setInputs({ ...inputs, idUser: user, [type]: value })
        }
    }


    const span = 'span'
    return (
        <div className='userAccountContainer'>
            <div class="btn-group-vertical">
                {level === 'user' ? (
                    <div>
                        <button type="button" class="btn btn-secondary" className='buttonMenuUser'>Editar perfil</button>
                        <button type="button" class="btn btn-secondary" className='buttonMenuUser'>Mis Ordenes</button>
                    </div>

                ) : (
                        <div>
                            <button type="button" class="btn btn-secondary" className='buttonMenuUser'>Usuarios</button>
                            <button type="button" class="btn btn-secondary" className='buttonMenuUser'>Ordenes</button>
                            <button type="button" class="btn btn-secondary" className='buttonMenuUser'>Editar productos</button>
                            <button type="button" class="btn btn-secondary" className='buttonMenuUser'>Editar categorias</button>
                            <button type="button" class="btn btn-secondary" className='buttonMenuUser'>Editar perfil</button>
                        </div>

                    )}

            </div>
            <div className='conteiner-maximo'>
                <div className='conteiner-tittle'>
                    <div className='conteiner-fluid'>
                        <h1 className='textoa'>Mi Cuenta</h1>
                        <h3 className='textob'>Datos Personales</h3>
                    </div>
                </div>

                <div className='img'>
                    <img className='img-user' src={img} style={{ borderRadius: '50%' }}></img>


                    <button
                        className="btn btn-dark"
                        onClick={() => modalAvatarView()}> Add Image</button>

                    <Modal isOpen={modalAvatar}>
                        <SelectImage uploadImage={uploadImage} modalAvatarViewFalse={modalAvatarViewFalse} />

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
                        <button
                            data-toggle="modal"
                            data-target="#editModal"
                            onClick={() => modalEditView()}
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
                </div>
            </div>
        </div>
    )
}

export default MyAccount