import React, { useState } from 'react'
import { actionGetReviews, actionPostReview } from '../../redux/reviewsAction';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useDispatch } from 'react-redux';
import './Review.css'
import StarRating from '../starRating/starRating';
import { actionGetProduct, actionSetProduct } from '../../redux/productsActions';
import { useHistory } from 'react-router';

const PostReview = (props) => {
    const { modalPostReviewClose, idProduct, reload} = props;
    const history = useHistory()
    const [rating] = useState(0)
    const [rev, setReview] = useState({});
    const dispatch = useDispatch();
    const handlePostReview = () => {
        dispatch(actionPostReview(rev))
        modalPostReviewClose()
        reload()
    }
    const handleChangePost = (e) => {
        const {name, value} = e.target
        setReview({
            ...rev,
            idProduct,
            [name]: value
        })
    }
    return (
        <div className='createOrEditContainer'>
            <button className='closeButton' onClick={modalPostReviewClose}>x</button>
            <ModalHeader id='ModalHeaderContainer'>
                <div className="addProductTitle">Add your Review</div>
            </ModalHeader>
            <ModalBody id='ModalBodyContainer'>
            <StarRating rat={rating} setRat={handleChangePost} />
                <input className='descriptionReview' type="text" name='description' onChange={handleChangePost} placeholder='Your Review' ></input>
                <button className='createOrEdit' onClick={handlePostReview} >Crear review</button>
            </ModalBody>
            <ModalFooter id='ModalFooterContainer'>
            </ModalFooter>
        </div>
    )
}
export default PostReview
