import React from 'react'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './Login.css'


const Login = (props) => {

    const {modalLoginClose, ChangeModal} = props;

    return (
    <div className='loginContainer'>
        <ModalHeader id='loginHeaderContainer'>
                <div className="addProductTitle">Login with</div>
        </ModalHeader>
        <ModalBody id='loginBodyContainer'>
            <div>
                {/* Buttons GitHub, Google, Facebook? */}
            </div>
            <input className='standardInput' type='email' placeholder='laCoseria@gmail.com'/>
            <input className='standardInput' type="password" placeholder='··············'/>
            <button className='standardInput' onClick={e => modalLoginClose()}>LOGIN</button>
        </ModalBody>
        <ModalFooter id='loginFooterContainer'>
            <a><div className='createAccount'>Looking for <a href='#' onClick={ChangeModal}>Create Account</a>?</div></a>
        </ModalFooter>


    </div>
)}

export default Login