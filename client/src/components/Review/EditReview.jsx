import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionEditReview } from '../../redux/reviewsAction';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './Review.css'

const EditReview = (props) => {
    const { modalEditReviewClose, review } = props;
    const dispatch = useDispatch()
    const [rev, setReview] = useState(review)

    const handleChange = () => {
         dispatch(actionEditReview(rev))
         modalEditReviewClose()
    }

    const handleChangeEdit = (e) => {
        const { name, value } = e.target
        setReview({
            ...rev,
            [name]: value
        })
    }

    return (
        <div className='createOrEditContainer'>
            <button className='closeButton' onClick={modalEditReviewClose}>x</button>
            <ModalHeader id='ModalHeaderContainer'>
                <div className="addProductTitle">Edit Review </div>
            </ModalHeader>
            <ModalBody id='ModalBodyContainer'>
                <input className='descriptionReview' type="text" name = 'description' onClick = {handleChangeEdit}>{rev.description}</input>
                <button className='createOrEdit' onClick={handleChange}>Editar</button>
            </ModalBody>
            <ModalFooter id='ModalFooterContainer'>
            </ModalFooter>
        </div>
    )

}
export default EditReview