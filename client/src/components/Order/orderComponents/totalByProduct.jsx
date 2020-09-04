import React from 'react'
import ProductCard from '../../ProductCard/ProductCard';
import "./totalByProduct.css"



const TotalByProduct = (props) => {
    const {product } = props
    console.log(props.product)

    return (
        <div className="ProductContainer">
            <ProductCard name={product.name} description={product.description} price={product.precio} className="card"/>
            <div className="textContent">
                <span className="textQuantity">Cantidad: {props.product.Inter_Prod_Order.quantity}</span>
                <span className="textAmount">Monto: ${props.product.Inter_Prod_Order.price}</span>
            </div>
        </div>
    )
}
export default TotalByProduct;