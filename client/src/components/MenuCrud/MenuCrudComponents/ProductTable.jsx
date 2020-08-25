import React from 'react';
import { Table, Button } from 'reactstrap';

const ProductTable = (props) => {

    const { menuState, editProduct, deleteProduct } = props;


    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Images</th>
                </tr>
            </thead>
            <tbody>
                { menuState.length > 0 ? (
                    menuState.map(product => (
                        <tr key = {product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.images}</td>
                            <td>
                                <Button color = 'primary' onClick = {e => editProduct(product)}>Edit</Button> {'  '}
                                <Button color = 'danger' onClick = {e => deleteProduct(product.id)}>Delete</Button>
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