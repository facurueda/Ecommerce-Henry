import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './NewPassword.css'
import { actionPasswordUpdate, actionResetStatusReset } from '../../redux/usersActions'

const NewPassword = (props) => {
    const qs = require('qs')
    const dispatch = useDispatch()
    const [secondPassword, setSecondPassword] = useState('')
    const [passwordInputs, setpasswordInputs] = useState({ password: 'null' })
    const resetStatus = useSelector(store => store.usersReducer.resetStatus)
    const handleChange = event => {
        const { name, value } = event.target
        if (name === 'secondPassword') {
            setSecondPassword(value);
        } else {
            setpasswordInputs({
                ...passwordInputs,
                [name]: value
            })
        }
    }
    if (resetStatus.length > 0) {
        window.alert(resetStatus[0])
        setTimeout(() => {
            handleClose()
        }, 200);
    }
    const Verificar = () => {
        if (secondPassword === passwordInputs.password) {
            dispatch(actionPasswordUpdate(passwordInputs))
        } else {
            window.alert('Las contraseñas no coinciden, intentelo denuevo.')
        }
    }
    const handleClose = () => {
        dispatch(actionResetStatusReset())
        window.location.href = '/'
    }
    const handleView = () => {
        document.getElementById('tokenContainer').style.display = 'none'
        document.getElementById('tokenContainer2').style.display = 'none'
        document.getElementById('formContainerReset').style.display = "flex"
    }
    return (
        <div className='generalContainerReset'>
        <h3 id='tokenContainer2'>Ingresa el Codigo que recibiste por email.</h3>
        <div id='tokenContainer' className='tokenContainer'>
                    <input className='inputs1' name='token' placeholder='Ingresa tu codigo aqui' onChange={handleChange}></input>
                    <button className='buttonLoginAndRegister' onClick={handleView}>Continuar</button>
                </div>
            <div id='formContainerReset' className='formContainerReset'>
            <h3>Escribí tu nueva contraseña aquí:</h3>
                    <input className='inputs1' name='password'
                        type="password" placeholder='Password' onChange={handleChange}></input>
                    <input className='inputs2' name='secondPassword'
                        type="password" placeholder='Repeat your password' onChange={handleChange}></input>
                    <button className='buttonLoginAndRegister' onClick={Verificar}>Verificar</button>
            </div>
        </div>
    )

}

export default NewPassword