import { REVIEW_POST, GET_REVIEWS_BY_PRODUCT } from './constants';

// <div>Ultima reseña: {review.updatedAt} </div>
// <div>Usuario:  {review.usuario}</div>
// <div>Calificacion:  {review.calificacion}</div>
// <div>Descripcion:  {review.descripcion}</div>
const initialState = {
    review : [{updatedAt: '29/02/1990 08:00:00',usuario: 'Invoker', calificacion: 3, descripcion: 'mmm... bueno pero vino cachado en el torax.'}],
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