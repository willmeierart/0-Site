import { SET_COLOR_SCHEME, TOGGLE_MENU } from '../actions/types'
import palette from '../../ui/colors'

const initialState = {
  colors: {
    base1: palette[0],
    base2: palette[1],
    cur1: palette[0],
    cur2: palette[1],
    acc1: palette[2],
    acc2: palette[3]
  },
  menuOpen: false
}

export default function uiReducer (state = initialState, action) {
  switch (action.type) {
    case SET_COLOR_SCHEME: {
      const { base1, base2, cur1, cur2, acc1, acc2 } = action.payload
      const newState = { ...state }
      newState.colors = {
        base1: base1 || state.base1,
        base2: base2 || state.base2,
        cur1: cur1 || state.cur1,
        cur2: cur2 || state.cur2,
        acc1: acc1 || state.acc1,
        acc2: acc2 || state.acc2
      }
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
