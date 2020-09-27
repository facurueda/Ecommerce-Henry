import React from 'react';
import { useDispatch } from 'react-redux';
import { actionGetProduct } from '../../../redux/productsActions';
import './ProductTable.css'

const ProductTable = (props) => {

    const { products, editProduct, deleteProduct, categories } = props;
    const dispatch = useDispatch()

    return (
        products.length > 0 ? (
            products.map(product => (
                <div className="tableContainer">
                    <div className="imageContainer">
                        <img className="productImage" src={product.images} alt="Product"></img>
                    </div>
                    <div className="nameContainer">
                        <span className="productName">{product.name}</span>
                    </div>
                    <div className="priceContainer">
                        <span>$ {product.precio}</span>
                    </div>
                    <div className="stockContainer">
                        <span>{product.stock} u.</span>
                    </div>
                    <div className="buttonContainer">
                        <button className='buttonEdit' onClick={ e => {
                            dispatch(actionGetProduct(product.idProduct))
                            editProduct()
                        }}>Edit</button> {'  '}
                        <button className='buttonEdit' onClick={e => deleteProduct(product.idProduct)}>Delete</button>
                    </div>
                </div>
            ))
        ) : (
                <span>No Products</span>
            )
    )
}

export default ProductTable;