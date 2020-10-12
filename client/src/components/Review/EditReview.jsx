import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionEditReview, actionGetReviews } from '../../redux/reviewsAction';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './Review.css'
import StarRating from '../starRating/starRating';
import { actionGetProduct, actionSetProduct } from '../../redux/productsActions';
import { useHistory } from 'react-router';

const EditReview = (props) => {
    const { modalEditReviewClose, review, idProduct, reload } = props;
    const history = useHistory()
    const dispatch = useDispatch()
    const [rev, setReview] = useState(review)
    const [rating,setRating] = useState(review.rating)
    const handleChange = () => {
         dispatch(actionEditReview(rev))
         modalEditReviewClose()
         reload()
    }
    const handleChangeEdit = (e) => {
        const { name, value } = e.target
        setReview({
            ...rev,
            ...rating,
            idProduct: props.idProduct,
            [name]: value
        })
        if ([name] === 'rating'){
            setRating(value)
        }
    }
    return (
        <div className='createOrEditContainer'>
            <button className='closeButton' onClick={modalEditReviewClose}>
            <i class="fas fa-times"></i>
            </button>
            <ModalHeader id='ModalHeaderContainer'>
                <div className="addProductTitle">Edit Review </div>
            </ModalHeader>
            <ModalBody id='ModalBodyContainer'>
            <StarRating rat={rating} setRat={handleChangeEdit} />
                <input className='descriptionReview' type="text" name ='description' onChange= {handleChangeEdit} value={rev.description}></input>
                <button className='createOrEdit' onClick={handleChange}>Editar</button>
            </ModalBody>
            <ModalFooter id='ModalFooterContainer'>
            </ModalFooter>
        </div>
    )

}
export default EditReview