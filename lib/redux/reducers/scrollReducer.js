import { SET_SCROLL_LAYOUT_RULES, GET_RAW_SCROLL_DATA, LOCK_SCROLLOMATIC } from '../actions/types'

const initialState = {
  layout: {
    scrollTray: 0,
    scrollOMatic: 0,
    scrollOMaticRect: {},
    scrollOMaticWidth: 0,
    scrollOMaticHeight: 0,
    trayOffsetWidth: 0,
    trayOffsetHeight: 0,
    trayTop: 0,
    trayLeft: 0,
    widthMargin: 0,
    heightMargin: 0,
    scrollOMaticLeft: 0,
    scrollOMaticTop: 0
  },
  rawScrollData: {
    increment: 0,
    percent: 0
  },
  scrollOMaticLocked: true
}

export default function scrollReducer (state = initialState, action) {
  switch (action.type) {
    case SET_SCROLL_LAYOUT_RULES : {
      const { scrollOMatic, scrollTray } = action.payload
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
    case GET_RAW_SCROLL_DATA : {
      const newState = { ...state }
      newState.rawScrollData = action.payload
      return newState
    }
    case LOCK_SCROLLOMATIC : {
      const newState = { ...state }
      newState.scrollOMaticLocked = action.payload
      return newState
    }
    default :
      return state
  }
}
