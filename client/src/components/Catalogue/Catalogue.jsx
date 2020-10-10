import React, { useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './Catalogue.css'
import Category from './Category'
import { actionGetProducts, actionGetProductsByCategory } from '../../redux/productsActions'
import { actionGetCategories } from '../../redux/categoriesActions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import qs from 'query-string'
const Catalogue = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        if(qs.parse(window.location.search).filter){
            console.log(qs.parse(window.location.search).filter)
            if (filter !== 'All categories'){
                console.log("accion :D")
                dispatch(actionGetProductsByCategory(filter))
            }else{
                console.log("Else accion :D");
                dispatch(actionGetProducts())}
        }
        // dispatch(actionGetCategories())
        // dispatch(actionGetProducts())
    }, [])
    const filter = qs.parse(window.location.search).filter
    const [pageLimits, setPageLimits] = useState({ min: 0, max: 5 });
    const categories = useSelector(state => state.categoriesReducer.categories)
    const products = useSelector(store => store.productsReducer.products)

    // const productsFilter = (e) => {
    //     if (e !== 'All categories') {
    //         dispatch(actionGetProductsByCategory(e))
    //     } else {
    //         dispatch(actionGetProducts())
    //     }
    // }
    if (products.length === 0) {
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
            {/*<div className='categories_menu'>
                {categories.map(category => {
                    return <Category
                        className='categoryImage'
                        name={category.name}
                        productsFilter={productsFilter} />
                })
                }
                <Category className='categoryImage'
                    name={"All categories"} productsFilter={productsFilter} />
            </div>*/}
            <div className='products' > {
                products.map((product, index) => {
                    if (product.stock > 0 && index >= pageLimits.min && index <= pageLimits.max) {
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
            <div className='PagePrevNext'>
                <button className='categoryButton' onClick={() => {
                    if (pageLimits.min > 1) {
                        setPageLimits({ min: pageLimits.min - 5, max: pageLimits.max - 5 })
                    }
                }}> {'<'} </button>
                <button className='categoryButton' onClick={() => {
                    if (pageLimits.max < products.length) {
                        setPageLimits({ min: pageLimits.min + 5, max: pageLimits.max + 5 })
                    }
                }}> {'>'} </button>
            </div>
        </div>
    )
}
export default Catalogue;