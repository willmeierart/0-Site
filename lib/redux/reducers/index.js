import { combineReducers } from 'redux'
import routerReducer from './routerReducer'
import scrollReducer from './scrollReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({
  router: routerReducer,
  scroll: scrollReducer,
  ui: uiReducer
})

export default rootReducer
