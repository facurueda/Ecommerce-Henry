import React, { useState } from 'react'
import { actionPostReview } from '../../redux/reviewsAction';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useDispatch } from 'react-redux';
import './Review.css'

const PostReview = (props) => {
    const { modalPostReviewClose, idProduct } = props;
    const [rev, setReview] = useState();
    const dispatch = useDispatch();

    const handlePostReview = () => {
        dispatch(actionPostReview(rev))
        modalPostReviewClose()
    }

    const handleChangePost = (e) => {
        setReview({
            idProduct,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className='createOrEditContainer'>
            <button className='closeButton' onClick={modalPostReviewClose}>x</button>
            <ModalHeader id='ModalHeaderContainer'>
                <div className="addProductTitle">Add your Review</div>
            </ModalHeader>
            <ModalBody id='ModalBodyContainer'>
                <input className = 'descriptionReview' type="text" name='description' onClick={handleChangePost} placeholder='Your Review' ></input>
                <button className ='createOrEdit' onClick={handlePostReview} >Crear review</button>
            </ModalBody>
            <ModalFooter id='ModalFooterContainer'>
            </ModalFooter>
        </div>
    )
}
export default PostReview
