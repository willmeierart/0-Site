import { combineReducers } from 'redux'
import navigationReducer from './navigationReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({
  nav: navigationReducer,
  ui: uiReducer
})

export default rootReducer
