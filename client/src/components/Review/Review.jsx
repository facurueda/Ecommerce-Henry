import React from 'react';
import { useSelector } from 'react-redux';
import './Review.css'

const Review = () => {
    const reviews = useSelector(state => state.reviewsReducer.review)
    return (
        <div>
            {reviews.map(review => {
                return (
                    <div className='reviewContainer'>
                        <div>Ultima reseña: {review.updatedAt} </div>
                        <div>Usuario:  {review.usuario}</div>
                        <div>{review.calificacion}</div>
                        <div>Descripcion:  {review.descripcion}</div>
                    </div>)
            })}
        </div>
    )
}

export default Review