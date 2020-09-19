import React from 'react';
import { useSelector } from 'react-redux';

const Review = () => {
    const review = useSelector(state => state.reviewsReducer.review)
    
    return (
        <div>
            <div>Fecha de creacion: {review.createdAt} </div>
            <div>Usuario:  {review.usuario}</div>
            <div>Calificacion:  {review.calificacion}</div>
            <div>Descripcion:  {review.descripcion}</div>
        </div>
    )
}

export default Review