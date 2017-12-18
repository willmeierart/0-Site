import { SET_COLOR_SCHEME, TOGGLE_MENU } from '../actions/types'
import palette from '../../ui/colors'

const initialState = {
  colors: {
    bg: palette[0],
    fg: palette[1]
  },
  menuOpen: false
}

export default function uiReducer (state = initialState, action) {
  switch (action.type) {
    case SET_COLOR_SCHEME: {
      const newState = { ...state }
      newState.colors = action.payload
      return newState
    }
    case TOGGLE_MENU: {
      const newState = { ...state }
      newState.menuOpen = action.payload
      return newState
    }
    default:
      return state
  }
}
