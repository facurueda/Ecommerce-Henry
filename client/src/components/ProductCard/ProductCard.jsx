import React from 'react'
import './ProductCard.css'
import {
    Card, CardImg, CardText, CardBody,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import { actionGetProduct, actionSetProduct } from '../../redux/productsActions';
import renderHTML from 'react-render-html';
import { actionGetReviews, actionSetReview } from '../../redux/reviewsAction';
import ButtonAddToCart from '../ButtonAddToCart/ButtonAddToCart';

const ProductCard = (props) => {

    const { name, price, description, idProduct, images, stock } = props;
    const history = useHistory()
    const dispatch = useDispatch()
    const handleChancla = async () => {
        dispatch(actionGetProduct(idProduct))
        dispatch(actionGetReviews(idProduct))
        dispatch(actionSetProduct({ name, price, description, idProduct, images, stock }))
        setTimeout(()=>{
            return history.push('/productDetail')
        },200)
    }



    return (
        <div className='ProductCard_Container'>
                <div className='content'>
                    <img className='imageCard' src={images} alt="Card image cap" onClick={handleChancla} />
                    <div className='contentCard'>
                        <h3 className='productName'>{name}</h3>
                        <div className='ProductDataContainer'>
                            <div className='ProductDescription'>{renderHTML(description.slice(0,10))}</div>
                            <div className= 'productDiv'>
                                <b className='productPrice'>${price}</b>
                                <p className = 'productStock'>U: {stock}</p>
                            </div>
                        </div>
                        {((window.location.pathname) !== '/order' && (window.location.pathname) !== '/adminOrdersTable')?
                            (<ButtonAddToCart className='buttonAddToCart' datos={{ idProduct: idProduct, quantity: 1, price: price }} />)
                        :(<div></div>)
                        }
                        </div>
                </div>
        </div>
    )
}

export default ProductCard;