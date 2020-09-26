import React from 'react'
import './ProductsBySearchTerm.css'
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';


const ProductsBySearchTerm = (props) => {
    const products = useSelector(state =>  state.productsReducer.term)

    if (products.length === 0) {
        return (
            <div className='notFoundTerm'>
                <h3> No se encontraron resultados. </h3>
            </div>
        )
    }
    console.log('term: ',products)

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