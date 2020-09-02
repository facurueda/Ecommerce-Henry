import React from 'react'
import ProductCard from '../../ProductCard/ProductCard';



const TotalByProduct = (props) => {

    return (
        <div>
            <ProductCard />
            <div>
                <h5>{props.cantidades.filter} cantidad de X product</h5>
                <h4>suma del precio de X product</h4>
            </div>
        </div>
    )
}
export default TotalByProduct;