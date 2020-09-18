import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonAddToCart from '../ButtonAddToCart';
import './products.css';
import renderHTML from 'react-render-html';
import Review from '../Review/Review'
import { actionGetReviews } from '../../redux/reviewsAction';

function Products(props) {

    const { idProduct, name, description, precio, images, stock } = useSelector(store => store.productsReducer.product)

    function test() {
        return {__html: description}
    }

    const dispatch = useDispatch();
    const reviewFinder = () => {
        dispatch(actionGetReviews(idProduct))
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
                            <Review />
                        </div>
                        <div className='prodComp3'>
                            <span className='prodPrice'>Precio: ${precio} </span>
                            <p className='prodStock'>Unidades disponibles: {stock}</p>
                            <div className='buttons'>
                                <ButtonAddToCart datos={{ idProduct: idProduct, quantity: 1, price: precio }}/>
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
