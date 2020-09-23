import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonAddToCart from '../ButtonAddToCart';
import './products.css';
import { Modal } from 'reactstrap'
import Review from '../Review/Review'
import { actionGetReviews } from '../../redux/reviewsAction';
import EditReview from '../Review/EditReview'
import PostReview from '../Review/PostReview'

function Products() {   
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actionGetReviews(idProduct))
    })
    const { idProduct, name, description, precio, images, stock } = useSelector(store => store.productsReducer.product)

    const [modalEditReview, setModalEditReview] = useState(false)
    const [modalPostReview, setModalPostReview] = useState(false)

    const modalEditReviewView = () => setModalEditReview(!modalEditReview);
    const modalPostReviewView = () => setModalPostReview(!modalPostReview);

    const modalEditReviewClose = () => setModalEditReview(false);
    const modalPostReviewClose = () => setModalPostReview(false);
    const user = useSelector(state => state.usersReducer.idUser)
    const reviews = useSelector(state => state.reviewsReducer.reviews)
    const review = reviews.find(rev => rev.idUser === user)

    function test() {
        return { __html: description }
    }

    const reviewFinder = () => {
        return <Review />
    }

    const reviewCreateorEdit = () => {
        if(review) {
            return <button className='EditReview' onClick={e => modalEditReviewView()}>Editar Review</button>
        }
        else {
            return <button className='CreateReview' onClick={e => modalPostReviewView()}> Crear Review</button>
        }

    }

    return (
        <div>
            <body>
                <div className='prodCard'>
                    <div id='hover-img'>
                        <img className="img-fluid" src={images} alt="..." />
                    </div>
                    <div className='prodComp1'>
                        <div className='prodComp2'>
                            <div className='TitlesContainer'>
                                <h1 className='prodName'>{name}</h1>
                                <div className='prodDescription' dangerouslySetInnerHTML={test()} />
                            </div>
                            <div>{reviewFinder()}</div>
                            <div>
                                {reviewCreateorEdit()}
                            </div>
                            <Modal isOpen={modalEditReview}>
                                    <EditReview modalEditReviewClose = {modalEditReviewClose} review = {review} />
                            </Modal>
                            <Modal isOpen={modalPostReview}>
                                    <PostReview modalPostReviewClose = {modalPostReviewClose} idProduct = {idProduct} />
                            </Modal>
                        </div>
                        <div className='prodComp3'>
                            <div className='priceAndStockContainer'>
                                <span className='prodPrice'>${precio} </span>
                                <p className='prodStock'>Stock: {stock}</p>
                            </div>
                            <div className='buttons'>
                                <ButtonAddToCart datos={{ idProduct: idProduct, quantity: 1, price: precio }} />
                                <button className='buyProd'>Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}


export default Products;
