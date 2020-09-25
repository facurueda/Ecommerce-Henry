import { combineReducers } from "redux";
import categoriesReducer from './categoriesReducer'
import productsReducer from './productsReducer'
import ordersReducer from './ordersReducer'
import usersReducer from './usersReducer'
import reviewsReducer from './reviewsReducer'

const rootReducers = combineReducers({
    categoriesReducer,
    productsReducer,
    ordersReducer,
    usersReducer,
    reviewsReducer
})
export default rootReducers;