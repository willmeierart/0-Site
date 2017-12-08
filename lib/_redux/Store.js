import { compose, createStore, applyMiddleware } from 'redux'
// import logger from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
// import { persistCombineReducers } from 'redux-persist'
// import storage from 'redux-persist/es/storage'
import reducers from './reducers'

// const config = { key: 'root', storage }
// const reducer = persistCombineReducers(config, reducers)

const reduxDevTools = typeof window !== 'undefined'
  ? (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  : function (a) { return a }

const Store = compose(
  applyMiddleware(thunk, promise/* , logger */))(createStore)(reducers, reduxDevTools)

export default Store
