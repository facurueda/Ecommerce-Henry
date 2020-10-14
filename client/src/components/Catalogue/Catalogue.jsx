import React, { useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './Catalogue.css'
import { actionGetProducts, actionGetProductsByCategory } from '../../redux/productsActions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import qs from 'query-string'
const Catalogue = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (qs.parse(window.location.search).filter) {
            console.log(qs.parse(window.location.search).filter)
            if (filter !== 'All categories') {
                console.log("accion :D")
                dispatch(actionGetProductsByCategory(filter))
            } else {
                console.log("Else accion :D");
                dispatch(actionGetProducts())
            }
        }
    }, [])
    const filter = qs.parse(window.location.search).filter
    const [pageLimits, setPageLimits] = useState({ min: 0, max: 5 });
    const products = useSelector(store => store.productsReducer.products)

    if (products.length === 0) {
        return (
            <div>
                <div className='NotFoundProd'>
                    <h3><b>No existen productos aun</b></h3>
                </div>
            </div>
        )
    }
    return (
        <div>
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
            {(pageLimits.min > 1) ? (<button id='menorque' className='buttonEndOrden' onClick={() => {
                        setPageLimits({ min: pageLimits.min - 5, max: pageLimits.max - 5 })
                }}> {'<'} </button>) : (<div></div>)}
                {    (pageLimits.max < products.length) ? (<button id='mayorque' className='buttonEndOrden' onClick={() => {
                            setPageLimits({ min: pageLimits.min + 5, max: pageLimits.max + 5 })
                    }}> {'>'} </button>) : (<div></div>)
                }
            </div>
        </div>
    )
}
export default Catalogue;