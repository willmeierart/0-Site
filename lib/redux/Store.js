import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
// import { persistCombineReducers } from 'redux-persist'
// import storage from 'redux-persist/es/storage'
import reducers from './reducers'

import {
  SET_COLOR_SCHEME,
  CHECK_IF_MOBILE,
  GET_NEW_ORIGIN_POS,
  TRANSITION_ROUTE,
  SET_PREV_NEXT_ROUTES,
  SET_SCROLL_LAYOUT_RULES,
  TOGGLE_MENU,
  GET_RAW_SCROLL_DATA,
  LOCK_SCROLLOMATIC,
  COMPLETE_PAGE_TRANSITION,
  IS_FRESH_LOAD
} from './actions/types'

const logger = createLogger({
  predicate: (getState, action) => {
    return action.type !== SET_COLOR_SCHEME &&
    action.type !== CHECK_IF_MOBILE &&
    action.type !== GET_NEW_ORIGIN_POS &&
    action.type !== TRANSITION_ROUTE &&
    action.type !== SET_PREV_NEXT_ROUTES &&
    action.type !== SET_SCROLL_LAYOUT_RULES &&
    action.type !== TOGGLE_MENU &&
    action.type !== GET_RAW_SCROLL_DATA &&
    action.type !== LOCK_SCROLLOMATIC &&
    action.type !== COMPLETE_PAGE_TRANSITION &&
    action.type !== IS_FRESH_LOAD
  }
})

const middlewares = [thunk, promise]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

// const config = { key: 'root', storage }
// const reducer = persistCombineReducers(config, reducers)

const reduxDevTools = typeof window !== 'undefined'
  ? (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  : function (a) { return a }

const Store = compose(
  applyMiddleware(...middlewares))(createStore)(reducers, reduxDevTools)

export default Store
