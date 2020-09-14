import React from 'react'
import ProductCard from '../../ProductCard/ProductCard';
import "./totalByProduct.css"
import renderHTML from 'react-render-html';

const TotalByProduct = (props) => {
    const {product } = props
    console.log(props.product)

    return (
        <div className = "ProductContainer">
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
                <span className="textQuantity">Cantidad: {props.product.Inter_Prod_Order.quantity}</span>
                <span className="textAmount">Monto: ${props.product.Inter_Prod_Order.price * props.product.Inter_Prod_Order.quantity}</span>
            </div>
        </div>
    )
}
export default TotalByProduct;