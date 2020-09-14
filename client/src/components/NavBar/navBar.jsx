import React, { useState } from 'react'
import Logo from './Images/Logo.png'
import Cart from './Images/Cart.png'
import './navBar.css'
import SearchBar from '../SearchBar/SearchBar'
import { Modal, Button } from 'reactstrap'
import Login from '../LogIn/Login'
import Register from '../Register/Register'

const NavBar = () => {

    // ---------------------------- States ---------------------------- //
    const [modalLogin, setModalLogin] = useState(false)
    const [modalRegister, setModalRegister] = useState(false)
    const user = 0

    // ---------------------------- Functions ---------------------------- //

    // ----- To Open Modals ----- //
    const modalLoginView = () => setModalLogin(!modalLogin);
    const modalRegisterView = () => setModalRegister(!modalRegister);

    // ----- To Close Modals ----- //
    const modalLoginClose = () => setModalLogin(false);
    const modalRegisterClose = () => setModalRegister(false);


    const ChangeModal = async () => {
        await modalLoginView()
        await modalRegisterView()
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
                            <form action="/Account">
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
                                <div className='quantityProducts'>7</div>
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