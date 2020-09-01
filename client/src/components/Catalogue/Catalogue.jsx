import React, { useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './Catalogue.css'
import Category from './Category'
import { Button } from 'reactstrap'
import { actionGetProducts } from '../../redux/productsActions'
import { actionGetCategories } from '../../redux/categoriesActions'
import { useEffect } from 'react'
import { connect } from 'react-redux'


const Catalogue = (props) => {



    useEffect(() => {
        if (props.products.length < 1) {
            props.actionGetProducts()
        }
        if (props.categories.length < 1) {
            props.actionGetCategories()
        }
    })

    const categoryData = props.categories

    const [allProducts, setAllProducts] = useState(props.products)
    console.log(allProducts)

    const productsFilter = (e) => {
        if (e !== 'none') {
            setAllProducts(allProducts.filter(product => (product.category === e))
            )
        }
    }
    const { products, categories } = props
    console.log(products)

    /* por props recibo un array de productos: products */

    return (
        <div>
            <div className='categories'>
                {categoryData.map(category => {
                    return <Category className='categoryImage'
                        name={category.name} productsFilter={productsFilter} />
                })}
                <Button onClick={e => productsFilter('none')}>All Products</Button>
            </div>
            <div className='products'> {products.map(product => {
                return <ProductCard className='productCard' name={product.name} description={product.description} price={product.price}
                // image = {product.image}
                />
            })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.productsReducer.products,
        categories: state.categoriesReducer.categories
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actionGetProducts: () => {
            dispatch(actionGetProducts())
        },
        actionGetCategories: () => {
            dispatch(actionGetCategories())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);