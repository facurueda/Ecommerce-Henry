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
import { actionSetVerified, actionVerifyCookies, actionSetCookieToStore, actionGetMe, actionSetModalLogin } from '../../redux/usersActions'

const NavBar = () => {

    const [cookie, setCookie, removeCookie] = useCookies(['ttkk']);
    const dispatch = useDispatch()
    const modalLogin = useSelector(store => store.usersReducer.modalLogin)
    const [modalRegister, setModalRegister] = useState(false)
    const idUser = useSelector(state => state.usersReducer.idUser)
    const level = useSelector(state => state.usersReducer.level)
    const verified = useSelector(state => state.usersReducer.verified)
    const loggedOut = useSelector(state => state.usersReducer.loggedOut)
    const [google, setGoogle] = useState(true)
    const [github, setGithub] = useState(true)

    useEffect(() => {
        if (Object.keys(cookie).length <= 1) {
            dispatch(actionVerifyCookies(cookie))
        }
        else {
            dispatch(actionGetMe())
        }
        dispatch(actionGetOrder(cookie.idUser));
        setTimeout(() => {
            return dispatch(actionGetOrder(cookie.idUser))
        }, 300);
        dispatch(actionSetCookieToStore(cookie))
    }, [])
    if (loggedOut) {
            removeCookie('idUser')
            removeCookie('level')
            // removeCookie('connect.sid')
            // setTimeout(() => {
            //     window.location.reload()
            // }, 200);
    }
    if (verified) {
        setCookie('idUser', idUser, { path: '/' })
        setCookie('level', level, { path: '/' })
        dispatch(actionSetVerified(false))
    }
    if (google) {
        setGoogle(false)
        dispatch(actionGetMe())
    }
    if (github) {
        setGithub(false)
        dispatch(actionGetMe())
    }
    const categories = useSelector(state => state.categoriesReducer.categories)

    // const productsFilter = (e) => {
    //     if (e !== 'All categories') {
    //         dispatch(actionGetProductsByCategory(e))
    //     } else {
    //         dispatch(actionGetProducts())
    //     }
    // }

    const modalLoginView = () => dispatch(actionSetModalLogin(!modalLogin));
    const modalRegisterView = () => setModalRegister(!modalRegister);
    const modalRegisterClose = () => setModalRegister(false)
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
                    {/* <div className='buttonsContainer'> */}
                    <ul className="menu">
                        <li><a className = 'buttonProducts' href="/">HOME</a></li>
                        <li className="dropdownCategories">
                            <a className = 'buttonProducts' href="/catalogue">PRODUCTOS</a>
                            <ul className="dropdownSubCat">
                                {categories.map(category => {
                                    return <li><a className='categoryDrop' href="/">{category.name}</a></li>
                                    
                                })
                                }
                            </ul>
                        </li>
                        </ul>
                        {/* <form action="/">

                            <div>
                                <button className='buttonProducts'>HOME</button>
                            </div>
                        </form>
                        <form action="/catalogue">
                            <button className='buttonProducts'>PRODUCTOS</button>
                        </form> */}
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
                        <Login ChangeModal={ChangeModal} setGoogle={setGoogle} setGithub={setGithub}  />
                    </Modal>
                    <Modal isOpen={modalRegister}>
                        <Register modalRegisterClose={modalRegisterClose} ChangeModal={ChangeModal} setGoogle={setGoogle} setGithub={setGithub} />
                    </Modal>
                </div>
            </div>

    )
}
export default NavBar;