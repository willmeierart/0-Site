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
  console.log(action.payload)  
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
      const navRules = setScrollState(transitionRoute)
      const { style: { width, height } } = navRules
      const nextWidth = widthHeight[0] * width
      const nextHeight = widthHeight[1] * height
      const routeType = routeData[transitionRoute].type
      let origin = { x: 0, y: 0 }
      switch (routeType) {
        case 'topNoSub' :
          transitionDirection === 'forward'
            ? origin = { x: 0, y: 0 }
            : origin = { x: nextWidth, y: 0 }
          break
        case 'topWSub' :
          transitionDirection === 'forward'
            ? origin = { x: 0, y: 0 }
            : origin = { x: nextWidth, y: nextHeight }
          break
        case 'subMid' :
          transitionDirection === 'forward'
            ? origin = { x: 0, y: 0 }
            : origin = { x: 0, y: nextHeight }
          break
        case 'subLast' :
          transitionDirection === 'forward'
            ? origin = { x: 0, y: nextHeight }
            : origin = { x: nextWidth, y: nextHeight }
          break
        default :
          transitionDirection === 'forward'
            ? origin = { x: 0, y: 0 }
            : origin = { x: nextWidth, y: 0 }
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
