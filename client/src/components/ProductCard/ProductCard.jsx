import React from 'react'
import './ProductCard.css'
import {
    Card, CardImg, CardText, CardBody,
} from 'reactstrap';
import ButtonAddToCart from '../ButtonAddToCart';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router'
import { actionGetProduct } from '../../redux/productsActions';
import renderHTML from 'react-render-html';

const ProductCard = (props) => {

    const { name, price, description, idProduct, images, stock } = props;
    const history = useHistory()
    const dispatch = useDispatch()
    const handleChancla = async () => {
        await dispatch(actionGetProduct(idProduct))
        history.push('/productDetail')
    }



    return (
        <div className='ProductCard_Container'>
                <div className='content'>
                    <img className='imageCard' src={images} alt="Card image cap" onClick={handleChancla} />
                    <div className='contentCard'>
                        <h3 className='productName'>{name}</h3>
                        <div className='ProductDataContainer'>
                            <div className='ProductDescription'>{renderHTML(description)}</div>
                            <div className= 'productDiv'>
                                <b className='productPrice'>${price}</b>
                                <p className = 'productStock'>U: {stock}</p>
                            </div>
                        </div>
                        {((window.location.pathname) !== '/order' && (window.location.pathname) !== '/adminOrdersTable')?
                            (< ButtonAddToCart className='buttonAddToCart' datos={{ idProduct: idProduct, quantity: 1, price: price }} />)
                        :(<div></div>)
                        }
                        </div>
                </div>
        </div>
    )
}

export default ProductCard;