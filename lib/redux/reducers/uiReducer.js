import { SET_COLOR_SCHEME, TOGGLE_MENU } from '../actions/types'
import palette from '../../ui/colors'

const initialState = {
  colors: {
    base1: palette[0],
    base2: palette[1],
    cur1: palette[0],
    cur2: palette[1],
    acc1: palette[2],
    acc2: palette[3],
    actualBG: palette[0]
  },
  menuOpen: false
}

export default function uiReducer (state = initialState, action) {
  switch (action.type) {
    case SET_COLOR_SCHEME: {
      const newColors = { ...state.colors }
      for (let color in action.payload) {
        newColors[color] = action.payload[color]
      }
      const newState = { ...state, colors: newColors }
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
