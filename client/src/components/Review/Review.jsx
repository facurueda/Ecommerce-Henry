import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserReview from './EditReview'
import { actionGetReviews, actionSetReview } from '../../redux/reviewsAction';
import './Review.css'
import stars from './StarsSwitch.jsx'

const Review = () => {
    const dispatch = useDispatch()
    const review = useSelector(state => state.reviewsReducer.review)
    const reviews = useSelector(state => state.reviewsReducer.reviews)
    const product = useSelector(state => state.productsReducer.product)
    const getRandom = (max) => {
        return Math.floor(Math.random() * (max - 0) + 0);
    }
    useEffect(() => {
        handleReview()
        dispatch(actionGetReviews(product.idProduct))
        console.log(product)
        return dispatch(actionSetReview(reviews[getRandom(reviews.length)]))
    }, [])
    const changeRand = (rand) => {
            const rand2 = reviews[getRandom(reviews.length)]
            if (rand !== rand2){
                return rand2
            }else {
                return reviews[getRandom(reviews.length)]
            }
    }
    const handleReview = () => {
        setTimeout(() => {
            const rand = reviews[getRandom(reviews.length)]
            if (rand === review) {
                return dispatch(actionSetReview(changeRand(rand)))
            }
            return dispatch(actionSetReview(rand))
        }, 5000)
        setTimeout(() => {
            return handleReview()
        }, 5000)
    }
    return (
        <div> 
        {(reviews.length > 0) ? (<div>
            <div className='dateAndButtonContainer'>
                <div>{review.updatedAt} </div>
                <button className='viewMoreButton'>Ver mas reseñas</button>
            </div>
            <div className='reviewContainer'>
                <div>Reseñas de nuestros clientes</div>
                <div>{stars(review.rating)}</div>
                <div>"{review.description}"</div>
            </div>
        </div>) : (<div onLoadStart={handleReview} className='reviewContainer'>No hay reseñas todavia.</div>)}
        </div>
    )
}

export default Review