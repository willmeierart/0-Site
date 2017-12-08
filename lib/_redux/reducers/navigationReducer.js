import { GET_ROUTE_STATE, SET_SCROLL_POS } from '../actions/types'

const initialState = {
  routeData: {
    path: '',
    type: '',
    subpages: [],
    nextRoute: '',
    prevRoute: '',
    bgColor1: '',
    bgColor2: ''
  },
  scrollPos: { x: 0, y: 1 }
}

export default function navigationReducer (state = initialState, action) {
  switch (action.type) {
    case GET_ROUTE_STATE: {
      const newState = { ...state }
      newState.routeData = action.payload
      return newState
    }
    case SET_SCROLL_POS: {
      const newState = { ...state }
      newState.scrollPos = action.payload
      console.log(newState)
      return newState
    }
    default:
      return state
  }
}
