import React from 'react'
import { actionUserCreate } from '../../redux/usersActions'
import { connect } from 'react-redux'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState } from 'react'
import { useHistory } from 'react-router'
import './Register.css'

// name, email, password, level
// ejecutar props.actionUserCreate({ name: input.name, email: input.email, password: input.password, level: input.level })


const Register = (props) => {
    const history = useHistory()
    const { modalRegisterClose, actionUserCreate,ChangeModal } = props;
    // ---------------------------- States ---------------------------- //
    const [registerInputs, setRegisterInputs] = useState({ name: 'null', email: 'null', password: 'null', level: 'USER' })
    const [secondPassword, setSecondPassword] = useState('')

    // ---------------------------- Functions ---------------------------- //

    const handleChange = event => {
        const { name, value } = event.target
        if (name === 'seconPassword') {
            setSecondPassword(value);
        } else {
            setRegisterInputs({ ...registerInputs, [name]: value })
        }
    }
    const VerificarYRegistrar = () => {
        if (secondPassword === registerInputs.password) {
            actionUserCreate(registerInputs)
            console.log('Usuario registrado.')
        } else {
            console.log("Credenciales Incorrectas")
        }
    }
    const tologin = () => {
        history.push('/login')
    }

    return (
        <div className='loginContainer'>
            <ModalHeader id='loginHeaderContainer'>
                <div className="addProductTitle">Register with</div>
            </ModalHeader>
            <ModalBody id='loginBodyContainer'>
                <div>
                    {/* Buttons GitHub, Google, Facebook? */}
                </div>
                <div className='FormRegisterContainer'>
                    <input className='standardInput' name='name' type='text' placeholder='Name' onChange={handleChange} />
                    <input className='standardInput' name='email' type='email' placeholder='Email' onChange={handleChange} />
                    <input className='standardInput' name='password' type="password" placeholder='Password' onChange={handleChange} />
                    <input className='standardInput' name='secondPassword' type="password" placeholder='Repeat Password' />
                    <button className='buttonLogin' onClick={e => VerificarYRegistrar()} >CREATE ACCOUNT</button>
                </div>
            </ModalBody>
            <ModalFooter id='loginFooterContainer'>
                <a><div className='createAccount'>Already have an account? <a onClick={ChangeModal}>Login</a></div></a>
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