import { SET_COLOR_SCHEME } from '../actions/types'
import palette from '../../ui/colors'

const initialState = {
  colors: {
    bg: palette[0],
    fg: palette[1]
  }
}

export default function uiReducer (state = initialState, action) {
  switch (action.type) {
    case SET_COLOR_SCHEME: {
      const newState = { ...state }
      newState.colors = action.payload
      return newState
    }
    default:
      return state
  }
}