import React, { Component } from 'react'
import DOM from 'react-dom'
import { connect } from 'react-redux'
import { Motion, spring, presets } from 'react-motion'
import raf from 'raf'
import { getNewOriginPos, transitionRoute, setScrollLayoutRules } from '../../lib/redux/actions'
import { fadeColor, binder } from '../../lib/_utils'
import router from '../../router'
const { Router } = router

class ScrollOMatic extends Component {
  constructor (props) {
    super(props)

    const { routeData: { bgColor1, bgColor2, navRules: { style: { backgroundImageForward, backgroundImageBack } } }, transitionOrigin: { x, y }, transitionDirection } = props

    this.state = {
      currentColor: transitionDirection === 'forward' ? bgColor1 : bgColor2,
      isEndOfScroll: false,
      canScroll: false,
      animValues: 0,
      animValsY: y,
      animValsX: x,
      currentScrollDir: transitionDirection,
      bgImage: transitionDirection === 'forward' ? backgroundImageForward : backgroundImageBack,
      current: -1,
      bounds: -1
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
      'preventNativeScrollNav'
    ])
  }

  componentWillUnmount () { window.removeEventListener('resize', this.props.setScrollLayoutRules) }

  componentDidMount () {
    Router.prefetchRoute('main', { slug: this.props.routeData.nextRoute })
    Router.prefetchRoute('main', { slug: this.props.routeData.prevRoute })

    const scrollOMatic = DOM.findDOMNode(this.scrollOMatic)
    const scrollTray = DOM.findDOMNode(this.scrollTray)

    this.trackCurrentPosition()

    this.props.setScrollLayoutRules({ scrollOMatic, scrollTray })

    window.addEventListener('resize', () => this.props.setScrollLayoutRules({ scrollOMatic, scrollTray }))

    console.log(this.props)
  }

  componentWillReceiveProps (nextProps) { (this.props.children !== nextProps.children) && this.resetMin() }

  shouldComponentUpdate (nextProps, nextState) {
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

  preventNativeScrollNav () {}

  canIscroll () {
    const { layout, routeData: { type } } = this.props
    const canScrollSideways = type.indexOf('top') === 0 && (layout.trayLeft < layout.scrollOMaticLeft || layout.trayOffsetWidth > layout.scrollOMaticWidth)
    const canScrollVertical = type.indexOf('top') === -1 && (layout.trayTop < layout.scrollOMaticTop || layout.trayOffsetHeight > layout.scrollOMaticHeight)
    return canScrollVertical || canScrollSideways
  }

  calculate () {
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
    const { animValsX, animValsY } = this.state
    const { routeData: { type } } = this.props
    const valSwitch = type.indexOf('top') === 0
      ? { name: 'animValsX', val: animValsX }
      : { name: 'animValsY', val: animValsY }
    return valSwitch
  }

  trackCurrentPosition () {
    const { layout: { widthMargin, heightMargin }, routeData: { type } } = this.props
    const bounds = type.indexOf('top') !== 0
      ? heightMargin
      : widthMargin
    const current = this.animValSwitch().val
    this.setState({ bounds: bounds, current: current })
  }

  navigator () {
    const { current } = this.state
    const { layout: { scrollOMaticHeight, scrollOMaticWidth, widthMargin, heightMargin }, routeData: { nextRoute, prevRoute, type }, getNewOriginPos } = this.props

    const shouldBePrevRoute = current >= 0
    const shouldBeNextRoute = type.indexOf('top') !== 0
      ? heightMargin >= current
      : widthMargin >= current

    const routerData = {
      prevTrigger: shouldBePrevRoute,
      nextTrigger: shouldBeNextRoute,
      prevRoute,
      nextRoute
    }

    if (shouldBeNextRoute || shouldBePrevRoute) {
      const widthHeight = [scrollOMaticWidth, scrollOMaticHeight]
      shouldBeNextRoute
        ? getNewOriginPos(nextRoute, 'forward', widthHeight)
        : getNewOriginPos(prevRoute, 'back', widthHeight)
      this.props.transitionRoute(routerData)
    }
  }

  setCurrentScrollDir (mousePos) {
    const { scrollInverted } = this.props
    this.setState({ currentScrollDir: scrollInverted
       ? mousePos < 0 ? 'back' : 'forward'
       : mousePos < 0 ? 'forward' : 'back'
    })
  }

  setScrollStyleState () {
    const {
      layout: {
        scrollOMaticHeight,
        scrollOMaticWidth,
        trayOffsetHeight,
        trayOffsetWidth
      },
      routeData: {
        type,
        bgColor1,
        bgColor2,
        navRules: {
          style: {
            backgroundImageBack,
            backgroundImageForward
          }
        }
      }
     } = this.props
    const { current } = this.state

    const scrollOMaticDim = type.indexOf('top') === 0 ? scrollOMaticWidth : scrollOMaticHeight
    const trayScrollDim = type.indexOf('top') === 0 ? trayOffsetWidth : trayOffsetHeight

     // THIS IS THE CORRECT FORMULA FOR CHANGING COLOR:
    const scrollTiplier = ((current / (scrollOMaticDim - trayScrollDim))).toFixed(3)

    const dirSwitcher = (b, f) => this.state.currentScrollDir === 'back' ? b : f

    const styles = {
      bgImage: dirSwitcher(backgroundImageBack, backgroundImageForward),
      currentColor: fadeColor(scrollTiplier, [bgColor1, bgColor2])
    }
    const { bgImage, currentColor } = styles

    this.setState({
      bgImage,
      currentColor
    })
  }

  scrollDirTransformer (amt) {
    let amt3 = amt ? amt.toFixed(0) : -1
    const { type } = this.props.routeData
    const { animValsX, animValsY } = this.state
    let x = animValsX
    let y = animValsY
    if (type.indexOf('top') === 0) {
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
    const { scrollInverted } = this.props
    const rawData = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
    const mousePos = Math.floor(rawData)
    const animationVal = this.animValSwitch()
    const newAnimationVal = (animationVal.val + mousePos)
    const newAnimationValNeg = (animationVal.val - mousePos)

    this.setCurrentScrollDir(mousePos)

    if (!this.canIscroll()) return

    const scrolling = () => {
      scrollInverted
        ? this.setState({
          [animationVal.name]: newAnimationValNeg
        }) : this.setState({
          [animationVal.name]: newAnimationVal
        })
    }

    raf(scrolling)
  }

  handleScroll (e) {
    e.preventDefault()
    this.setScrollStyleState()
    this.animateTheScroll(e)
    this.trackCurrentPosition()
    this.navigator()
  }

  render () {
    const { height, width } = this.props.routeData.navRules.style
    const springConfig = presets.noWobble
    const axisVals = this.animValSwitch().val
    return (
      <div className='scroll-o-matic' ref={(ref) => { this.scrollOMatic = ref }}
        style={{
          backgroundColor: this.state.currentColor,
          position: 'relative',
          width: '100vw',
          height: '100vh',
          boxSizing: 'border-box'
        }} onWheel={this.handleScroll}>
        <Motion style={{ amt: spring(axisVals, springConfig) }}>
          { ({ amt }) => (
            <div className='scroll-tray' ref={(scrollTray) => { this.scrollTray = scrollTray }}
              style={{
                boxSizing: 'border-box',
                background: `url(${this.state.bgImage})`,
                height: `${height}00vh`,
                width: `${width}00vw`,
                transform: this.scrollDirTransformer(amt),
                willChange: 'transform',
                display: 'inline-flex',
                position: 'absolute'
              }}>
              { this.props.children }
            </div>
          )}
        </Motion>
        <style jsx>{`
          .scroll-o-matic {}
          .scroll-tray {
            z-index:0;
          }
        `}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    transitionOrigin: state.router.transitionOrigin,
    transitionDirection: state.router.transitionDirection,
    layout: state.scroll.layout
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getNewOriginPos: (transRoute, transDir, widthHeight) => dispatch(getNewOriginPos(transRoute, transDir, widthHeight)),
    transitionRoute: routerData => dispatch(transitionRoute(routerData)),
    setScrollLayoutRules: layoutData => dispatch(setScrollLayoutRules(layoutData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollOMatic)
