import React from 'react'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './Login.css'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'


const Login = (props) => {

    const {modalLoginClose, ChangeModal} = props;

    const responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj)
    }
    
    const responseFacebook = (response) => console.log(response);
    const componentClicked = () => console.log('clicked')


    return (
    <div className='loginContainer'>
    <button className='closeButton' onClick={modalLoginClose}>x</button>
        <ModalHeader id='loginHeaderContainer'>
                <div className="addProductTitle">Login with</div>
        </ModalHeader>
        <ModalBody id='loginBodyContainer'>
            <div>
                {/* Buttons GitHub, Google, Facebook? */}
            </div>
            <input className='standardInput' type='email' placeholder='laCoseria@gmail.com'/>
            <input className='standardInput' type="password" placeholder='··············'/>
            <button className= 'logginButton' onClick={e => modalLoginClose()}>LOGIN</button>
        </ModalBody>
        <ModalFooter id='loginFooterContainer'>
            <div className = 'LoginAccount'>
            <a className= 'createComponent '><div>Looking for <a  className='createAccount' href='#' onClick={ChangeModal}> create account</a>?</div></a>
            <div className = 'LoginAccountAux'> 
            <p className = 'orLogin'>or login with</p>
                <GoogleLogin className = 'GoogleLogin' 
                clientId= '201334037554-3dqbt2c7a5hij69djsfp0kc4mtgb1bgj.apps.googleusercontent.com' 
                buttonText = 'Google' 
                onSuccess = {responseGoogle}
                onFailure = {responseGoogle} 
                cookiePolicy = {'single_host_origin'} />
                <FacebookLogin  
                className = 'FacebookLogin'
                appId="340361817317695"
                autoLoad={false}
                textButton= 'facebook'
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
                icon="fa-facebook"/>
            </div>
            </div>
        </ModalFooter>


    </div>
)}

export default Login