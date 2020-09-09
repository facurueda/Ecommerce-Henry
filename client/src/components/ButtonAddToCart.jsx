import React from 'react'
import { Button } from 'reactstrap'
import { useSelector } from 'react-redux'
import { actionAddToCart } from '../redux/ordersActions'
import './ButtonAddToCart.css'


const ButtonAddToCart = (props) => {
    const user = useSelector(state => state.usersReducer.idUser)
    const handleChancla = () => {
        props.actionAddToCart({ idUser: user , idProduct: props.idProduct, quantity: props.quantity, price: props.price })
    }
    return (<div>
        <Button className='buttonAddToCart' onClick={handleChancla} >Añadir al carrito</Button>
    </div>)
}
const mapDispatchToProps = (dispatch) => {
    return {
        actionAddToCart: (props) => {
            dispatch(actionAddToCart(props))
        }
    }
}
export default ButtonAddToCart;

//easterEgg?