import React, { useEffect, useState } from 'react'
import Logo from './Images/Logo.png'
import './navBar.css'
import SearchBar from '../SearchBar/SearchBar'
import { Form, Modal } from 'reactstrap'
import Login from '../LogIn/Login'
import Register from '../Register/Register'
import gatito from './Images/gatito.png'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetOrder, actionGetOrdersByUser } from '../../redux/ordersActions'
import UserLogged from '../UserLogged/UserLogged'
import { useCookies } from 'react-cookie';
import Cart from '../UserLogged/Cart'
import { actionSetVerified, actionVerifyCookies, actionSetCookieToStore, actionLogOut } from '../../redux/usersActions'

const NavBar = () => {
    //// ---------------------------- DEV ---------------------------- //
    const [cookie, setCookie, removeCookie] = useCookies(['ttkk']);
    const dispatch = useDispatch()
    // ---------------------------- States ---------------------------- //
    const [modalLogin, setModalLogin] = useState(false)
    const [modalRegister, setModalRegister] = useState(false)
    const idUser = useSelector(state => state.usersReducer.idUser)
    const level = useSelector(state => state.usersReducer.level)
    const verified = useSelector(state => state.usersReducer.verified)
    const loggedOut = useSelector(state => state.usersReducer.loggedOut)
    if (loggedOut) {
        if (cookie.idUser || cookie.level) {
            removeCookie('idUser')
            removeCookie('level')
        } else {
            dispatch(actionSetCookieToStore(cookie))
            actionLogOut(cookie)
            window.location.reload()
        }
    }
    if (verified) {
        setCookie('idUser', idUser, { path: '/' })
        setCookie('level', level, { path: '/' })
        dispatch(actionGetOrder(idUser))
        dispatch(actionSetVerified(false))

    }
    useEffect(() => {
        dispatch(actionGetOrder(cookie.idUser));
        setTimeout(() => {
            return dispatch(actionGetOrdersByUser(cookie.idUser))
        }, 200);
        dispatch(actionSetCookieToStore(cookie))
        dispatch(actionVerifyCookies(cookie))
    }, [])
    // ---------------------------- Functions ---------------------------- //
    // ----- To Open Modals ----- //
    const modalLoginView = () => setModalLogin(!modalLogin);
    const modalRegisterView = () => setModalRegister(!modalRegister);
    // ----- To Close Modals ----- //
    const modalLoginClose = () => setModalLogin(false);
    const modalRegisterClose = () => setModalRegister(false);

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
                <div> <img className='nomematen' src={gatito} /></div>
                <div className='routerContainer'>
                    <div className='buttonsContainer'>
                        <form action="/">
                            <div><button className='buttonProducts'>Home</button></div>
                        </form>
                        <form action="/catalogue">
                            <div><button className='buttonProducts'>Products</button></div>
                        </form>
                    </div>
                    <div className='searchBar'>
                        <SearchBar />
                    </div>
                    {level === 'user' || level === 'admin' ?
                        (
                            <div className='userLogged' >
                                <UserLogged />
                                <div className='cartContainer'>
                                    <Cart />
                                </div>
                            </div>
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