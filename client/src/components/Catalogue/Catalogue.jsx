import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './Catalogue.css'
import Category from './Category'
import { Button } from 'reactstrap'
import { actionGetProducts, actionGetProductsByCategory } from '../../redux/productsActions'
import { actionGetCategories } from '../../redux/categoriesActions'
import { useEffect } from 'react'
import { connect } from 'react-redux'


const Catalogue = (props) => {
    useEffect(() => {
        props.actionGetCategories()
    },[])



    const productsFilter = (e) => {
        if (e !== 'none') {
            props.actionGetProductsByCategory(e)
        } else {
            props.actionGetProducts()
        }
    }
    const { categories } = props
    if (props.categories.length === 0) {
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
            {/* <NavBar /> */}
            <div className='categories'>
                {categories.map(category => {
                    return <Category className='categoryImage' name={category.name} productsFilter={productsFilter} />

                })}
                <Button onClick={e => productsFilter('none')}>All Products</Button>
            </div>
            <div className='products'> {
                props.products.map(product => {
                    if (product.stock > 0) {
                        return <ProductCard className='productCard'
                            name={product.name}
                            description={product.description}
                            price={product.precio}
                            images={product.images} />
  }
                })
            }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.productsReducer.products,
        categories: state.categoriesReducer.categories,
        loading: state.productsReducer.loading,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actionGetProducts: () => {
            dispatch(actionGetProducts())
        },
        actionGetCategories: () => {
            dispatch(actionGetCategories())
        },
        actionGetProductsByCategory: (categoryName) => {
            dispatch(actionGetProductsByCategory(categoryName))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);