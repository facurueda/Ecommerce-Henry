import React, { useState } from 'react'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './Login.css'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { useDispatch, useSelector } from 'react-redux'
import { actionLogin } from '../../redux/usersActions'

const Login = (props) => {
    const dispatch = useDispatch()
    const { modalLoginClose, ChangeModal } = props;
    const [inputs, setInputs] = useState({})
    const idUser = useSelector(store => store.usersReducer.idUser)
    const handleChancla = () => {
        dispatch(actionLogin({ ...inputs, idUser: idUser }))
        modalLoginClose()
        setTimeout(() => {
            window.location.reload()
        }, 200);
    }
    const handleInput = (e) => {
        const { type, value } = e.target
        setInputs({
            ...inputs,
            [type]: value
        })
    }
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
                <div className="addProductTitle">Login </div>
            </ModalHeader>
            <ModalBody id='loginBodyContainer'>
                <input className='standardInput' id='email' type='email' placeholder='info@lacoseria.com' onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        document.getElementById('password').focus()
                    }
                }} onChange={handleInput} />
                <input className='standardInput' id='password' type="password" placeholder='··············' onKeyPress={e => {
                    if (e.key === 'Enter') { handleChancla(e) }
                }} onChange={handleInput} />
                <button className='buttonLoginAndRegister' onClick={(e) => {
                    handleChancla(e)
                }}>LOGIN</button>
                <div> Or do you <a className='createAccount' href='/forgot'>forgot your password?</a> </div>
            </ModalBody>
            <ModalFooter id='loginFooterContainer'>
                <div className='LoginAccount'>
                    <a className='createComponent '>
                        <div className='accountComponent'>
                            <p className='lookingFor' >Looking for </p>
                            <a className='createAccount' href='#' onClick={ChangeModal}>
                                create account
                            </a>?
                        </div>
                    </a>
                    <div className='LoginAccountAux'>
                        <p className='orLogin'>or login with</p>
                        <GoogleLogin className='GoogleLogin'
                            clientId='201334037554-3dqbt2c7a5hij69djsfp0kc4mtgb1bgj.apps.googleusercontent.com'
                            buttonText='Google'
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'} />
                        <FacebookLogin
                            className='FacebookLogin'
                            appId="340361817317695"
                            autoLoad={false}
                            textButton='facebook'
                            fields="name,email,picture"
                            onClick={componentClicked}
                            callback={responseFacebook}
                            icon="fa-facebook" />
                    </div>
                </div>
            </ModalFooter>
        </div>
    )
}

export default Login