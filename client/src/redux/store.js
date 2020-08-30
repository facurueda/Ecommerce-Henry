import {createStore, applyMiddleware, compose} from 'redux'
import {rootReducer} from './reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

const storeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store