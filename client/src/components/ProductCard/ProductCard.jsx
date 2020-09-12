import React from 'react'
import './ProductCard.css'
import {
    Card, CardImg, CardText, CardBody,
} from 'reactstrap';
import ButtonAddToCart from '../ButtonAddToCart';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router'
import {actionGetProduct} from '../../redux/productsActions';
import renderHTML from 'react-render-html';

const ProductCard = (props) => {

    const { name, price, description, idProduct, images } = props;
    const history = useHistory()

    // const cutDescription = (description) => {
    //     // let aux = description.replace('</p>', '')
    //     // let descriptionAux = aux.replace('<p>', '')
    //     if (description.length > 80) {
    //         return (description.substring(0, 80) + '...')
    //     }
    //     return description;
    // }
    const dispatch = useDispatch()
    const handleChancla = async() => {
        await dispatch(actionGetProduct(idProduct))
        history.push('/productDetail')
    }

    return (
        <div className='ProductCard_Container'>
            <Card className='productCard'>
                <div className='content'>
                        <CardImg className='image' src={images} alt="Card image cap" onClick={handleChancla}/>
                    <CardBody>
                        <h3 className='productName'>{name}</h3>
                        <div className='ProductDataContainer'>
                            {renderHTML(description)}
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