import React from 'react'
import '../ColorStyles.css'
import {
    Card, CardImg, CardText, CardBody,
  } from 'reactstrap';

const ProductCard = (props) => {

    const {image, name, price, description} = props;

    const cutDescription = (description) => {
        if (description.length > 80){
            return (description.substring(0,80)+'...')
        }
        return description;
    }

    return (
        <div>
            <Card className = 'productCard'>
                <CardImg className = 'cardImg' top width="100%" src={image} alt="Card image cap"/>
                <CardBody>
                <h3 className = 'productName'>{name}</h3>
                <CardText className = 'description'>{cutDescription(description)}</CardText>
                <h5 className = 'price'>$ {price}</h5>
                </CardBody>
            </Card>
        </div>
    )
}

export default ProductCard;