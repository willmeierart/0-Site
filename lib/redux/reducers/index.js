import { combineReducers } from 'redux'
import navigationReducer from './navigationReducer'

const rootReducer = combineReducers({
  nav: navigationReducer
})

export default rootReducer
