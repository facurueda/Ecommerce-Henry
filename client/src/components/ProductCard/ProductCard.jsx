import React from 'react'
import './ProductCard.css'
import imge from './imge/plantita.jpg'
import {
    Card, CardImg, CardText, CardBody,
} from 'reactstrap';
import ButtonAddToCart from '../ButtonAddToCart';

const ProductCard = (props) => {

    const { name, price, description, idProduct } = props;

    const cutDescription = (description) => {
        if (description.length > 80) {
            return (description.substring(0, 80) + '...')
        }
        return description;
    }

    return (
        <div className='ProductCard_Container'>
            <Card className='productCard'>
                <div className='content'>
                    <a className='imgStyle' href='/products/:id'>
                        <CardImg className='image' src={imge} alt="Card image cap" />
                    </a>
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