import React from 'react'
import './ProductCard.css'
import imge from './imge/plantita.jpg'
import {
    Card, CardImg, CardText, CardBody,
} from 'reactstrap';
import ButtonAddToCart from '../ButtonAddToCart';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router'
import {actionGetProduct} from '../../redux/productsActions'

const ProductCard = (props) => {

    const { name, price, description, idProduct } = props;
    const history = useHistory()

    const cutDescription = (description) => {
        if (description.length > 80) {
            return (description.substring(0, 80) + '...')
        }
        return description;
    }
    const dispatch = useDispatch()
    const handleChancla = () => {
        console.log(idProduct)
        dispatch(actionGetProduct(idProduct))
        history.push('/productDetail')
    }

    return (
        <div className='ProductCard_Container'>
            <Card className='productCard'>
                <div className='content'>
                        <CardImg className='image' src={imge} alt="Card image cap" onClick={handleChancla}/>
                    <CardBody>
                        <h3 className='productName'>{name}</h3>
                        <div className='ProductDataContainer'>
                            <CardText className='description'>{cutDescription(description)}</CardText>
                            <b className='price'>${price}</b>
                        </div>
                        <ButtonAddToCart props={{ idProduct, quantity: 1, price }} />
                    </CardBody>
                </div>
            </Card>
        </div>
    )
}

export default ProductCard;