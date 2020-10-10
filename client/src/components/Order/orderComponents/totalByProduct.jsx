import React, { useState } from 'react'
import "./totalByProduct.css"
import { useDispatch, useSelector } from 'react-redux';
import { actionAddToCart, actionGetOrder } from '../../../redux/ordersActions';

const TotalByProduct = (props) => {

    const user = useSelector(store => store.usersReducer.idUser)
    const dispatch = useDispatch()

    const [product, setProduct] = useState(props.product)
    const [quantity, setQuantity] = useState(product.Inter_Prod_Order.quantity)
    const [price, setPrice] = useState(product.Inter_Prod_Order.price)

    const btnRestar = (number) => {
        if (quantity >= 1) {
            dispatch(actionAddToCart({ idUser: user, idProduct: props.product.idProduct, quantity: 0 - number, price: props.product.price }))
            dispatch(actionGetOrder(user))
            setPrice(product.Inter_Prod_Order.price * quantity)
            setQuantity(quantity - number)
        }
    }
    return (
        <div class="table-responsive">
            <table class="table">
                <thead className='headProd'>
                    <tr>
                        <th className='prodImgCol' scope="col">PRODUCTO</th>
                        <th scope="col">PRECIO</th>
                        <th scope="col">CANTIDAD</th>
                        <th scope="col">TOTAL</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className = 'imgProdCont'><img className='productImage' src={product.images}/>{product.name}</td>

                        <td className='textContent'>$  {product.Inter_Prod_Order.price }</td>
                        <td className='quantityButton'><button className='deleteButton' onClick={e => btnRestar(+1)}>-</button><p className='quantity'>{quantity}</p><button className='deleteButton' onClick={e => btnRestar(-1)}>+</button></td>
                        <td className='textContent'>$  {product.Inter_Prod_Order.price * quantity}</td>
                        <td className='buttonContainer'>
                            <button className='buttonTrash' onClick={e => btnRestar(product.Inter_Prod_Order.quantity)} ><i class="far fa-trash-alt"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default TotalByProduct;