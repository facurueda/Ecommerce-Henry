import axios from "axios";
import { GET_REVIEWS_BY_PRODUCT, REVIEW_POST } from './constants';

export const actionPostReview = (reviewData) => {
    return (dispatch) => {
        axios.post(url + '/products/' + reviewData.idProduct + '/review', reviewData).then((res) => {
            dispatch ({ type: REVIEW_POST , payload: res.data })
        })
    }
}

export const actionGetReviews = (idProduct) => {
    return (dispatch) => {
        axios.get(url + '/products/' + idProduct + '/review').then((res) => {
            dispatch ({ type: GET_REVIEWS_BY_PRODUCT , payload: res.data })
        })
    }
}

const url = "http://localhost:3000/";