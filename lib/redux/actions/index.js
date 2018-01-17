import {
  GET_NEW_ORIGIN_POS,
  SET_COLOR_SCHEME,
  TRANSITION_ROUTE,
  SET_SCROLL_LAYOUT_RULES,
  GET_RAW_SCROLL_DATA,
  TOGGLE_MENU,
  SET_PREV_NEXT_ROUTES,
  CHECK_IF_MOBILE,
  IS_FRESH_LOAD
} from './types'

export const isFreshLoad = bool => async dispatch => {
  dispatch({
    type: IS_FRESH_LOAD,
    payload: bool
  })
}

export const checkIfMobile = () => async dispatch => {
  const bool = window !== undefined && window.orientation !== undefined
  dispatch({
    type: CHECK_IF_MOBILE,
    payload: bool
  })
}

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

export const getRawScrollData = data => async dispatch => {
  dispatch({
    type: GET_RAW_SCROLL_DATA,
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
