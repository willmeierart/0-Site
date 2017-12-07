import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
// import { persistCombineReducers } from 'redux-persist'
// import storage from 'redux-persist/es/storage'
// import localForage from 'localforage'

import reducers from './reducers'

// const config = { key: 'root', storage }
// const reducer = persistCombineReducers(config, reducers)

const Store = compose(applyMiddleware(thunk, promise, logger))(createStore)(reducers
  // window && (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default Store
