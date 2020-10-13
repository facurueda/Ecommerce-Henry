import React, { useEffect, useState } from 'react'
import './myAccount.css'
import { useDispatch, useSelector } from 'react-redux';
import { actionGetOrdersByUser } from '../../redux/ordersActions';

import { actionUpdateUser } from '../../redux/usersActions';
import { toast } from 'react-toastify';
import { Modal } from 'reactstrap';
import ModalEditData from './ModalEditData';
import SelectImage from '../selectImageAvatar/SelectImage'
import { actionGetMe, actionSetAvatar } from '../../redux/usersActions';
import MenuUser from './MenuUser';


const MyAccount = (props) => {
    toast.configure()
    useEffect(() => {
        dispatch(actionGetMe())
    }, [])

    const dispatch = useDispatch();
    const [usuario, setUsuario] = useState(props.user)

    const name = useSelector(state => state.usersReducer.name)
    const email = useSelector(state => state.usersReducer.email)
    const user = useSelector(state => state.usersReducer.idUser)
    const level = useSelector(state => state.usersReducer.level)

    const [inputs, setInputs] = useState({ name: name, email: email, idUser: user })
    const img = useSelector(store => store.usersReducer.img)



    const [modalEdit, modalInsertEdit] = useState(false);
    const modalEditView = () => modalInsertEdit(!modalEdit);
    const modalEditViewFalse = () => modalInsertEdit(false);

    const modalAvatarView = () => modalInsertAvatar(!modalAvatar);
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

    const handleChange = (e) => {
        const { type, value } = e.target;
        console.log("type: ", type);
        if (type === 'text') {
            setInputs({ ...inputs, idUser: user, name: value })
        } else {
            setInputs({ ...inputs, idUser: user, [type]: value })
        }
    }

    useEffect(() => {
        dispatch(actionGetOrdersByUser(user))
    }, [])
    const span = 'span'
    return (
        <div className='myAccountContainer'>
            <MenuUser/>
            <div className='userData'>
                <div className='userDataTitle'>
                    <h1 className='textUser'>Datos de usuario</h1>
                </div>
                <div className='userDataContainer'>
                    <div className='imagenUserLoggedContainer'>
                        <img className='imagenUserLogged' src={img} style={{ borderRadius: '50%' }}></img>

                        <Modal isOpen={modalAvatar} className='userModalContainer'>
                            <button className="closeButton" onClick={modalAvatarView}>
                                <i class="fas fa-times"></i>
                            </button>
                            <div className='modalUserImg'>
                                <SelectImage uploadImage={uploadImage} modalAvatarViewFalse={modalAvatarView} />
                            </div>
                        </Modal>
                    </div>
                    <div className='userBoxContainer'>
                        <div className='nameDataCont'>
                            <span><p className='valueDataName'>{name}</p></span>
                        </div>
                        <div className='nameDataCont'>
                            <span className='valueDataEmail'>{email}</span>
                        </div>
                    </div>
                </div>
                <div className='buttonUserContainer'>
                    <button
                        className="buttonAddImgUser"
                        onClick={() => modalAvatarView()}>Agregar imagen</button>
                    <button
                        data-toggle="modal"
                        data-target="#editModal"
                        onClick={() => modalEditView()}
                        className="buttonAddImgUser">
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
    )
}

export default MyAccount