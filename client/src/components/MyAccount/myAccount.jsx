import React, { useEffect, useState } from 'react'
import './myAccount.css'
import { useDispatch, useSelector } from 'react-redux';
import { actionGetOrdersByUser } from '../../redux/ordersActions';
import Orders from '../adminOrdersTable/ordersComponent';
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import { actionUpdateUser } from '../../redux/usersActions';
import { toast } from 'react-toastify';

const MyAccount = () => {
    toast.configure()
    const orders = useSelector(store => store.ordersReducer.orders)
    const name = useSelector(store => store.usersReducer.name)
    const email = useSelector(store => store.usersReducer.email)
    const user = useSelector(store => store.usersReducer.idUser)
    const level = useSelector(store => store.usersReducer.level)
    const dispatch = useDispatch()
    const [style, setStyle] = useState("buttonNone")
    const [valueData, setValueData] = useState('valueDataFlex')
    const [inputValueData, setInputValueData] = useState('inputValueDataNone')
    const [buttonUpdate, setButtonUpdate] = useState('buttonNone')
    const [buttonText, setButtonText] = useState('EDITAR PERFIL')
    const [inputs, setInputs] = useState({ name: name, email: email, idUser: user })
    const changeValueDataDisplay = () => {
        if (valueData === 'valueDataFlex') {
            setValueData('valueDataNone')
            setInputValueData('inputValueDataFlex')
            setButtonUpdate('buttonLoginAndRegister')
            setButtonText('CANCELAR')
        } else {
            setValueData('valueDataFlex')
            setInputValueData('inputValueDataNone')
            setButtonUpdate('buttonNone')
            setButtonText('EDITAR PERFIL')
        }
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
        <div className = 'userAccountContainer'>
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
            <div className='userDataContainer'>
                    <div className='nameeContainer'>
                        <span className={valueData}>{name}</span>
                        <input id='name' type='name' className={inputValueData} placeholder={name} onChange={handleChange} />
                    </div>

                    <div className='emaillContainer'>
                        <span className={valueData}>{email}</span>
                        <input id='email' type='email' className={inputValueData} placeholder={email} onChange={handleChange} />
                    </div>
                    <button id='buttonEdit' className={style} onClick={() => {
                        changeValueDataDisplay()
                    }} >{buttonText}</button>
                    <div className={buttonUpdate}>
                        <button onClick={() => {
                            if (!document.getElementById('name').value || !document.getElementById('email').value) {
                                toast.error("Debe completar todos los datos", {
                                    position: "top-center",
                                    autoClose: 2500,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                })
                            }
                            else {
                                dispatch(actionUpdateUser(inputs))
                                changeValueDataDisplay()
                            }
                        }}>APLICAR CAMBIOS</button>
                    </div>
            </div>
        </div>
    )
}
export default MyAccount;