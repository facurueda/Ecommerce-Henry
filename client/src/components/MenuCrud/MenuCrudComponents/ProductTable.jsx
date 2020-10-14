import React from 'react';
import { useDispatch } from 'react-redux';
import { actionDeleteProduct, actionGetProduct } from '../../../redux/productsActions';
import './ProductTable.css'

const ProductTable = (props) => {
    const { products, editProduct } = props;
    const dispatch = useDispatch()
    return (
        products.map(product => {
            return (
                <div class="table-responsive">
                    <table class="table">
                        <thead className='headProd'>
                            <tr>
                                <th className='prodImgCol' scope="col">PRODUCTO</th>
                                <th scope="col">PRECIO</th>
                                <th scope="col">STOCK</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='imgProdCont'><img className='productImage' src={product.images} />{product.name}</td>

                                <td className='textContent'>$  {product.precio}</td>
                                <td className='quantityButton'><p className='quantity'>{product.stock}</p></td>
                                {/* <td className='quantityButton'><button className='deleteButton' onClick={e => btnRestar(+1)}>-</button><p className='quantity'>{product.stock}</p><button className='deleteButton' onClick={e => btnRestar(-1)}>+</button></td> */}
                                <td className='buttonContainer'>
                                    <div className="buttonContainer">
                                        <button type="button" className='buttonEditCat' onClick={e => {
                                            dispatch(actionGetProduct(product.idProduct))
                                            editProduct()
                                        }}>Edit</button> {'  '}
                                        <button type="button" className='buttonEditCat' onClick={e => { dispatch(actionDeleteProduct(product.idProduct)) }}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        })


        //     products.length > 0 ? (
        //         products.map(product => (
        //             <div className="tableContainer">
        //                 <div className="imageContainer">
        //                     <img className="productImage" src={product.images} alt="Product"></img>
        //                 </div>
        //                 <div className="nameContainer">
        //                     <span className="productName">{product.name}</span>
        //                 </div>
        //                 <div className="priceContainer">
        //                     <span>$ {product.precio}</span>
        //                 </div>
        //                 <div className="stockContainer">
        //                     <span>{product.stock} u.</span>
        //                 </div>
        //                 <div className="buttonContainer">
        //                     <button className='buttonEdit' onClick={e => {
        //                         dispatch(actionGetProduct(product.idProduct))
        //                         editProduct()
        //                     }}>Edit</button> {'  '}
        //                     <button className='buttonEdit' onClick={e => deleteProduct(product.idProduct)}>Delete</button>
        //                 </div>
        //             </div>
        //         ))
        //     ) : (
        //             <span>No Products</span>
        //         )
        // )
    )
}

export default ProductTable;