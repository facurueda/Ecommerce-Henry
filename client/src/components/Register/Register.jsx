import React from 'react'
import { actionAddToCart } from '../../redux/ordersActions'
import { actionUserCreate } from '../../redux/usersActions'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

// name, email, password, level
// ejecutar props.actionUserCreate({ name: input.name, email: input.email, password: input.password, level: input.level })
const Register = (props) => {

    

    return (
            <div className='loginContainer'>
                <ModalHeader id='loginHeaderContainer'>
                    <div className="addProductTitle">Register with</div>
                </ModalHeader>
                <ModalBody id='loginBodyContainer'>
                    <div>
                        {/* Buttons GitHub, Google, Facebook? */}
                    </div>
                    <input className='emailInput' type='email' placeholder='Email' />
                    <input className='passwordInput' type="password" placeholder='Password' />
                    <input className='passwordInput' type="password" placeholder='Repeat Password' />
                    <button className='buttonLogin'>CREATE ACCOUNT</button>
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