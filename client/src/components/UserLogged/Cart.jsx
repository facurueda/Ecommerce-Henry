import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetOrder } from '../../redux/ordersActions'
import CartImg from '../NavBar/Images/Cart.png'

const Cart = () => {
    const user = useSelector(state => state.usersReducer.idUser)
    const quantity = useSelector(store => store.ordersReducer.quantity)
    const dispatch = useDispatch()
    useEffect(async () => {
        dispatch(actionGetOrder(user));
    },[])

    return (
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a href='/order'>
                <img className='buttonCart' src={CartImg} alt='Cart' />
            </a>
            <div className='quantityProducts'>
                {quantity}
            </div>
            <a class="dropdown-item" href="/Admin">My Account</a>
            <a class="dropdown-item" href="#">Log out</a>
        </div>
    )
}

export default Cart