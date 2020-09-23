import React from 'react'
import { actionUserCreate } from '../../redux/usersActions'
import { connect, useDispatch, useSelector } from 'react-redux'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState } from 'react'
import { useHistory } from 'react-router'
import './Register.css'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'


const Register = (props) => {
    const history = useHistory()
    const { modalRegisterClose, ChangeModal } = props;
    // ---------------------------- States ---------------------------- //
    const [registerInputs, setRegisterInputs] = useState({ name: 'null', email: 'null', password: 'null', level: 'USER' })
    const [secondPassword, setSecondPassword] = useState('')
    const idUser = useSelector(store => store.usersReducer.idUser)
    const level = useSelector(store => store.usersReducer.level)
    const dispatch = useDispatch();

    // ---------------------------- Functions ---------------------------- //

    const responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj)
    }
    const responseFacebook = (response) => console.log(response);
    const componentClicked = () => console.log('clicked')
    const handleChange = event => {
        const { name, value } = event.target
        if (name === 'secondPassword') {
            setSecondPassword(value);
        } else {
            setRegisterInputs({ ...registerInputs, [name]: value })
        }
    }
    const VerificarYRegistrar = () => {
        if (secondPassword === registerInputs.password) {
            dispatch(actionUserCreate({...registerInputs}))
            console.log('Usuario registrado.')
            modalRegisterClose()
        } else {
            console.log("Credenciales Incorrectas")
        }
    }
    const tologin = () => {
        history.push('/login')
    }

    return (
        <div className='loginContainer'>
            <button className='closeButton' onClick={modalRegisterClose}>x</button>
            <ModalHeader id='loginHeaderContainer'>
                <div className="registerTitle">Register</div>
            </ModalHeader>
            <ModalBody id='loginBodyContainer'>
                <div>
                    {/* Buttons GitHub, Google, Facebook? */}
                </div>
                <div className='FormRegisterContainer'>
                    <input className='inputRegister' id='nameRegister' name='name' type='text' placeholder='Name' onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            document.getElementById('emailRegister').focus()
                        }
                    }} onChange={handleChange} />
                    <input className='inputRegister' id='emailRegister' name='email' type='email' placeholder='Email' onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            document.getElementById('passwordRegister').focus()
                        }
                    }} onChange={handleChange} />
                    <input className='inputRegister' id='passwordRegister' name='password' type="password" placeholder='Password' onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            document.getElementById('secondPasswordRegister').focus()
                        }
                    }} onChange={handleChange} />
                    <input className='inputRegister' id='secondPasswordRegister' name='secondPassword' type="password" placeholder='Repeat Password' onKeyPress={e => {
                        if (e.key === 'Enter') { VerificarYRegistrar() }
                    }} onChange={handleChange}/>

                    <button className='buttonLoginAndRegister' onClick={e => VerificarYRegistrar()} >CREATE ACCOUNT</button>
                </div>
            </ModalBody>
            <ModalFooter id='loginFooterContainer'>
                <div className='LoginAccount'>
                    <a><div className='logComponent'>
                        <p className='alreadylog' >Already have an account? </p>
                        <a className='logAccount' href='#' onClick={ChangeModal}>Login</a>
                    </div></a>
                    <div className='LoginAccountAux'>
                        <p className='orLogin'>or login with</p>
                        <GoogleLogin
                            clientId='201334037554-3dqbt2c7a5hij69djsfp0kc4mtgb1bgj.apps.googleusercontent.com'
                            buttonText='Google'
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'} />
                        <FacebookLogin
                            appId="340361817317695"
                            autoLoad={false}
                            textButton='Facebook'
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

const mapDispatchToProps = (dispatch) => {
    return {
        actionUserCreate: (props) => {
            dispatch(actionUserCreate(props))
        }
    }
}

export default connect(() => { }, mapDispatchToProps)(Register);