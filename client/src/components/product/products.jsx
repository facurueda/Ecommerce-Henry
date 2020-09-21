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
        return { __html: description }
    }

    const dispatch = useDispatch();
    const reviewFinder = () => {
        dispatch(actionGetReviews(idProduct))
        return <Review />
    }

    return (
        <div>
            <body>
                <div className='prodCard'>
                    <div id='hover-img'>
                        <img className="img-fluid" src={images} alt="..." />
                    </div>
                    <div className='prodComp1'>
                        <div className='prodComp2'>

                            <div className='TitlesContainer'>
                                <h1 className='prodName'>{name}</h1>
                                <div className='prodDescription' dangerouslySetInnerHTML={test()} />

                            </div>
                            <div>{reviewFinder()}</div>
                        </div>
                        <div className='prodComp3'>
                            <div className='priceAndStockContainer'>
                                <span className='prodPrice'>${precio} </span>
                                <p className='prodStock'>Unidades disponibles: {stock}</p>
                            </div>
                            <div className='buttons'>
                                <ButtonAddToCart datos={{ idProduct: idProduct, quantity: 1, price: precio }} />
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
