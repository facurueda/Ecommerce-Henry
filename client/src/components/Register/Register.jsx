import React from 'react'
import { actionAddToCart } from '../../redux/ordersActions'
import { actionUserCreate } from '../../redux/usersActions'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState } from 'react'

// name, email, password, level
// ejecutar props.actionUserCreate({ name: input.name, email: input.email, password: input.password, level: input.level })

    
const Register = (props) => {

    const {modalRegisterClose, actionUserCreate} = props;

    // ---------------------------- States ---------------------------- //
    
    const [registerInputs, setRegisterInputs] = useState({name:'null', email:'null', password:'null',level:'USER'})

    // ---------------------------- Functions ---------------------------- //

    const handleChange = event => {
        const { name, value } = event.target
        setRegisterInputs({ ...registerInputs, [name]: value })
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
                    <input className='name' name='name' type='text' placeholder='Name' onChange={handleChange}/>
                    <input className='emailInput' name='email' type='email' placeholder='Email' onChange={handleChange}/>
                    <input className='passwordInput' name='password' type="password" placeholder='Password'onChange={handleChange}/>
                    <input className='passwordInput' type="password" placeholder='Repeat Password' />
                    <button className='buttonLogin' onClick={e => actionUserCreate(registerInputs)} >CREATE ACCOUNT</button>
                </ModalBody>
                <ModalFooter id='loginFooterContainer'>
                    <a><div className='createAccount'>Already have an account? <a>Login</a></div></a>
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

export default connect(() => {}, mapDispatchToProps)(Register);