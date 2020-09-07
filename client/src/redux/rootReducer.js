import { combineReducers } from "redux";
import categoriesReducer from './categoriesReducer'
import productsReducer from './productsReducer'
import ordersReducer from './ordersReducer'
import usersReducer from './usersReducer'

const rootReducers = combineReducers({
    categoriesReducer,
    productsReducer,
    ordersReducer,
    usersReducer,
})
export default rootReducers;