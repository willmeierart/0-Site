import { combineReducers } from 'redux'
import routerReducer from './routerReducer'
import scrollReducer from './scrollReducer'
import uiReducer from './uiReducer'
import functionalReducer from './functionalReducer'

const rootReducer = combineReducers({
  router: routerReducer,
  scroll: scrollReducer,
  ui: uiReducer,
  functional: functionalReducer
})

export default rootReducer
