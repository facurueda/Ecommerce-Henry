import React from 'react';
import { Table, Button } from 'reactstrap';

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
                </tr>
            </thead>
            <tbody>
                { products.length > 0 ? (
                    products.map(product => (
                        <tr key = {product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{'$ '}{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.images}</td>
                            <td style={{display:'flex', flexDirection:'row'}}>
                                <Button color = 'primary' onClick = {e => editProduct(product)} style={{marginRight:'2px'}}>Edit</Button> {'  '}
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