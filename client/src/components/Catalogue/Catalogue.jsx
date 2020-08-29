import React, { useState }  from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './Catalogue.css'
import Category from './Category'
import { Button } from 'reactstrap'


const Catalogue = (props) => {

    const products = [
         { name: 'Buzo GAP', description: 'red', price: 204, category: 'Galletitas' },
         { name: 'Buzo ADIDAS', description: 'blue', price: 20, category: 'Billeteras' },
         { name: 'Buzo NIKE', description: 'pink', price: 2058 }
     ]
    const categoryData = [
        { name: 'Pantalones' },
        { name: 'Galletitas' },
        { name: 'Billeteras' }
    ]

    const [ allProducts, setAllProducts ] = useState(products)

    const productsFilter = (e) => {
        if(e !== 'none'){
            setAllProducts(
                products.filter(product => (product.category === e))
        )} else {
            setAllProducts(products)
        }
    }


    
    // const { products , categories } = props

    /* por props recibo un array de productos: products */

    return (
        <div>
            <div className = 'categories'>
                {categoryData.map(category => {
                    return <Category className = 'categoryImage'
                    name = {category.name} productsFilter = {productsFilter} />
                })} 
                <Button style = { { 
                    borderStyle:'none',
                    width: '300px'
                } } onClick = { e=> productsFilter('none')}>All Products</Button>
            </div>
            <div className = 'products'> {allProducts.map(product => { 
            return <ProductCard className = 'productCard'
            name = {product.name} 
            description = {product.description} 
            price = {product.price}
            // image = {product.image}
            />})}
            </div>
        </div>
    )
}

export default Catalogue;