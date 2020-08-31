import { combineReducers } from "redux";
import categoriesReducer from './categoriesReducer'


const rootReducers = combineReducers({
    categoriesReducer,
})
export default rootReducers;