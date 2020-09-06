import { combineReducers } from "redux";
import categoriesReducer from './categoriesReducer'
import productsReducer from './productsReducer'
import ordersReducer from './ordersReducer'

const rootReducers = combineReducers({
    categoriesReducer,
    productsReducer,
    ordersReducer,
})
export default rootReducers;