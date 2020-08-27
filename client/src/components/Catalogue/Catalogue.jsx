import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './Catalogue.css'

const Catalogue = (props) => {

     const products = [
         { name: 'Buzo GAP', description: 'red', price: 204 },
         { name: 'Buzo ADIDAS', description: 'blue', price: 20 },
         { name: 'Buzo NIKE', description: 'pink', price: 2058 }
     ]
    // const { products } = props

    /* por props recibo un array de productos: products */

    return <div className= 'products'> {products.map(product => { 
        return <ProductCard className = 'productCard'
        name = {product.name} 
        description = {product.description} 
        price = {product.price}
        />})}
    </div>
}

export default Catalogue;