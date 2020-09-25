import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserReview from './EditReview'
import { actionGetReviews, actionSetReview } from '../../redux/reviewsAction';
import './Review.css'
import stars from './StarsSwitch.jsx'
import { Modal } from 'reactstrap';

const Review = () => {
    const dispatch = useDispatch()
    const review = useSelector(state => state.reviewsReducer.review)
    const reviews = useSelector(state => state.reviewsReducer.reviews)
    const product = useSelector(state => state.productsReducer.product)
    const [modalReviews, setModalReviews] = useState(false)

    const modalReviewView = () => setModalReviews(!modalReviews);
    const getRandom = (max) => {
        return Math.floor(Math.random() * (max - 0) + 0);
    }
    useEffect(() => {
        handleReview()
        dispatch(actionGetReviews(product.idProduct))
        console.log(product)
        return dispatch(actionSetReview(reviews[getRandom(reviews.length)]))
    }, [])
    const toDate = (string) => {
        const time = new Date(string)
        return time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear() + ' ' + time.getHours() + 'hs'
    }
    const changeRand = (rand) => {
        const rand2 = reviews[getRandom(reviews.length)]
        if (rand !== rand2) {
            return rand2
        } else {
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
                    <div>{toDate(review.updatedAt)} </div>
                    <button className='viewMoreButton' onClick={modalReviewView}>Ver mas reseñas</button>
                    <Modal isOpen={modalReviews}>
                        {reviews.map((review => {
                            return (<div className='reviewContainer'>
                                <div>{stars(review.rating)}</div>
                                <div>"{review.description}"</div>
                            </div>)
                        }))
                    }
                    <button className='viewMoreButton' onClick={modalReviewView}>x</button>
                    </Modal>
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