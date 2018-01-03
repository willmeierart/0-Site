import { GET_NEW_ORIGIN_POS, SET_COLOR_SCHEME, TRANSITION_ROUTE, SET_SCROLL_LAYOUT_RULES, TOGGLE_MENU, SET_PREV_NEXT_ROUTES } from './types'

export const getNewOriginPos = (transRoute, transDir, widthHeight) => async dispatch => {
  dispatch({
    type: GET_NEW_ORIGIN_POS,
    payload: {
      transitionRoute: transRoute,
      transitionDirection: transDir,
      widthHeight
    }
  })
}

export const transitionRoute = routerData => async dispatch => {
  dispatch({
    type: TRANSITION_ROUTE,
    payload: routerData
  })
}

export const setPrevNextRoutes = route => async dispatch => {
  dispatch({
    type: SET_PREV_NEXT_ROUTES,
    payload: route
  })
}

export const setScrollLayoutRules = data => async dispatch => {
  dispatch({
    type: SET_SCROLL_LAYOUT_RULES,
    payload: data
  })
}

export const setColorScheme = colors => async dispatch => {
  dispatch({
    type: SET_COLOR_SCHEME,
    payload: colors
  })
}

export const toggleMenu = bool => async dispatch => {
  dispatch({
    type: TOGGLE_MENU,
    payload: bool
  })
}
