import React, { useEffect, useState } from 'react'
import Logo from './Images/Logo.png'
import './navBar.css'
import SearchBar from '../SearchBar/SearchBar'
import { Modal } from 'reactstrap'
import Login from '../LogIn/Login'
import Register from '../Register/Register'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetOrder } from '../../redux/ordersActions'
import UserLogged from '../UserLogged/UserLogged'
import { useCookies } from 'react-cookie';
import Cart from '../UserLogged/Cart'
import { actionVerifyCookies } from '../../redux/usersActions'

const NavBar = () => {
    //// ---------------------------- DEV ---------------------------- //
    const [cookie, setCookie] = useCookies(['ttkk']);
    const cookieValidation = useSelector(store => store.usersReducer.cookieValidation)
    const dispatch = useDispatch()
    useEffect(async () => {
        if (cookie.idUser) {
            dispatch(actionVerifyCookies(cookie))
            //PREGUNTAR A BACK COMO PEDIRLE LA VALIDACION DE LA COOKIE Y CREAR EL ACTION
        } else {
            await dispatch(actionVerifyCookies(cookie))
            setCookie('idUser', user);
            setCookie('name', name);
            setCookie('email', email);
            setCookie('level', level);
        }

        dispatch(actionGetOrder(user));
    }, [])
    // ---------------------------- States ---------------------------- //
    const [modalLogin, setModalLogin] = useState(false)
    const [modalRegister, setModalRegister] = useState(false)
    const user = useSelector(state => state.usersReducer.idUser)
    const name = useSelector(state => state.usersReducer.name)
    const email = useSelector(state => state.usersReducer.email)
    const level = useSelector(state => state.usersReducer.level)
    // ---------------------------- Functions ---------------------------- //
    // ----- To Open Modals ----- //
    const modalLoginView = () => setModalLogin(!modalLogin);
    const modalRegisterView = () => setModalRegister(!modalRegister);

    // ----- To Close Modals ----- //
    const modalLoginClose = () => setModalLogin(false);
    const modalRegisterClose = () => setModalRegister(false);

    const handleChancha = () => {

    }
    const ChangeModal = () => {
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
                            <button className='buttonProducts' onClick={handleChancha} >My Account</button>
                        ) : (<div></div>)}
                    </div>
                    <div className='searchBar'>
                        <SearchBar />
                    </div>
                    {user ?
                        (
                            <div><UserLogged /></div>
                        )
                        :
                        (
                            <div className='SessionContainer'>
                                <div className='registerContainer'>
                                    <button className='signup' onClick={e => modalLoginView()}>Login</button>
                                    <button className='login' onClick={e => modalRegisterView()}>Register</button>
                                </div>
                                <div className='cartContainer'>
                                    <Cart />
                                </div>
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