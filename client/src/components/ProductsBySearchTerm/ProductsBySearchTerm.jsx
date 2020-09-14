import React from 'react'
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';


const ProductsBySearchTerm = (props) => {
    const products = useSelector(state =>  state.productsReducer.term)

    if (products.length === 0) {
        return (
            <div>
                <h3> WTF ese producto ?</h3>
            </div>
        )
        
    } 

    return (
        <div>
            <div className='products'> {
                products.map(product => {
                    if (product.stock > 0) {
                        return <ProductCard 
                            className='productCard'
                            name={product.name}
                            description={product.description}
                            price={product.precio} 
                            images = {product.images}
                        />
                    }
                })
            }
            </div>
        </div>
    )
}

export default ProductsBySearchTerm