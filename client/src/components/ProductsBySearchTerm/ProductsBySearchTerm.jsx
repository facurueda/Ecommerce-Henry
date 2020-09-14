import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actionGetProductsBySearchTerm } from '../../redux/productsActions';
import ProductCard from '../ProductCard/ProductCard';


const ProductsBySearchTerm = (props) => {
    const products = useSelector(state =>  state.productsReducer.term)

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