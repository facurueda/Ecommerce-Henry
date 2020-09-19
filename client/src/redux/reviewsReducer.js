import { REVIEW_POST, GET_REVIEWS_BY_PRODUCT } from './constants';

const initialState = {
    review : [],
    reviews: []
}

const reviewsReducer = ( state = initialState, action) => {
    switch(action.type) {
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
            
        default: 
        return state;        
    }
}

export default reviewsReducer;