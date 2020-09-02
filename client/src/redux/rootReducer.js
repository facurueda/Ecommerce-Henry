import { combineReducers } from "redux";
import categoriesReducer from './categoriesReducer'
import productsReducer from './productsReducer'


const rootReducers = combineReducers({
    categoriesReducer,
    productsReducer,
})
export default rootReducers;