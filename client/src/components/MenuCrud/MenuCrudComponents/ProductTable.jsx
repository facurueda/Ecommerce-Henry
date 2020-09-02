import React from 'react';
import { Table, Button } from 'reactstrap';
import './ProductTable.css'

const ProductTable = (props) => {

    const { products, editProduct, deleteProduct } = props;

    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Images</th>
                    <th>Categories</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { products.length > 0 ? (
                    products.map(product => (
                        <tr key = {product.id}>
                            <td>{product.name}</td>
                            <td > <div dangerouslySetInnerHTML={{ __html: product.description }} /></td>
                            <td>{'$ '}{product.precio}</td>
                            <td>{product.stock}</td>
                            <td> <img src= {product.images}></img> </td>
                            <td> {product.categories} </td>
                            <td className= 'buttons'>
                                <Button color = 'primary' onClick = {e => editProduct(product)}>Edit</Button> {'  '}
                                <Button color = 'danger' onClick = {e => deleteProduct(product.idProduct)}>Delete</Button>
                            </td>
                        </tr>
                    ))):(
                        <tr>
                            <td>No productos</td>
                        </tr>
                    )}
            </tbody>
        </Table>
    )
}

export default ProductTable;