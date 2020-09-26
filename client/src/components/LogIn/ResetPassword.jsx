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
            <h3>We will send you an email with a link, please check your inbox</h3>
            <p>Put the email with which you registered in La Cosería here:</p>
            <input className='resetInput' type="email" required placeholder='youremail@lacoseria.com' onChange = {handleChange} />
            <button className = 'buttonLoginAndRegister' onClick={handleReset}>Send</button>
            { loading ? 
            (<Loading loadingClose = 'loadingClose'></Loading>):('')} 
            </div>
    )
}

export default ResetPassword