import React from 'react';
import { Table, Button } from 'reactstrap';
import './ProductTable.css'
import logo1 from '../../product/images/1.jpeg'
import logo2 from '../../product/images/2.jpeg'

const ProductTable = (props) => {

    const { products, editProduct, deleteProduct } = props;

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
                    <div className="categoriesContainer">
                        <span>{product.categories}</span>
                    </div>
                    <div className="buttonContainer">
                        <button className= 'editProduct' onClick = {e => editProduct(product)}>Edit</button> {'  '}
                        <button className= 'deleteProduct'onClick = {e => deleteProduct(product.idProduct)}>Delete</button>
                    </div>
                </div>
            ))
        ) : (
            <span>No Products</span>
        )
    )
}

export default ProductTable;