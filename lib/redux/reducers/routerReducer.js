import { GET_NEW_ORIGIN_POS, TRANSITION_ROUTE } from '../actions/types'
import navRules from '../../../router/navRules'
import routeData from '../../../router/routeData'
import router from '../../../router'
const { Router } = router

const initialState = {
  transitionOrigin: { x: -1, y: -1 },
  transitionDirection: 'forward'
}

export default function routerReducer (state = initialState, action) {
  switch (action.type) {
    case TRANSITION_ROUTE : {
      const { prevTrigger, nextTrigger, prevRoute, nextRoute } = action.payload
      // const PREV = routeData[prevRoute].type.indexOf('top') !== 0
      //   ? `${routeData[prevRoute].parent}/${prevRoute}`
      //   : prevRoute
      // const NEXT = routeData[nextRoute].type.indexOf('top') !== 0
      //   ? `${routeData[nextRoute].parent}/${nextRoute}`
      //   : nextRoute
      prevTrigger && Router.pushRoute('main', { slug: prevRoute })
      nextTrigger && Router.pushRoute('main', { slug: nextRoute })
      const newState = { ...state }
      newState.transitionDirection = prevTrigger ? 'back' : 'forward'
      return newState
    }
    case GET_NEW_ORIGIN_POS : {
      const { transitionRoute, transitionDirection, widthHeight } = action.payload
      const routeType = routeData[transitionRoute].type
      const NavRules = navRules(routeType)
      const { style: { width, height } } = NavRules
      let nextWidth = width !== 1 ? (widthHeight[0] - widthHeight[0] * width) + 1 : -1
      let nextHeight = height !== 1 ? (widthHeight[1] - widthHeight[1] * height) + 1 : -1
      if (nextWidth >= 0) { nextWidth = -1 }
      if (nextHeight >= 0) { nextHeight = -1 }
      let origin = { x: -1, y: -1 }
      switch (routeType) {
        case 'topNoSub' :
          transitionDirection === 'forward'
            ? origin = { x: -1, y: -1 }
            : origin = { x: nextWidth, y: -1 }
          break
        case 'topWSub' :
          transitionDirection === 'forward'
            ? origin = { x: -1, y: -1 }
            : origin = { x: nextWidth, y: -1 }
          break
        case 'subMid' :
          transitionDirection === 'forward'
            ? origin = { x: -1, y: -1 }
            : origin = { x: -1, y: nextHeight }
          break
        case 'subLast' :
          transitionDirection === 'forward'
            ? origin = { x: -1, y: -1 }
            : origin = { x: -1, y: nextHeight }
          break
        default :
          transitionDirection === 'forward'
            ? origin = { x: -1, y: -1 }
            : origin = { x: nextWidth, y: -1 }
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
