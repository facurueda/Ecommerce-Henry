import axios from "axios";
import { SET_REVIEW ,GET_REVIEWS_BY_PRODUCT, REVIEW_POST } from './constants';

export const actionPostReview = (reviewData) => {
    return (dispatch) => {
        axios.post(url + '/products/' + reviewData.idProduct + '/review', reviewData).then((res) => {
            dispatch ({ type: REVIEW_POST , payload: res.data })
        })
    }
}

export const actionGetReviews = (idProduct) => {
    return (dispatch) => {
        axios.get(url + 'products/' + idProduct + '/review').then((res) => {
            dispatch ({ type: GET_REVIEWS_BY_PRODUCT , payload: res.data })
            if (res.data.length > 0){
            dispatch({type: SET_REVIEW, payload: res.data[Math.floor(Math.random() * (res.data.length - 0) + 0)]})
            }
        })
    }
}
export const actionSetReview = (review) => {
    return (dispatch) => {
        dispatch({type: SET_REVIEW, payload: review})
    }
}

const url = "http://localhost:3000/";