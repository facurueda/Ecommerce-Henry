import React from 'react'
import './ProductCard.css'
import { useDispatch } from 'react-redux';
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
        setTimeout(() => {
            return history.push('/productDetail')
        }, 200)
    }

    return (
        <div className='ProductCard_Container'>
            <div className='imgProdContainer'>
            <img className='imageCard' src={images} alt="Card image cap" />
            
                {((window.location.pathname) !== '/order' && (window.location.pathname) !== '/adminOrdersTable') ?
                    (<div className= 'containerAddToCart'>
                    <button className='buttonAddProd' onClick={handleChancla}>VER MÁS</button>
                    <ButtonAddToCart className='buttonAddProd' datos={{ idProduct: idProduct, quantity: 1, price: price }} />
                    </div>)
                    : (<div></div>)
                }
            </div>
            <div className='contentCard'>
                <h3 className='productInfoName'>{name}</h3>
                 <div className='ProductDataContainer'>
                    <div className='productDiv'>
                        <b className='productInfoPrice'>${price}</b>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ProductCard;