import React from 'react'
import './ProductCard.css'
import imge from './imge/plantita.jpg'
import {
    Card, CardImg, CardText, CardBody,
} from 'reactstrap';

const ProductCard = (props) => {

    const { name, price, description } = props;

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
                    <CardImg className='image' src={imge} alt="Card image cap" />
                    <CardBody>
                        <h3 className='productName'>{name}</h3>
                        <CardText className='description'>{cutDescription(description)}</CardText>
                        <h5 className='price'>$ {price}</h5>
                    </CardBody>
                </div>
            </Card>
        </div>
    )
}

export default ProductCard;