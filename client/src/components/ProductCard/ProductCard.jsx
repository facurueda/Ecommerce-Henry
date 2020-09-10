import React from 'react'
import './ProductCard.css'
import imge from './imge/plantita.jpg'
import {
    Card, CardImg, CardText, CardBody, Row,
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
        <div>
            <Card className='productCard'>
                <div className='content'>
                <a href='/products/:id'>
                    <CardImg className='image' src={imge} alt="Card image cap" />
                    </a>
                    <CardBody>
                        <h3 className='productName'>{name}</h3>
                        <CardText className='description'>{cutDescription(description)}</CardText>
                        <div style={{display: "flex", flexDirection: "row",justifyContent: "flex-end"}}><h3><b>$ {price}</b></h3><ButtonAddToCart props={{ idProduct, quantity: 1, price }} /><h5 className='price'></h5></div>
                    </CardBody>
                </div>
            </Card>
        </div>
    )
}

export default ProductCard;