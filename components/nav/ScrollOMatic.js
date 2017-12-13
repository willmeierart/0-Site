import React, { Component } from 'react'
import DOM from 'react-dom'
import { connect } from 'react-redux'
import { Motion, spring, presets } from 'react-motion'
import raf from 'raf'
import { getRouteState, setScrollPos, configScrollEnv, getTransitionOrigin } from '../../lib/redux/actions'
import { fadeColor, binder } from '../../lib/_utils'
import router from '../../router'
const { Router } = router

class ScrollOMatic extends Component {
  constructor (props) {
    super(props)

    const { scrollConfig: { initScrollAxis, style: { backgroundImageForward } }, transitionOrigin: { x, y } } = this.props

    this.state = {
      currentColor: this.props.routeData.bgColor1,
      isEndOfScroll: false,
      canScroll: false,
      scrollInverted: true,
      animValues: 0,
      animValsY: y,
      animValsX: x,
      dualAxis: true,
      currentScrollDir: 'forward',
      currentScrollAxis: initScrollAxis,
      bgImage: backgroundImageForward
    }
    binder(this, [
      'handleScroll',
      'resetMin',
      'resetMax',
      'navigator',
      'canIscroll',
      'getLayoutData',
      'setCurrentScrollDir',
      'setScrollStyleState',
      'scrollDirTransformer',
      'animateTheScroll',
      'setScrollOrigin',
      'setScrollDirAxis',
      'animValSwitch'
    ])
  }

  componentDidMount () {
    Router.prefetchRoute('main', { slug: this.props.routeData.nextRoute })
    Router.prefetchRoute('main', { slug: this.props.routeData.prevRoute })

    const { routeData: { type, route } } = this.props
    this.props.getRouteState(route)
    this.props.configScrollEnv(type)
    console.log(this.props.transitionOrigin)
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

  getLayoutData () {
    const { currentScrollAxis } = this.state
    const { leftUp, rightDown } = this.props.scrollConfig
    const currentVal = this.animValSwitch().val
    const scrollOMatic = DOM.findDOMNode(this.scrollOMatic)
    const scrollTray = DOM.findDOMNode(this.scrollTray)
    const scrollOMaticRect = scrollOMatic.getBoundingClientRect()
    const scrollOMaticWidth = scrollOMaticRect.width
    const scrollOMaticHeight = scrollOMaticRect.height
    const trayOffsetHeight = scrollTray.offsetHeight
    const trayOffsetWidth = scrollTray.offsetWidth
    return {
      currentVal,
      scrollTray,
      scrollOMatic,
      scrollOMaticRect,
      scrollOMaticWidth,
      scrollOMaticHeight,
      trayOffsetHeight,
      trayOffsetWidth,
      bounds: currentScrollAxis === 'y'
        ? -(trayOffsetHeight - scrollOMaticHeight)
        : -(trayOffsetWidth - scrollOMaticWidth),
      trayTop: scrollTray.offsetTop,
      trayLeft: scrollTray.offsetLeft,
      scrollOMaticTop: scrollOMaticRect.top,
      scrollOMaticLeft: scrollOMaticRect.left,
      equations: {
        shouldBePrevRoute: leftUp === 'up'
          ? -(currentVal - scrollOMaticHeight) + 1
          : -(currentVal - scrollOMaticWidth) + 1,
        shouldBePrevRouteBool: leftUp === 'up'
          ? -(currentVal - scrollOMaticHeight) + 1 >= trayOffsetHeight
          : -(currentVal - scrollOMaticWidth) + 1 >= trayOffsetWidth,
        shouldBeNextRoute: rightDown === 'down'
          ? (currentVal / (scrollOMaticHeight - trayOffsetHeight))
          : (currentVal / (scrollOMaticWidth - trayOffsetWidth)),
        shouldBeNextRouteBool: rightDown === 'down'
          ? (currentVal / (scrollOMaticHeight - trayOffsetHeight)) < 0
          : (currentVal / (scrollOMaticWidth - trayOffsetWidth)) < 0
      }
    }
  }

  animValSwitch () {
    const { dualAxis, animValues, animValsX, animValsY, currentScrollAxis } = this.state
    const valSwitch = !dualAxis
      ? { name: 'animValues', val: animValues }
      : currentScrollAxis === 'x'
        ? { name: 'animValsX', val: animValsX }
        : { name: 'animValsY', val: animValsY }
    return valSwitch
  }

  calculate () {
    const layout = this.getLayoutData()
    clearTimeout(this.calculate.timer)
    this.calculate.timer = setTimeout(() => {
      const { bounds, currentVal } = layout
      if (currentVal > 1) {
        this.resetMin()
      } else if (currentVal <= bounds) {
        const x = bounds + 1
        this.resetMax(x)
      }
    })
  }

  resetMin () { this.setState({ [this.animValSwitch().name]: 0 }) }
  resetMax (x) { this.setState({ [this.animValSwitch().name]: x }) }

  canIscroll () {
    const layout = this.getLayoutData()
    const { currentScrollDir } = this.state
    const { leftUp, rightDown } = this.props.scrollConfig
    const horizontalConditions = (leftUp === 'left' && currentScrollDir === 'back') || (rightDown === 'right' && currentScrollDir === 'forward')
    const verticalConditions = (leftUp === 'up' && currentScrollDir === 'back') || (rightDown === 'down' && currentScrollDir === 'forward')
    const canScrollSideways = horizontalConditions && (layout.trayLeft < layout.scrollOMaticLeft || layout.trayOffsetWidth > layout.scrollOMaticWidth)
    const canScrollVertical = verticalConditions && (layout.trayTop < layout.scrollOMaticTop || layout.trayOffsetHeight > layout.scrollOMaticHeight)
    return canScrollVertical || canScrollSideways
  }

  navigator () {
    const {
      routeData: { nextRoute, prevRoute },
      scrollConfig: { leftUp, rightDown },
      getRouteState, getTransitionOrigin } = this.props
    const layout = this.getLayoutData()
    const { equations: { shouldBeNextRouteBool, shouldBePrevRouteBool },
      scrollOMaticHeight, scrollOMaticWidth, trayOffsetHeight, trayOffsetWidth } = layout

    if (shouldBePrevRouteBool) {
      // const widthHeight = this.setScrollOrigin(scrollPos)
      const widthHeight = [scrollOMaticWidth, scrollOMaticHeight]
      getTransitionOrigin(prevRoute, 'back', widthHeight)
      const scrollPosObj = {
        x: leftUp === 'up' ? 0 : -trayOffsetHeight + 1,
        y: leftUp === 'up' ? -trayOffsetWidth + 1 : 0
      }
      this.props.setScrollPos(scrollPosObj)
      getRouteState(prevRoute)
      Router.pushRoute('main', { slug: prevRoute })
    }
    if (shouldBeNextRouteBool) {
      // const widthHeight = this.setScrollOrigin(scrollPos)
      const widthHeight = [scrollOMaticWidth, scrollOMaticHeight]
      getTransitionOrigin(nextRoute, 'forward', widthHeight)
      const scrollPosObj = {
        x: rightDown === 'down' ? 0 : -1,
        y: rightDown === 'down' ? -1 : 0
      }
      this.props.setScrollPos(scrollPosObj)
      // this.props.setScrollPos({ x: 0, y: -1 })
      getRouteState(nextRoute)
      Router.pushRoute('main', { slug: nextRoute })
    }
  }

  setCurrentScrollDir (dir) { this.setState({ currentScrollDir: dir }) }

  setScrollOrigin (originData) {
    const { x, y } = originData
    const layout = this.getLayoutData()
    const { trayOffsetWidth, scrollOMaticWidth, trayOffsetHeight, scrollOMaticHeight } = layout
    const thisX = x === 'max' ? scrollOMaticWidth - trayOffsetWidth : 0
    const thisY = y === 'max' ? scrollOMaticHeight - trayOffsetHeight : 0
    const coords = { x: thisX, y: thisY }
    console.log(x, y)
    console.log(layout)
    console.log(coords)

    // return [thisX, thisY]
    return [x, y]
  }

  setScrollStyleState () {
    const layout = this.getLayoutData()
    console.log(layout)
    const { currentVal, scrollOMaticHeight, scrollOMaticWidth, trayOffsetHeight, trayOffsetWidth } = layout
    const { bgColor1, bgColor2 } = this.props.routeData
    const { style: { backgroundImageBack, backgroundImageForward } } = this.props.scrollConfig
    const scrollOMaticDim = this.state.currentScrollAxis === 'x' ? scrollOMaticWidth : scrollOMaticHeight
    const trayScrollDim = this.state.currentScrollAxis === 'x' ? trayOffsetWidth : trayOffsetHeight

     // THIS IS THE CORRECT FORMULA FOR CHANGING COLOR:
    const scrollTiplier = ((currentVal / (scrollOMaticDim - trayScrollDim))).toFixed(3)

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
    let amt3 = amt ? amt.toFixed(3) : 0
    const { leftUp, rightDown } = this.props.scrollConfig
    const { currentScrollDir } = this.state
    let x = 0
    let y = 0
    if (currentScrollDir === 'back') {
      if (leftUp === 'left') {
        x = `${amt3}px`
        y = 0
      } else {
        x = 0
        y = `${amt3}px`
      }
    } else {
      if (rightDown === 'right') {
        x = `${amt3}px`
        y = 0
      } else {
        x = 0
        y = `${amt3}px`
      }
    }

    const magicVal = `translate3d(${x},${y},0)`
    return magicVal
  }

  setScrollDirAxis (mousePos) {
    const { leftUp, rightDown } = this.props.scrollConfig
    const { currentScrollDir, scrollInverted } = this.state
    this.setState({
      currentScrollDir: scrollInverted
        ? (mousePos < 0 ? 'back' : 'forward')
        : (mousePos < 0 ? 'forward' : 'back'),
      currentScrollAxis: currentScrollDir === 'forward'
        ? (rightDown === 'right' ? 'x' : 'y')
        : (leftUp === 'left' ? 'x' : 'y')
    })
  }

  animateTheScroll (e) {
    const { scrollInverted } = this.state
    const rawData = e.deltaY ? e.deltaY : e.deltaX
    const mousePos = Math.floor(rawData)
    const animationVal = this.animValSwitch()
    const newAnimationVal = (animationVal.val + mousePos)
    const newAnimationValNeg = (animationVal.val - mousePos)

    this.setScrollDirAxis(mousePos)

    if (!this.canIscroll()) return

    const scrolling = () => {
      scrollInverted
        ? this.setState({
          [animationVal.name]: newAnimationValNeg
        }) : this.setState({
          [animationVal.name]: newAnimationVal
        })

      // console.log(dualAxis)
      // console.log(currentScrollAxis)
      // console.log(newAnimationValNeg)
      // console.log(mousePos)
      // console.log(this.state.animValsX)
    }

    raf(scrolling)
  }

  handleScroll (e) {
    e.preventDefault()
    this.setScrollStyleState()
    this.navigator()
    this.animateTheScroll(e)
  }

  render () {
    const { height, width } = this.props.scrollConfig.style
    const springConfig = presets.noWobble
    const axisVals = this.animValSwitch().val
    console.log(axisVals)
    return (
      <div className='scroll-o-matic' ref={(ref) => { this.scrollOMatic = ref }}
        style={{
          backgroundColor: this.state.currentColor,
          position: 'relative',
          width: '100vw',
          height: '100vh'
        }} onWheel={this.handleScroll}>
        <Motion style={{ amt: spring(axisVals, springConfig) }}>
          { ({ amt }) => (
            <div className='scroll-tray' ref={(scrollTray) => { this.scrollTray = scrollTray }}
              style={{
                boxSizing: 'border-box',
                borderTop: '10px solid red',
                borderLeft: '10px solid purple',
                borderRight: '10px solid pink',
                borderMargin: '10px solid salmon',          
                background: `url(${this.state.bgImage})`,
                height: `${height}00vh`,
                width: `${width}00vw`,
                transform: this.scrollDirTransformer(amt),
                willChange: 'transform',
                display: 'inline-flex',
                position: 'absolute'
              }}>
              {/* { console.log(this.state, amt) } */}
              { this.props.children }
            </div>
          )}
        </Motion>
        <style jsx>{`
          .scroll-o-matic {
            background-color: ${this.state.currentColor};
          }
        `}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    reduxRouteData: state.nav.routeData,
    scrollPos: state.nav.scrollPos,
    scrollConfig: state.nav.scrollConfig,
    transitionOrigin: state.nav.transitionOrigin
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getRouteState: route => dispatch(getRouteState(route)),
    setScrollPos: coords => dispatch(setScrollPos(coords)),
    configScrollEnv: type => dispatch(configScrollEnv(type)),
    getTransitionOrigin: (transRoute, transDir, widthHeight) => dispatch(getTransitionOrigin(transRoute, transDir, widthHeight))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollOMatic)
