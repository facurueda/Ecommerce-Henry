import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actionResetPassword } from '../../redux/usersActions'
import './ResetPassword.css'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const [email, setEmail ] = useState({})

    const handleReset = () => {
        dispatch(actionResetPassword(email))
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
            <h3>We will send you an email with a link, please check your inbox</h3>
            <p>Put the email with which you registered in La Cosería here:</p>
            <input className='resetInput' type="email" required placeholder='youremail@lacoseria.com' onChange = {handleChange} />
            <button className = 'buttonLoginAndRegister' onClick={handleReset}>Send</button>
        </div>
    )
}

export default ResetPassword