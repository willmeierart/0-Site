import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
// import { persistCombineReducers } from 'redux-persist'
// import storage from 'redux-persist/es/storage'
import reducers from './reducers'
import { SET_COLOR_SCHEME } from './actions/types'

const logger = createLogger({
  predicate: (getState, action) => action.type !== SET_COLOR_SCHEME
})

// const config = { key: 'root', storage }
// const reducer = persistCombineReducers(config, reducers)

const reduxDevTools = typeof window !== 'undefined'
  ? (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  : function (a) { return a }

const Store = compose(
  applyMiddleware(thunk, promise, logger))(createStore)(reducers, reduxDevTools)

export default Store
