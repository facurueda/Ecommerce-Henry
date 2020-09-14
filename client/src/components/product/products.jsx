import React from 'react';
import { useSelector } from 'react-redux';
import ButtonAddToCart from '../ButtonAddToCart';
import './products.css';
import renderHTML from 'react-render-html';
import StarRating from '../starRating/starRating.js';

function Products(props) {

    const { name, description, precio, images, rating} = useSelector(state => state.productsReducer.product)

    function test() {
        return {__html: description}
    }


    return (
        <div>
            <body>
                <div className='prodCard'>
                <input type="button" value="Back" onclick="window.history.back()" /> 
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
                            <div><span className='prodPrice'> ${precio} </span></div>
                            <div className='buttons'>
                                <ButtonAddToCart />
                               
                                <button className='buyProd'>Comprar</button>
                                <div className = 'conteiner-star'>
                                <StarRating rating={rating}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}


export default Products;
