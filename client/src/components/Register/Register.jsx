import React from 'react'
import { actionUserCreate } from '../../redux/usersActions'
import { connect, useDispatch, useSelector } from 'react-redux'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState } from 'react'
import { useHistory } from 'react-router'
import './Register.css'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Register = (props) => {

    toast.configure()

    const { modalRegisterClose, ChangeModal } = props;
    const [registerInputs, setRegisterInputs] = useState({ name: '', email: '', password: '', level: 'USER' })
    const [secondPassword, setSecondPassword] = useState('')

    const dispatch = useDispatch();

    const handleChange = event => {
        const { name, value } = event.target
        if (name === 'secondPassword') {
            setSecondPassword(value);
        } else {
            setRegisterInputs({ ...registerInputs, [name]: value })
        }
    }
    const VerificarYRegistrar = () => {
        if(!registerInputs.name){
            toast.error("El nombre es obligatorio", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        } 
        else if(!registerInputs.email){
            toast.error("El email es obligatorio", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
        else if (secondPassword === registerInputs.password) {
            dispatch(actionUserCreate({ ...registerInputs }))
            modalRegisterClose()
        } else {
            toast.error("Las contraseñas no coinciden", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }
    const ClicktoSign = () => {
        props.setGoogle(true);
        window.open("http://localhost:3000/auth/google");
    };

    const ClicktoSignGit = () => {
        props.setGithub(true);
        window.open("http://localhost:3000/auth/github");
    };
    return (
        <div className='loginContainer'>
            <button className='closeButton' onClick={modalRegisterClose}>x</button>
            <ModalHeader id='loginHeaderContainer'>
                <div className="registerTitle">Creá tu cuenta</div>
            </ModalHeader>
            <ModalBody id='loginBodyContainer'>
                <div className='FormRegisterContainer'>
                <div className='input-icons'>
                    <i class="fa fa-user icon"></i>
                    <input className="input-field " id='nameRegister' name='name' type='text' placeholder='Nombre' onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            document.getElementById('emailRegister').focus()
                        }
                    }} onChange={handleChange} />
                </div>
                <div className='input-icons'>
                <i class="fa fa-envelope"></i>
                    <input className="input-field " id='emailRegister' name='email' type='email' placeholder='Email' onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            document.getElementById('passwordRegister').focus()
                        }
                    }} onChange={handleChange} />
                    </div>
                    <div className='input-icons'>
                    <i class="fa fa-lock"></i>
                    <input className="input-field " id='passwordRegister' name='password' type="password" placeholder='Contraseña' onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            document.getElementById('secondPasswordRegister').focus()
                        }
                    }} onChange={handleChange} />
                    </div>
                    <div className='input-icons'>
                    <i class="fa fa-lock"></i>
                    <input className="input-field " id='secondPasswordRegister' name='secondPassword' type="password" placeholder='Repeti la contraseña' onKeyPress={e => {
                        if (e.key === 'Enter') {
                            VerificarYRegistrar()
                        }
                    }} onChange={handleChange} />
                    </div>
                </div>
                <button className='buttonLoginAndRegister' onClick={e => VerificarYRegistrar()} >Crear</button>
            </ModalBody>
            <ModalFooter id='loginFooterContainer'>
                <div className='LoginAccount'>
                    <a><div className='logComponent'>
                        <p className='alreadylog' > </p>
                        <a className='logAccount' href='#' onClick={ChangeModal}>Ya tenes una cuenta?</a>
                    </div></a>
                    <div className='LoginAccountAux'>
                        <p className='orLogin'>O inicia sesión con</p>
                        <button onClick={ClicktoSign} className='btnGoogle'>
                            <div class="google-btn">
                                <div class="google-icon-wrapper">
                                    <img
                                        class="buttonLoginGoogle"
                                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                    />
                                </div>
                                <div class="btn-text">
                                </div>
                            </div>
                        </button>
                        <button onClick={ClicktoSignGit} class="btn btn-block social-login github">
                            <span class="social-icons">
                                <i class="fab fa-github fa-lg">
                                </i>
                            </span>
                        </button>
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