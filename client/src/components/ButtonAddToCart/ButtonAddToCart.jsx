import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionAddToCart } from '../../redux/ordersActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './ButtonAddToCart.css'
const ButtonAddToCart = (props) => {

    toast.configure()

    const dispatch = useDispatch()
    const user = useSelector(state => state.usersReducer.idUser)
    const handleChancla = () => {
        toast("Producto Agregado al carrito", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        dispatch(actionAddToCart({ idUser: user, idProduct: props.datos.idProduct, quantity: 1, price: props.datos.price }))
    }
    return (
        <div>
            <button class="buttonAddProd" onClick={handleChancla}>
                <span className = 'spanCart'>
                AÑADIR 
                </span>
                <i class="fa fa-shopping-cart fa_custom fa-1x"></i>
            </button>
        </div>
    )
}
export default ButtonAddToCart;

//easterEgg?