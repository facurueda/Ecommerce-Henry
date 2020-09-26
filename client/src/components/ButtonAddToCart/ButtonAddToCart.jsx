import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionAddToCart } from '../../redux/ordersActions'
import './ButtonAddToCart.css'

const ButtonAddToCart = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.usersReducer.idUser)


    const handleChancla = () => {
            dispatch(actionAddToCart({ idUser: user, idProduct: props.datos.idProduct, quantity: 1, price: props.datos.price }))
            console.log('ping')
    }
    return (<div>
        <button class="cart noselect" onClick={handleChancla}><span>
            Add to Cart</span>
            <i class="fa fa-shopping-cart fa_custom fa-1x"></i></button>
    </div>)
}
export default ButtonAddToCart;

//easterEgg?