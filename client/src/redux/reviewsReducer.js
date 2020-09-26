import {
    SET_REVIEW,
    REVIEW_POST,
    GET_REVIEWS_BY_PRODUCT,
    REVIEW_EDITED
} from './constants';

const initialState = {
    review: {},
    reviews: []
}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEW:
            return {
                ...state,
                review: action.payload
            }
        case REVIEW_POST:
            return {
                ...state,
                review: action.payload
            }
        case GET_REVIEWS_BY_PRODUCT:
            return {
                ...state,
                reviews: action.payload
            }
        case REVIEW_EDITED:
            return {
                ...state,
                review: action.payload
            }
        default:
            return state;
    }
}

export default reviewsReducer;