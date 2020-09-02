import React from 'react'
import ProductCard from '../../ProductCard/ProductCard';



const TotalByProduct = (props) => {
    const {product } = props
    console.log(props.product)

    return (
        <div>
            <ProductCard name={product.name} description={product.description} price={product.precio} />
            <div>
                <h5>Cantidad: {props.product.Inter_Prod_Order.quantity}</h5>
                <h4>Monto: ${props.product.Inter_Prod_Order.price}</h4>
            </div>
        </div>
    )
}
export default TotalByProduct;