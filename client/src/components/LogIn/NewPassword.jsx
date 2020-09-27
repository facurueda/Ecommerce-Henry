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
    const token = qs.parse(props.location.search, { ignoreQueryPrefix: true }).token
    useEffect(() => {
        handleChange({ target: { name: 'token', value: token } })
    }, [])
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
    return (
        <div className='generalContainerReset'>
            <h3>Escribí tu nueva contraseña aquí:</h3>
            <div className='formContainerReset'>
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