import { SET_SCROLL_LAYOUT_RULES } from '../actions/types'

const initialState = {
  layout: {

  }
}

export default function scrollReducer (state = initialState, action) {
  switch (action.type) {
    case SET_SCROLL_LAYOUT_RULES : {
      const { scrollOMatic, scrollTray, leftUp, rightDown } = action.payload
      const scrollOMaticRect = scrollOMatic.getBoundingClientRect()
      const scrollOMaticWidth = scrollOMaticRect.width
      const scrollOMaticHeight = scrollOMaticRect.height
      const trayOffsetHeight = scrollTray.offsetHeight
      const trayOffsetWidth = scrollTray.offsetWidth
      const layoutData = {
        scrollTray,
        scrollOMatic,
        scrollOMaticRect,
        scrollOMaticWidth,
        scrollOMaticHeight,
        trayOffsetWidth,
        trayOffsetHeight,
        trayTop: scrollTray.offsetTop,
        trayLeft: scrollTray.offsetLeft,
        widthMargin: scrollOMaticWidth - trayOffsetWidth,
        heightMargin: scrollOMaticHeight - trayOffsetHeight,
        scrollOMaticLeft: scrollOMaticRect.left,
        scrollOMaticTop: scrollOMaticRect.top,
        equations: {}
      }
      const newState = { ...state }
      newState.layout = layoutData
      return newState
    }
    default :
      return state
  }
}
