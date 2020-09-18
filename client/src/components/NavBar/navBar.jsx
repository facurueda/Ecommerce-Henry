import React, { useEffect, useState } from 'react'
import Logo from './Images/Logo.png'
import Cart from './Images/Cart.png'
import './navBar.css'
import SearchBar from '../SearchBar/SearchBar'
import { Modal } from 'reactstrap'
import Login from '../LogIn/Login'
import Register from '../Register/Register'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetOrder } from '../../redux/ordersActions'

const NavBar = () => {
    //// ---------------------------- DEV ---------------------------- //
    const dispatch = useDispatch()
    useEffect(async () => {
        dispatch(actionGetOrder(user));
    },[])

    // ---------------------------- States ---------------------------- //
    const [modalLogin, setModalLogin] = useState(false)
    const [modalRegister, setModalRegister] = useState(false)
    const user = useSelector(state => state.usersReducer.idUser)
    const quantity = useSelector(store => store.ordersReducer.quantity)
    // ---------------------------- Functions ---------------------------- //
    // ----- To Open Modals ----- //
    const modalLoginView = () => setModalLogin(!modalLogin);
    const modalRegisterView = () => setModalRegister(!modalRegister);

    // ----- To Close Modals ----- //
    const modalLoginClose = () => setModalLogin(false);
    const modalRegisterClose = () => setModalRegister(false);


    const ChangeModal =  () => {
         modalLoginView()
         modalRegisterView()
    }
    return (

        <div >
            <div className='navContainer'>
                <div className='logoContainer'>
                    <a href="/">
                        <img className='imageLogo' src={Logo} alt='Logo' />
                    </a>
                </div>
                <div className='routerContainer'>
                    <div className='buttonsContainer'>
                        <form action="/">
                            <button className='buttonHome'>Home</button>
                        </form>
                        <form action="/catalogue">
                            <button className='buttonProducts'>Products</button>
                        </form>
                        {user ? (
                            <form action="/Admin">
                                <button className='buttonProducts'>My Account</button>
                            </form>
                        ) : (<div></div>)}
                    </div>
                    <div className='searchBar'>
                        <SearchBar />
                    </div>
                    {user ?
                        (
                            <div className='cartContainer'>
                                <a href='/order'>
                                    <img className='buttonCart' src={Cart} alt='Cart' />
                                </a>
                                <div className='quantityProducts'>
                                    {quantity}
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className='registerContainer'>
                                <button className='signup' onClick={e => modalLoginView()}>Login</button>
                                <button className='login' onClick={e => modalRegisterView()}>Register</button>
                            </div>
                        )}
                    <Modal isOpen={modalLogin}>
                        <Login modalLoginClose={modalLoginClose} ChangeModal={ChangeModal} />
                    </Modal>

                    <Modal isOpen={modalRegister}>
                        <Register modalRegisterClose={modalRegisterClose} ChangeModal={ChangeModal} />
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default NavBar;