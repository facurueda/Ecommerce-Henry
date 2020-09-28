import axios from "axios";
import { SET_REVIEW, GET_REVIEWS_BY_PRODUCT, REVIEW_POST, REVIEW_EDITED } from './constants';

export const actionPostReview = (reviewData) => {
    return (dispatch) => {
        axios.post(url + 'products/' + reviewData.idProduct + '/review', reviewData, { withCredentials: true }).then((res) => {
            actionGetReviews(reviewData.idProduct)
        })
    }
}

export const actionEditReview = (reviewData) => {
    return (dispatch) => {
        axios.put(url + 'products/' + reviewData.idProduct + '/review/' + reviewData.idReview, reviewData, { withCredentials: true }).then((res) => {
            dispatch({ type: REVIEW_EDITED, payload: res.data })
        })
    }
}
export const actionDeleteReview = (data) => {
    return (dispatch) => {
        axios.delete(url + 'products/' + data.idProduct + '/review/' + data.idReview,{ withCredentials: true }).then(() => {
            actionGetReviews(data.idProduct)
        })
    }
}

export const actionGetReviews = (idProduct) => {
    return (dispatch) => {
        axios.get(url + 'products/' + idProduct + '/review', { withCredentials: true }).then((res) => {
            dispatch({ type: GET_REVIEWS_BY_PRODUCT, payload: res.data })
            if (res.data.length > 0) {
                dispatch({ type: SET_REVIEW, payload: res.data[Math.floor(Math.random() * (res.data.length - 0) + 0)] })
            }
        })
    }
}
export const actionSetReview = (review) => {
    return (dispatch) => {
        dispatch({ type: SET_REVIEW, payload: review })
    }
}

const url = "http://localhost:3000/";