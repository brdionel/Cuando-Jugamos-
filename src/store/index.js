import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose 
const composeEnhancers = composeWithDevTools({
    name: 'Redux',
    realtime: true,
    trace: true,
    traceLimit: 20
})

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(reduxThunk)
    ))
; 

export default store;