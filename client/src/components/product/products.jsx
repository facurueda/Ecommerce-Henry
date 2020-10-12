import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './products.css';
import { Modal } from 'reactstrap'
import Review from '../Review/Review'
import { actionDeleteReview, actionGetReviews } from '../../redux/reviewsAction';
import EditReview from '../Review/EditReview'
import PostReview from '../Review/PostReview'
import ButtonAddToCart from '../ButtonAddToCart/ButtonAddToCart';
import { actionGetProduct, actionSetProduct } from '../../redux/productsActions';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import itemBack from './Bottomback';

function Products() {

    toast.configure()

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(actionGetReviews(idProduct))
    }, [])
    const { idProduct, name, description, precio, images, stock } = useSelector(store => store.productsReducer.product)

    const [modalEditReview, setModalEditReview] = useState(false)
    const [modalPostReview, setModalPostReview] = useState(false)

    const modalEditReviewView = () => setModalEditReview(!modalEditReview);
    const modalPostReviewView = () => setModalPostReview(!modalPostReview);

    const modalEditReviewClose = () => {
        toast("Review Modificada", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        setModalEditReview(false)
        dispatch(actionGetReviews(idProduct))
    };
    const modalPostReviewClose = () => {
        setModalPostReview(false)
        dispatch(actionGetReviews(idProduct))
    };
    const user = useSelector(state => state.usersReducer.idUser)
    const reviews = useSelector(state => state.reviewsReducer.reviews)
    const review = reviews.find(rev => rev.idUser === user)
    const reload = () => {
        setTimeout(() => {
            return dispatch(actionGetProduct(idProduct))
        }, 25);
        setTimeout(() => {
            dispatch(actionGetReviews(idProduct))
        }, 100);
        setTimeout(() => {
            dispatch(actionSetProduct({ name, precio: precio, description, idProduct, images, stock }))
        }, 150);
        setTimeout(() => {
            return history.push('/productDetail')
        }, 250)
    }
    const deleteReview = () => {
        const data = { idProduct: idProduct, idReview: review.idReview }
        toast.error("Review Eliminada", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        dispatch(actionDeleteReview(data))
        reload()
    }

    function test() {
        return { __html: description }
    }
    const reviewCreateorEdit = () => {
        if (review) {
            return (
                <div className='reviewButtonsContainer'>
                    <button className='EditReview' onClick={e => modalEditReviewView()}>Editar Review</button>
                    <button className='EditReview' onClick={deleteReview}>Eliminar Review</button>
                </div>)
        }
        else {
            return <button className='CreateReview' onClick={e => modalPostReviewView()}> Crear Review</button>
        }

    }

    return (
        <div>
            <body>
                <div className='prodCard'>
                <itemBack/>
                    <div id='hover-img'>
                        <img className="img-fluid" src={images} alt="..." />
                    </div>
                    <div className='prodComp1'>
                        <div className='prodComp2'>
                            <div className='TitlesContainer'>
                                <h1 className='prodName'>{name}</h1>
                                <div className='prodDescription' dangerouslySetInnerHTML={test()} />
                            </div>
                            <Review />
                            <div>
                                {reviewCreateorEdit()}
                            </div>
                            <Modal isOpen={modalEditReview}>
                                <EditReview modalEditReviewClose={modalEditReviewClose} reload={reload} review={review} idProduct={idProduct} />
                            </Modal>
                            <Modal isOpen={modalPostReview}>
                                <PostReview modalPostReviewClose={modalPostReviewClose} reload={reload} idProduct={idProduct} />
                            </Modal>
                        </div>
                        <div className='prodComp3'>
                            <div className='priceAndStockContainer'>
                                <span className='prodPrice'>${precio} </span>
                                <p className='prodStock'>Stock: {stock} unidades</p>
                            </div>
                            <div className='buttons'>
                                <ButtonAddToCart datos={{ idProduct: idProduct, quantity: 1, price: precio }} />
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}



export default Products;
