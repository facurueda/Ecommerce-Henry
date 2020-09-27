import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionEditReview } from '../../redux/reviewsAction';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './Review.css'
import StarRating from '../starRating/starRating';

const EditReview = (props) => {
    const { modalEditReviewClose, review } = props;
    const dispatch = useDispatch()
    const [rev, setReview] = useState(review)
    const [rating,setRating] = useState(review.rating)
    const handleChange = () => {
         dispatch(actionEditReview(rev))
         modalEditReviewClose()
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
            <button className='closeButton' onClick={modalEditReviewClose}>x</button>
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