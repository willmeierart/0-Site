// this is the most important component of the entire site!
// it's based on an NPM package called 'react-scroll-horizontal'
// and controls all interpolation of wheel/touchmove events
// wiring it to redux for routing, animations, etc:

import React, { Component } from 'react'
import DOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Motion, spring, presets } from 'react-motion'
import raf from 'raf'
import { getNewOriginPos, transitionRoute, setPrevNextRoutes, setScrollLayoutRules, getRawScrollData, setColorScheme, isFreshLoad } from '../../lib/redux/actions'
import { fadeColor, binder } from '../../lib/_utils'
import PerformanceGate from '../hoc/PerformanceGate'
import TesterAnimatedThing from '../TesterAnimatedThing'
import router from '../../router'
const { Router } = router

// parent component: TransitionSled (via App)
class ScrollOMatic extends Component {
  constructor (props) {
    super(props)

    const { transitionOrigin: { x, y }, transitionDirection } = props

    this.state = {
      canScroll: false,
      animValues: 0,
      animValsY: y,
      animValsX: x,
      currentScrollDir: transitionDirection,
      current: -1,
      increment: 0,
      bounds: -1,
      touchStartX: 0,
      touchStartY: 0,
      scrollTiplier: 0
    }
    binder(this, [
      'handleScroll',
      'resetMin',
      'resetMax',
      'navigator',
      'canIscroll',
      'setCurrentScrollDir',
      'setScrollStyleState',
      'scrollDirTransformer',
      'animateTheScroll',
      'animValSwitch',
      'trackCurrentPosition',
      'handleTouchStart',
      'getStyles'
    ])
  }

  componentWillUnmount () { window.removeEventListener('resize', () => this.props.setScrollLayoutRules) }

  componentDidMount () {
    const { routeData: { bgColor1, bgColor2, route }, setScrollLayoutRules, setColorScheme, setPrevNextRoutes } = this.props
    const fetchEm = async () => {
      await setPrevNextRoutes(route)
      const prevNextRoutes = await this.props.prevNextRoutes
      const { prevRoute, nextRoute } = prevNextRoutes
      // use Next.js's router's prefetching to load in possible next routes more performantly
      Router.prefetchRoute('main', { slug: nextRoute })
      Router.prefetchRoute('main', { slug: prevRoute })
    }
    fetchEm()

    const scrollOMatic = DOM.findDOMNode(this.scrollOMatic)
    const scrollTray = DOM.findDOMNode(this.scrollTray)

    this.trackCurrentPosition()

    setScrollLayoutRules({ scrollOMatic, scrollTray })
    setColorScheme({ base1: bgColor1, base2: bgColor2 })

    // need to reset math relationships on window resize
    window.addEventListener('resize', () => setScrollLayoutRules({ scrollOMatic, scrollTray }))
  }

  componentWillReceiveProps (nextProps) { (this.props.children !== nextProps.children) && this.resetMin() }

  shouldComponentUpdate (nextProps, nextState) {
    // a sort of performance gate to prevent rerendering unless relevant to scroll mechanics
    if (true &&
      this.calculate.timer !== void 0 &&
      this.props.children === nextProps.children &&
      this.state.animValues === nextState.animValues &&
      this.state.animValsX === nextState.animValsX &&
      this.state.animValsY === nextState.animValsY) {
      return false
    }
    if (true &&
      this.props.children === nextProps.children &&
      this.canIscroll() === false) {
      return false
    }
    return true
  }

  componentDidUpdate () { this.calculate() }

  canIscroll () {
    // lock scrolling when bottomed out and when route-start timeout hasn't finished
    const { layout, routeData: { type }, scrollOMaticLocked } = this.props
    const canScrollSideways = type === 'horizontal' && (layout.trayLeft < layout.scrollOMaticLeft || layout.trayOffsetWidth > layout.scrollOMaticWidth)
    const canScrollVertical = type === 'vertical' && (layout.trayTop < layout.scrollOMaticTop || layout.trayOffsetHeight > layout.scrollOMaticHeight)
    return (canScrollVertical || canScrollSideways) && !scrollOMaticLocked
  }

  calculate () {
    // tricky little function that keeps track of whether bottomed/topped out
    clearTimeout(this.calculate.timer)
    this.calculate.timer = setTimeout(() => {
      const { bounds, current } = this.state
      if (current > 1) {
        this.resetMin()
      } else if (current <= bounds) {
        const x = bounds + 1
        this.resetMax(x)
      }
    })
  }

  resetMin () { this.setState({ [this.animValSwitch().name]: 0 }) }
  resetMax (x) { this.setState({ [this.animValSwitch().name]: x }) }

  animValSwitch () {
    // controls whether scrolling on X or Y axis depending on routeData
    const { animValsX, animValsY } = this.state
    const { routeData: { type } } = this.props
    const valSwitch = type === 'horizontal'
      ? { name: 'animValsX', val: animValsX }
      : { name: 'animValsY', val: animValsY }
    return valSwitch
  }

  trackCurrentPosition () {
    // self-explanatory
    const { layout: { widthMargin, heightMargin }, routeData: { type } } = this.props
    const bounds = type === 'vertical' ? heightMargin : widthMargin
    const current = this.animValSwitch().val
    this.setState({ bounds, current })
  }

  navigator () {
    // controls all routing for the app
    // basically, see scrollReducer, but depending on direction view routed to
    // ScrollTray rendered 1px offset from min/max possible.
    // when it hits 0/max it routes back/forward. kept track of via routeData.
    const { current } = this.state
    const { prevNextRoutes: { nextRoute, prevRoute }, layout: { scrollOMaticHeight, scrollOMaticWidth, widthMargin, heightMargin }, routeData: { type, bgColor1, bgColor2 }, getNewOriginPos, transitionRoute, isFreshLoad, freshLoad, setColorScheme } = this.props
    let prevTrigger = current >= 0
    let nextTrigger = type === 'vertical' ? heightMargin >= current : widthMargin >= current

    const routerData = { prevTrigger, nextTrigger, prevRoute, nextRoute }

    if (nextTrigger || prevTrigger) {
      const widthHeight = [scrollOMaticWidth, scrollOMaticHeight]
      if (freshLoad === true) {
        isFreshLoad(false)
      }
      if (nextTrigger) {
        getNewOriginPos(nextRoute, 'forward', widthHeight)
        // also controls whether fading from second color to first bound to route or vice versa
        setColorScheme({ actualBG: bgColor2 })
      } else {
        getNewOriginPos(prevRoute, 'back', widthHeight)
        setColorScheme({ actualBG: bgColor1 })
      }
      transitionRoute(routerData)
    }
  }

  setCurrentScrollDir (mousePos) {
    // allows 'inverted' prop to control relation of scroll direction to animation
    const { scrollInverted } = this.props
    this.setState({ currentScrollDir: scrollInverted
       ? mousePos < 0 ? 'back' : 'forward'
       : mousePos < 0 ? 'forward' : 'back'
    })
  }

  setScrollStyleState () {
    // controls color changes, etc.
    const { isMobile, layout: { scrollOMaticHeight, scrollOMaticWidth, trayOffsetHeight, trayOffsetWidth }, routeData: { type, bgColor1, bgColor2 }, setColorScheme } = this.props
    const { current, scrollTiplier } = this.state

    const scrollOMaticDim = type === 'horizontal' ? scrollOMaticWidth : scrollOMaticHeight
    const trayScrollDim = type === 'horizontal' ? trayOffsetWidth : trayOffsetHeight

    this.setState({
      scrollTiplier: ((current / (scrollOMaticDim - trayScrollDim))).toFixed(3)
    })

    setColorScheme({
      cur1: fadeColor(isMobile ? spring(scrollTiplier, { stiffness: 120, damping: 20 }).val : scrollTiplier, [bgColor1, bgColor2]),
      cur2: fadeColor(isMobile ? spring(scrollTiplier, { stiffness: 120, damping: 20 }).val : scrollTiplier, [bgColor2, bgColor1])
    })
  }

  scrollDirTransformer (amt) {
    // really important function -- takes amount scrolled and translates it to the pixel val animation property applied to Motion component
    let amt3 = amt ? amt.toFixed(0) : -1
    const { type } = this.props.routeData
    const { animValsX, animValsY } = this.state
    let x = animValsX
    let y = animValsY
    if (type === 'horizontal') {
      x = `${amt3}px`
      y = '-1px'
    } else {
      x = '-1px'
      y = `${amt3}px`
    }

    const magicVal = `translate3d(${x},${y},0)`
    return magicVal
  }

  animateTheScroll (e) {
    // this is where the mouse/touch values come from
    // also where the functionality of 'use whichever scroll[X,Y] is greatest'
    // also where multiplier applied against raw val to slow/speed-up scroll
    const { scrollInverted, isMobile } = this.props
    const { touchStartX, touchStartY } = this.state
    const rawData = () => {
      if (isMobile) {
        if (e.touches[0].clientY !== touchStartY || e.touches[0].clientX !== touchStartX) {
          if (Math.abs(e.touches[0].clientY - touchStartY) > Math.abs(e.touches[0].clientX - touchStartX)) {
            const yVal = 1.01 * e.touches[0].clientY
            const returnVal = yVal - touchStartY
            this.setState({
              touchStartY: yVal,
              touchStartX: e.touches[0].clientX
            })
            return returnVal
          } else {
            const xVal = 1.01 * e.touches[0].clientX
            const returnVal = xVal - touchStartX
            this.setState({
              touchStartX: xVal,
              touchStartY: e.touches[0].clientY
            })
            return returnVal
          }
        }
      } else {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          return e.deltaY * 0.9
        } else {
          return e.deltaX * 0.9
        }
      }
    }
    const mousePos = Math.floor(rawData())
    const animationVal = this.animValSwitch()
    const newAnimationVal = (animationVal.val + mousePos)
    const newAnimationValNeg = (animationVal.val - mousePos)

    this.setCurrentScrollDir(mousePos)

    if (!this.canIscroll()) return

    const scrolling = () => {
      scrollInverted
        ? this.setState({
          [animationVal.name]: newAnimationValNeg,
          increment: mousePos
        }) : this.setState({
          [animationVal.name]: newAnimationVal,
          increment: mousePos
        })
    }

    // use raf library for requestAnimationFrame polyfill
    raf(scrolling)
  }

  handleTouchStart (e) {
    // if mobile assign touch origin point
    const { isMobile } = this.props
    if (isMobile) {
      this.setState({
        touchStartX: e.touches[0].clientX,
        touchStartY: e.touches[0].clientY
      })
    }
  }

  handleScroll (e) {
    // handler that distributes event to all redux functionality
    const { increment, scrollTiplier } = this.state
    e.preventDefault()
    this.setScrollStyleState()
    this.animateTheScroll(e)
    this.trackCurrentPosition()
    this.navigator()
    this.props.getRawScrollData({
      increment,
      percent: scrollTiplier * 100
    })
  }

  getStyles () {
    const { colors: { cur1 }, routeData: { navRules: { style: { height, width } } } } = this.props
    return {
      ScrollOMaticStyles: {
        backgroundColor: cur1,
        position: 'relative',
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box',
        overflow: 'hidden'
      },
      ScrollTrayStyles: {
        boxSizing: 'border-box',
        // filter: 'invert(50%)',
        height: `${Math.floor(height * 100)}vh`,
        width: `${Math.floor(width * 100)}vw`,
        willChange: 'transform',
        display: 'inline-flex',
        position: 'absolute',
        overflowScrolling: 'touch',
        WebkitOverflowScrolling: 'touch',
        overflow: 'hidden'
      }
    }
  }

  render () {
    return (
      <div className='scroll-o-matic' ref={(ref) => { this.scrollOMatic = ref }}
        style={this.getStyles().ScrollOMaticStyles} onWheel={this.handleScroll} onTouchMove={this.handleScroll} onTouchStart={this.handleTouchStart}>
        <Motion style={{ amt: spring(this.animValSwitch().val, this.props.isMobile ? { stiffness: 85, damping: 15 } : presets.noWobble) }}>
          { ({ amt }) => (
            <div className='scroll-tray' ref={(scrollTray) => { this.scrollTray = scrollTray }}
              style={{ ...this.getStyles().ScrollTrayStyles, transform: this.scrollDirTransformer(+amt.toFixed(3)) }}>
              <PerformanceGate checkedProps={this.props.children}>
                { this.props.children }
              </PerformanceGate>
              {/* <TesterAnimatedThing colors={this.props.colors} layout={this.props.layout} rawScrollData={this.props.rawScrollData} amt={+amt.toFixed(3)} /> */}
            </div>
          )}
        </Motion>
        <style jsx>{`
          .scroll-o-matic {}
          .scroll-tray {
            z-index: 0;
          }
        `}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    transitionOrigin: state.router.transitionOrigin,
    prevNextRoutes: state.router.prevNextRoutes,
    transitionDirection: state.router.transitionDirection,
    layout: state.scroll.layout,
    rawScrollData: state.scroll.rawScrollData,
    scrollOMaticLocked: state.scroll.scrollOMaticLocked,
    colors: state.ui.colors,
    freshLoad: state.functional.freshLoad
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getNewOriginPos: (transRoute, transDir, widthHeight) => dispatch(getNewOriginPos(transRoute, transDir, widthHeight)),
    transitionRoute: routerData => dispatch(transitionRoute(routerData)),
    setPrevNextRoutes: routerData => dispatch(setPrevNextRoutes(routerData)),
    setScrollLayoutRules: layoutData => dispatch(setScrollLayoutRules(layoutData)),
    getRawScrollData: scrollData => dispatch(getRawScrollData(scrollData)),
    setColorScheme: colorObj => dispatch(setColorScheme(colorObj)),
    isFreshLoad: bool => dispatch(isFreshLoad(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollOMatic)

ScrollOMatic.PropTypes = {
  isMobile: PropTypes.bool.isRequired,
  freshLoad: PropTypes.bool.isRequired,
  isFreshLoad: PropTypes.func.isRequired,
  getNewOriginPos: PropTypes.func.isRequired,
  prevNextRoutes: PropTypes.object.isRequired,
  transitionRoute: PropTypes.func.isRequired,
  setScrollLayoutRules: PropTypes.func.isRequired,
  setColorScheme: PropTypes.func.isRequired,
  layout: PropTypes.object.isRequired,
  rawScrollData: PropTypes.object.isRequired,
  getRawScrollData: PropTypes.func.isRequired,
  scrollOMaticLocked: PropTypes.bool.isRequired,
  colors: PropTypes.object.isRequired,
  transitionOrigin: PropTypes.object.isRequired,
  transitionDirection: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  routeData: PropTypes.object.isRequired,
  scrollInverted: PropTypes.bool.isRequired
}
