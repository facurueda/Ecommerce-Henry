import React from 'react';
import { useSelector } from 'react-redux';
import ButtonAddToCart from '../ButtonAddToCart';
import './products.css';
import renderHTML from 'react-render-html';

function Products(props) {

    const { idProduct, name, description, precio, images } = useSelector(state => state.productsReducer.product)

    function test() {
        return {__html: description}
    }


    return (
        <div>
            <body>
                <div className='prodCard'>
                    <div id='hover-img'>
                        <div className='card overflow-hidde'>
                            <img className="img-fluid" src={images} alt="..." />
                        </div>
                    </div>
                    <div className='prodComp1'>
                        <div className='prodComp2'>
                            <h1 className='prodName'>{name}</h1>
                            <div>
                            <div className='prodDescription' dangerouslySetInnerHTML = {test()}/>
                            </div>
                        </div>
                        <div className='prodComp3'>
                            <span className='prodPrice'>${precio} </span>
                            <div className='buttons'>
                                <ButtonAddToCart props={{ idProduct, quantity: 1, precio }}/>
                                <button className='buyProd'>Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}


export default Products;
