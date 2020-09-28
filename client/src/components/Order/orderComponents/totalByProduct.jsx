import React, { useState } from 'react'
import "./totalByProduct.css"
import renderHTML from 'react-render-html';
import { useDispatch, useSelector } from 'react-redux';
import { actionAddToCart, actionGetOrder } from '../../../redux/ordersActions';

const TotalByProduct = (props) => {
    const user = useSelector(store => store.usersReducer.idUser)
    const [product,setProduct] = useState(props.product)
    const [quantity, setQuantity] = useState(product.Inter_Prod_Order.quantity)
    const [price, setPrice] = useState(product.Inter_Prod_Order.price * product.Inter_Prod_Order.quantity)
    const dispatch = useDispatch()
    const btnRestar = (number) => {
        if (quantity >=1){
        dispatch(actionAddToCart({ idUser: user, idProduct: props.product.idProduct, quantity: 0-number, price: props.product.price }))
        dispatch(actionGetOrder(user))
        setPrice(product.Inter_Prod_Order.price * quantity)
        setQuantity(quantity-number)
        }
    }

    return (
        <div className = "ProductContainer">
            <button className = 'DeleteProd' onClick = { e => btnRestar(product.Inter_Prod_Order.quantity) }>x</button>
            <div className = 'cardContainer' >
                <div className = 'imgContainer' >
                    <img className = 'ProductImage' src = {product.images} />
                </div>
                <div className = 'descriptionContainer' >
                    <h3 className = 'productInfoName' >{product.name} </h3>
                    <h3 className = 'productInfo' >{renderHTML(product.description)} </h3>
                    <h3 className = 'productInfo' >{product.price} </h3>
                </div>
            </div>
            <div className="textContent">
                <span className="textQuantity">Cantidad: {quantity}<span><button className='buttonRestar' onClick={e => btnRestar(-1)}>-</button></span> </span>
                <span className="textAmount">Total: ${price}</span>
            </div>
        </div>
    )
}
export default TotalByProduct;