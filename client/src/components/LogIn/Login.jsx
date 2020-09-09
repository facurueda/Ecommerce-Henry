import React from 'react'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './Login.css'


const Login = (props) => {

    const {modalLoginClose} = props;

    return (

    
    <div className='loginContainer'>
        <ModalHeader id='loginHeaderContainer'>
                <div className="addProductTitle">Login with</div>
        </ModalHeader>
        <ModalBody id='loginBodyContainer'>
            <div>
                {/* Buttons GitHub, Google, Facebook? */}
            </div>
            <input className='emailInput' type='email'/>
            <input className='passwordInput' type="password"/>
            <button className='buttonLogin' onClick={e => modalLoginClose()}>LOGIN</button>
        </ModalBody>
        <ModalFooter id='loginFooterContainer'>
            <a><div className='createAccount'>Looking to <a>Create Account</a> ?</div></a>
        </ModalFooter>


    </div>
)}

export default Login