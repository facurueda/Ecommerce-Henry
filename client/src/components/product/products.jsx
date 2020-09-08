import React from 'react';
import StarRating from '../starRating/starRating'

import logo from './images/1.jpeg'
import logo1 from './images/2.jpeg'
import logo2 from './images/3.jpeg'
import logo3 from './images/4.jpeg'
import NavBar from '../NavBar/navBar';
import ButtonAddToCart from '../ButtonAddToCart';

function Products(props) {

    const { name, description, precio, stock } = props;
    const setStock = 0

    return (
        <div className='prodCard'>
            <NavBar />
            <div>
                <img className='imageProd' src={logo} alt="..." />
            </div>
            <div>
                <title className='nameProd'>
                    {name}
                </title>
                <span className='descriptionProd'>{description}</span>
                <span className='precioProd'>{precio}</span>
                <span className='stockProd'>{stock}</span>
                <ButtonAddToCart props={{ idProduct: props.idProduct, quantity: 1, price: precio }} />
                <button className='buyProd'>Comprar</button>
            </div>
        </div>
    )
}


export default Products;
