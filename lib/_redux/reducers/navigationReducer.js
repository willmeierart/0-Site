import { GET_ROUTE_STATE } from '../actions/types'

const initialState = {
  routeData: {
    path: '',
    type: '',
    subpages: [],
    nextRoute: '',
    prevRoute: '',
    bgColor1: '',
    bgColor2: ''
  }
}

export default function navigationReducer (state = initialState, action) {
  switch (action.type) {
    case GET_ROUTE_STATE: {
      const newState = { ...state }
      newState.routeData = action.payload
      console.log(newState, 'asdjfnask;lfjna;sdfj')
      return newState
    }
    default:
      return state
  }
}
