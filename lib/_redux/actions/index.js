import { GET_ROUTE_STATE } from './types'
import routeData from '../../../router/routeData'

export const getRouteState = route => async dispatch => {
  const newRoute = routeData[route]
  // console.log(routeData)
  // console.log(route)
  // console.log(newRoute)
  dispatch({
    type: GET_ROUTE_STATE,
    payload: newRoute
  })
}
