import { CHECK_IF_MOBILE, IS_FRESH_LOAD } from '../actions/types'

const initialState = {
  isMobile: false,
  freshLoad: true
}

export default function functionalReducer (state = initialState, action) {
  switch (action.type) {
    case IS_FRESH_LOAD : {
      // if app was just booted up, control things like, don't wrap app in transitionSled
      const newState = { ...state }
      newState.freshLoad = action.payload
      return newState
    }
    case CHECK_IF_MOBILE : {
      const newState = { ...state }
      newState.isMobile = action.payload
      return newState
    }
    default:
      return state
  }
}
