import React, { useEffect, useState } from 'react'
import Logo from './Images/Logo.png'
import Cart from './Images/Cart.png'
import './navBar.css'
import SearchBar from '../SearchBar/SearchBar'
import { Modal, Button } from 'reactstrap'
import Login from '../LogIn/Login'
import Register from '../Register/Register'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetOrder } from '../../redux/ordersActions'
import { actionGetUserById } from '../../redux/usersActions'

const NavBar = () => {
    //// ---------------------------- DEV ---------------------------- //
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actionGetUserById(1))
    }, [])

    // ---------------------------- States ---------------------------- //
    const [modalLogin, setModalLogin] = useState(false)
    const [modalRegister, setModalRegister] = useState(false)
    const user = useSelector(state => state.usersReducer.idUser)
    useEffect(() => {
        dispatch(actionGetOrder(user));
        console.log("pase por el effect")
    }, [])
    const order = useSelector(state => state.ordersReducer.order)
    console.log(order) // ---------------------------- Functions ---------------------------- //

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
                                    {(order.products) ?
                                        (order.products.reduce((acum, product) => {
                                            return acum + product.Inter_Prod_Order.quantity
                                        }, 0)) : (<div> </div>)
                                    }
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