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
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.length > 0 ? (
                    products.map(product => (
                    <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.images}</td>
                    <td>
                       <Button 
                        color="primary"
                        onClick={() => editProduct(product)}
                        >Edit</Button>{" "}
                        <Button 
                        color="danger"
                        onClick={() => deleteProduct(product.id)}
                        >Delete</Button>
                    </td>
                    </tr>))
                    ):(
                    <tr>
                        <td>No Categories</td>
                    </tr>
                    )}
            </tbody>
        </Table>
    )

}

export default ProductTable;