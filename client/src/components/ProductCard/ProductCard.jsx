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

    const { name, price, description, idProduct, images } = props;
    const history = useHistory()
    const dispatch = useDispatch()
    const handleChancla = async () => {
        await dispatch(actionGetProduct(idProduct))
        history.push('/productDetail')
    }



    return (
        <div className='ProductCard_Container'>
            <Card className='productCard'>
                <div className='content'>
                    <CardImg className='image' src={images} alt="Card image cap" onClick={handleChancla} />
                    <CardBody>
                        <h3 className='productName'>{name}</h3>
                        <div className='ProductDataContainer'>
                            {renderHTML(description)}
                            <b className='price'>${price}</b>
                        </div>
                        {((window.location.pathname) !== '/order' && (window.location.pathname) !== '/adminOrdersTable')?
                            (< ButtonAddToCart className='buttonAddToCart' datos={{ idProduct: idProduct, quantity: 1, price: price }} />)
                        :(<div></div>)
                        }
                        </CardBody>
                </div>
            </Card>
        </div>
    )
}

export default ProductCard;