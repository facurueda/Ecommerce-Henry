import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actionResetPassword } from '../../redux/usersActions'
import Loading from '../LoadingMiddleware/LoadingMiddleware'
import './ResetPassword.css'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState({})
    const [loading, setLoading] = useState(false)
    const loadingView = () => setLoading(!loading)
    const loadingClose = () => setLoading(false)
    const handleReset = () => {
        dispatch(actionResetPassword(email))
        loadingView()
    }
    const handleChange = (e) => {
        const { type, value } = e.target
        setEmail({
            ...email,
            [type]: value
        })
    }
    return (
        <div className='resetContainer'>
            <h3>Te enviaremos un mail a tu correo, por favor chequea la bandeja de entrada:</h3>
            <p>Pone el email con el que te registraste en la Cosería aquí:</p>
            <input className='resetInput' type="email" 
            required placeholder='youremail@lacoseria.com' onChange = {handleChange} />
            <button className = 'buttonLoginAndRegister' onClick={handleReset}>Send</button>
            { loading ?
            (<Loading loadingClose = 'loadingClose'></Loading>):('')} 
            </div>
    )
}

export default ResetPassword