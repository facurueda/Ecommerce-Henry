import React from 'react';
import { Table, Button } from 'reactstrap';
import './ProductTable.css'
import logo1 from '../../product/images/1.jpeg'
import logo2 from '../../product/images/2.jpeg'

const ProductTable = (props) => {

    const products = [{
        id: 12,
        images: logo1,
        name: "Bicicleta",
        description: "dskajhasdkjasd",
        precio: 4500,
        stock: 74,
        categories: 'Bicicletas'
    },
    {
        id: 2,
        images: logo2,
        name: "Bicicleta",
        description: "dskajhasdkjasd",
        precio: 4500,
        stock: 74,
        categories: 'Bicicletas'
    }]

    // const { products, editProduct, deleteProduct } = props;
    const {editProduct, deleteProduct } = props;

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
                        <Button color = 'primary' onClick = {e => editProduct(product)}>Edit</Button> {'  '}
                        <Button color = 'danger' onClick = {e => deleteProduct(product.idProduct)}>Delete</Button>
                    </div>
                </div>
            ))
        ) : (
            <span>No Products</span>
        )
        

        // <Table>
        //     <thead> 
        //             <th>Images</th>
        //             <th>Name</th>
        //             {/* <th>Description</th> */}
        //             <th>Price</th>
        //             <th>Stock</th>
        //             <th>Categories</th>
        //             <th></th>
        //     </thead>
        //     <div className="separator"></div>
        //     <tbody>
        //         { products.length > 0 ? (
        //             products.map(product => (
        //                 <tr key = {product.id} className="productBody">
        //                     <td> <img src= {product.images} alt="Product"></img> </td>

        //                     <td>{product.name}</td>
        //                     {/* <td > <div dangerouslySetInnerHTML={{ __html: product.description }} /></td> */}
        //                     <td>{'$ '}{product.precio}</td>
        //                     <td>{product.stock}</td>
        //                     <td> {product.categories} </td>
        //                     <td className= 'buttons'>
        //                         <Button color = 'primary' onClick = {e => editProduct(product)}>Edit</Button> {'  '}
        //                         <Button color = 'danger' onClick = {e => deleteProduct(product.idProduct)}>Delete</Button>
        //                     </td>
        //                 </tr>
        //             ))):(
        //                 <tr>
        //                     <td>No productos</td>
        //                 </tr>
        //             )}
        //     </tbody>
        // </Table>
    )
}

export default ProductTable;