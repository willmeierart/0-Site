import { GET_ROUTE_STATE, SET_SCROLL_POS, CONFIG_SCROLL_ENV, GET_TRANSITION_DIR } from './types'
import routeData from '../../../router/routeData'

export const getRouteState = route => async dispatch => {
  const newRoute = routeData[route]
  dispatch({
    type: GET_ROUTE_STATE,
    payload: newRoute
  })
}

export const setScrollPos = coords => async dispatch => {
  dispatch({
    type: SET_SCROLL_POS,
    payload: coords
  })
}

export const configScrollEnv = routeType => async dispatch => {
  dispatch({
    type: CONFIG_SCROLL_ENV,
    payload: routeType
  })
}

export const getTransitionDir = dir => async dispatch => {
  dispatch({
    type: GET_TRANSITION_DIR,
    payload: dir
  })
}