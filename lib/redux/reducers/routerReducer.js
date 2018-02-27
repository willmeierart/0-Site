import { GET_NEW_ORIGIN_POS, TRANSITION_ROUTE, SET_PREV_NEXT_ROUTES, COMPLETE_PAGE_TRANSITION } from '../actions/types'
import navRules from '../../../router/navRules'
import routeData from '../../../router/routeData'
import router from '../../../router'
const { Router } = router

const initialState = {
  transitionOrigin: { x: -1, y: -1 },
  transitionDirection: 'forward',
  transitionComplete: false,
  prevNextRoutes: { prevRoute: '/', nextRoute: '/' }
}

export default function routerReducer (state = initialState, action) {
  switch (action.type) {
    case SET_PREV_NEXT_ROUTES : {
      const route = action.payload
      const routeNames = Object.keys(routeData)
      const currentRouteIndex = routeNames.indexOf(route)
      const prevRouteIndex = currentRouteIndex === 0 ? routeNames.length - 1 : currentRouteIndex - 1
      const prevRoute = routeNames[prevRouteIndex]
      const nextRouteIndex = currentRouteIndex === routeNames.length - 1 ? 0 : currentRouteIndex + 1
      const nextRoute = routeNames[nextRouteIndex]
      const newState = { ...state }
      newState.prevNextRoutes = { prevRoute, nextRoute }
      return newState
    }
    case TRANSITION_ROUTE : {
      const { prevTrigger, nextTrigger, prevRoute, nextRoute } = action.payload
      prevTrigger && Router.pushRoute('main', { slug: prevRoute })
      nextTrigger && Router.pushRoute('main', { slug: nextRoute })
      const newState = { ...state }
      newState.transitionDirection = prevTrigger ? 'back' : 'forward'
      return newState
    }
    case GET_NEW_ORIGIN_POS : {
      // REALLY crucial reducer!
      // upon route change, aligns new position of scrollTray to 1 pixel offset from the opposite direction
      // of where the transition was just triggered from (since transitions triggered by registering to min/max dims)
      const { transitionRoute, transitionDirection, widthHeight } = action.payload
      const { type } = routeData[transitionRoute]
      const NavRules = navRules(type)
      const { style: { width, height } } = NavRules
      let nextWidth = type === 'horizontal' ? (widthHeight[0] - widthHeight[0] * width) + 1 : -1
      let nextHeight = type === 'vertical' ? (widthHeight[1] - widthHeight[1] * height) + 1 : -1
      if (nextWidth >= 0) { nextWidth = -1 }
      if (nextHeight >= 0) { nextHeight = -1 }
      let origin = { x: -1, y: -1 }
      switch (type) {
        case 'horizontal' :
          transitionDirection === 'forward'
            ? origin = { x: -1, y: -1 }
            : origin = { x: nextWidth, y: -1 }
          break
        case 'vertical' :
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
    case COMPLETE_PAGE_TRANSITION : {
      const newState = { ...state }
      newState.transitionComplete = action.payload
      return newState
    }
    default:
      return state
  }
}
