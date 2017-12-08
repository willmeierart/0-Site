import { GET_ROUTE_STATE, SET_SCROLL_POS } from './types'
import routeData from '../../../router/routeData'

export const getRouteState = route => async dispatch => {
  const newRoute = routeData[route]
  dispatch({
    type: GET_ROUTE_STATE,
    payload: newRoute
  })
}

export const setScrollPos = (coords) => async dispatch => {
  console.log(coords)
  dispatch({
    type: SET_SCROLL_POS,
    payload: coords
  })
}
