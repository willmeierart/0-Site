import { GET_ROUTE_STATE, SET_SCROLL_POS, CONFIG_SCROLL_ENV } from '../actions/types'
import { setScrollState } from '../../_navRules'

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
  scrollPos: { x: 0, y: 1 },
  scrollConfig: {
    type: '',
    leftUp: '',
    rightDown: '',
    initScrollAxis: '',
    style: {
      top: '',
      left: '',
      minWidth: '',
      minHeight: ''
    }
  }
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
      return newState
    }
    case CONFIG_SCROLL_ENV : {
      const newState = { ...state }
      newState.scrollConfig = setScrollState(action.payload)
      return newState
    }
    default:
      return state
  }
}
