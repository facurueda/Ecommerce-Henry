import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actionResetPassword } from '../../redux/usersActions'
import Loading from '../LoadingMiddleware/LoadingMiddleware'
import './ResetPassword.css'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState({})
    const handleReset = () => {
        dispatch(actionResetPassword(email))
        document.getElementById('resetContainer').style.display = "none"
        document.getElementById('sendContainer').style.display = "flex"
    }
    const handleChange = (e) => {
        const { type, value } = e.target
        setEmail({
            ...email,
            [type]: value
        })
    }
    return (
        <div>
            <div id='resetContainer' className='resetContainer'>
                <h3>Ingresa el email con el que te registraste en la Cosería.</h3>
                <p>Te enviaremos un mail a tu correo, por favor chequea la bandeja de entrada.</p>
                <input className='resetInput' type="email"
                    required placeholder='youremail@lacoseria.com' onChange={handleChange} />
                <button className='buttonLoginAndRegister' onClick={handleReset}>Send</button>
            </div>
            <div id='sendContainer' className='sendContainer'>
                <h3>Te hemos enviado un correo electronico a {email.email}</h3>
                <p>Revisa tu bandeja de entrada, no olvides revisar tu carpeta de spam.</p>
            </div>
        </div>
    )
}

export default ResetPassword