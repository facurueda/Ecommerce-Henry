import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './Catalogue.css'
import Category from './Category'
import { actionGetProducts, actionGetProductsByCategory } from '../../redux/productsActions'
import { actionGetCategories } from '../../redux/categoriesActions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const Catalogue = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actionGetCategories())
        dispatch(actionGetProducts())
    }, [])
    const categories = useSelector(state => state.categoriesReducer.categories)
    const products = useSelector(store => store.productsReducer.products)
    const productsFilter = (e) => {
        if (e !== 'All categories') {
            dispatch(actionGetProductsByCategory(e))
        } else {
            dispatch(actionGetProducts())
        }
    }
    if (categories.length === 0) {
        return (
            <div>
                <div className='categories'>
                    <h3><b>Products not found</b></h3>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className='categories_menu'>
                {categories.map(category => {
                    return <Category
                        className='categoryImage'
                        name={category.name}
                        productsFilter={productsFilter} />
                })
                }
                <Category className='categoryImage'
                    name={"All categories"} productsFilter={productsFilter} />
            </div>
            <div className='products' > {
                products.map(product => {
                    if (product.stock > 0) {
                        return <ProductCard className='productCard'
                            name={product.name}
                            description={product.description}
                            price={product.precio}
                            images={product.images}
                            idProduct={product.idProduct}
                            stock={product.stock} />
                    }
                })
            }
            </div>
        </div>
    )
}
export default Catalogue;