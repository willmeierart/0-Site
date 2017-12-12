import { GET_ROUTE_STATE, SET_SCROLL_POS, CONFIG_SCROLL_ENV, GET_TRANSITION_ORIGIN } from '../actions/types'
import { setScrollState } from '../../../router/navRules'
import routeData from '../../../router/routeData'

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
  },
  transitionOrigin: { x: 0, y: 0 }
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
    case GET_TRANSITION_ORIGIN : {
      const { transitionRoute, transitionDirection, widthHeight } = action.payload
      const width = widthHeight[0]
      const height = widthHeight[1]
      const routeType = routeData[transitionRoute].type
      let origin = { x: 0, y: 0 }
      switch (routeType) {
        case 'topNoSub' :
          transitionDirection === 'forward'
            ? origin = { x: 0, y: 0 }
            : origin = { x: width, y: 0 }
          break
        case 'topWSub' :
          transitionDirection === 'forward'
            ? origin = { x: 0, y: 0 }
            : origin = { x: width, y: height }
          break
        case 'subMid' :
          transitionDirection === 'forward'
            ? origin = { x: 0, y: 0 }
            : origin = { x: 0, y: height }
          break
        case 'subLast' :
          transitionDirection === 'forward'
            ? origin = { x: 0, y: height }
            : origin = { x: width, y: height }
          break
        default :
          transitionDirection === 'forward'
            ? origin = { x: 0, y: 0 }
            : origin = { x: width, y: 0 }
          break
      }
      const newState = { ...state }
      newState.transitionOrigin = origin
      return newState
    }
    default:
      return state
  }
}
