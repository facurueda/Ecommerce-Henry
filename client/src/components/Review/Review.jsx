import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Review.css'
import stars from './StarsSwitch.jsx'

const Review = () => {
    const dispatch = useDispatch()
    const review = useSelector(state => state.reviewsReducer.review)
    const reviews = useSelector(state => state.reviewsReducer.reviews)
    const [star, setStar] = useState()
    const getRandom = (max) => {
        return Math.random() * (max - 0) + 0;
    }
    const handleReview = () => {
        setTimeout(() => {
            // return dispatch(actionSetReview(reviews[Math.random(0,reviews.length)]))
            return console.log(Math.floor(getRandom(40)))
        },200)
    }
    window.onload = () => {
    }
    return (
        review.usuario ? (<div>
            <div className='dateAndButtonContainer'>
                <div>{review.updatedAt} </div>
                <button className='viewMoreButton'>Ver mas reseñas</button>
            </div>
            <div className='reviewContainer'>
                <div>@{review.usuario}</div>
                <div>{stars(review.calificacion)}</div>
                <div onClick={handleReview}>"{review.descripcion}"</div>
            </div>
        </div>) : (<div onClick={handleReview} className='reviewContainer'>No hay reseñas todavia.</div>)
    )
}

export default Review