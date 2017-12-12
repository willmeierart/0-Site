import React, { Component } from 'react'
import DOM from 'react-dom'
import { connect } from 'react-redux'
import { Motion, spring, presets } from 'react-motion'
import raf from 'raf'
import { getRouteState, setScrollPos, configScrollEnv, getTransitionOrigin } from '../../lib/redux/actions'
import { fadeColor, binder } from '../../lib/_utils'
import router from '../../router'
const { Router } = router

// TO DO: refactor some of this data out to an HOC ? ...... get it working first...

class ScrollOMatic extends Component {
  constructor (props) {
    super(props)

    const { scrollConfig: { initScrollAxis, style: { backgroundImageForward } }, transitionOrigin: { x, y } } = this.props

    console.log(x, y)

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
      'animValSwitcher'
    ])
  }

  componentDidMount () {
    Router.prefetchRoute('main', { slug: this.props.routeData.nextRoute })
    Router.prefetchRoute('main', { slug: this.props.routeData.prevRoute })

    const { routeData: { type, route }, transitionOrigin } = this.props
    // if (this.props.reduxRouteData.nextRoute === '') { this.props.getRouteState(route) }
    // if (type !== '') { this.props.configScrollEnv(type) }
    this.props.getRouteState(route)
    this.props.configScrollEnv(type)
    // this.setScrollOrigin(transitionOrigin)
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
      // should only fire if can't scroll
    }
    console.log('is updating');
    return true
  }

  componentDidUpdate () { this.calculate() }

  getLayoutData () {
    const { currentScrollAxis, dualAxis, animValues, animValsX, animValsY } = this.state
    const valSwitch = !dualAxis
      ? animValues
      : currentScrollAxis === 'x'
        ? animValsX
        : animValsY
    const currentVal = valSwitch
    const scrollOMatic = DOM.findDOMNode(this.scrollOMatic)
    const scrollTray = DOM.findDOMNode(this.scrollTray)
    const trayScrollHeight = scrollTray.scrollHeight
    const trayScrollWidth = scrollTray.scrollWidth
    const scrollOMaticOffsetHeight = scrollOMatic.offsetHeight
    const scrollOMaticOffsetWidth = scrollOMatic.offsetWidth
    const scrollOMaticRect = scrollOMatic.getBoundingClientRect()
    return {
      currentVal,
      scrollTray,
      scrollOMatic,
      scrollOMaticRect,
      trayScrollHeight,
      trayScrollWidth,
      scrollOMaticOffsetWidth,
      scrollOMaticOffsetHeight,
      bounds: currentScrollAxis === 'y'
        ? -(trayScrollHeight - scrollOMaticOffsetHeight)
        : -(trayScrollWidth - scrollOMaticOffsetWidth),
      trayTop: scrollTray.offsetTop,
      trayLeft: scrollTray.offsetLeft,
      trayOffsetHeight: scrollTray.offsetHeight,
      trayOffsetWidth: scrollTray.offsetWidth,
      scrollOMaticTop: scrollOMaticRect.top,
      scrollOMaticLeft: scrollOMaticRect.left,
      scrollOMaticWidth: scrollOMaticRect.width,
      scrollOMaticHeight: scrollOMaticRect.height
    }
  }

  animValSwitcher () {

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

  resetMin () {
    const { dualAxis, animValues, animValsX, animValsY, currentScrollAxis } = this.state
    const valSwitch = !dualAxis
      ? animValues
      : currentScrollAxis === 'x'
        ? animValsX
        : animValsY
    this.setState({ [valSwitch]: 0 })
  }
  resetMax (x) {
    const { dualAxis, animValues, animValsX, animValsY, currentScrollAxis } = this.state
    const valSwitch = !dualAxis
      ? animValues
      : currentScrollAxis === 'x'
        ? animValsX
        : animValsY
    this.setState({ [valSwitch]: x })
  }

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
      getRouteState, getTransitionOrigin, setScrollOrigin, transitionOrigin
    } = this.props
    const layout = this.getLayoutData()
    const { scrollOMaticHeight, scrollOMaticWidth, trayScrollHeight, trayScrollWidth } = layout
    const { currentVal } = layout

    const shouldBeNextRoute = leftUp === 'up'
      ? -(currentVal - scrollOMaticHeight) + 1 >= trayScrollHeight
      : -(currentVal - scrollOMaticWidth) + 1 >= trayScrollWidth

    const shouldBePrevRoute = rightDown === 'down'
      ? (currentVal / (scrollOMaticHeight - trayScrollHeight)) < 0
      : (currentVal / (scrollOMaticWidth - trayScrollWidth)) < 0

    if (shouldBePrevRoute) {
      const widthHeight = this.setScrollOrigin(transitionOrigin)
      getRouteState(prevRoute)
      Router.pushRoute('main', { slug: prevRoute })
      getTransitionOrigin(prevRoute, 'back', widthHeight)
      // this.props.setScrollPos({ x: 0, y: trayScrollHeight - 1 })
    }
    if (shouldBeNextRoute) {
      const widthHeight = this.setScrollOrigin(transitionOrigin)
      getRouteState(nextRoute)
      Router.pushRoute('main', { slug: nextRoute })
      getTransitionOrigin(nextRoute, 'forward', widthHeight)
      
      // this.props.setScrollPos({ x: 0, y: 1 })
    }
  }

  setCurrentScrollDir (dir) { this.setState({ currentScrollDir: dir }) }

  setScrollOrigin (originData) {
    const { x, y } = originData
    const layout = this.getLayoutData()
    const { trayOffsetWidth, scrollOMaticWidth, trayOffsetHeight, scrollOMaticHeight } = layout
    const { animValsX, animValsY } = this.state
    const thisX = x === 'max' ? scrollOMaticWidth - trayOffsetWidth : 0
    const thisY = y === 'max' ? scrollOMaticHeight - trayOffsetHeight : 0
    const coords = { x: thisX, y: thisY }
    console.log(x, y)
    console.log(layout)
    console.log(coords)
    // if (isNaN(animValsX) || isNaN(animValsY)) {
      // this.setState({
      //   animValsX: thisX,
      //   animValsY: thisY
      // })
    // }
    return [thisX, thisY]
  }

  setScrollStyleState () {
    const layout = this.getLayoutData()
    const { currentVal, scrollOMaticHeight, scrollOMaticWidth, trayScrollHeight, trayScrollWidth } = layout
    const { bgColor1, bgColor2 } = this.props.routeData
    const { style: { backgroundImageBack, backgroundImageForward } } = this.props.scrollConfig
    const scrollOMaticDim = this.state.currentScrollAxis === 'x' ? scrollOMaticWidth : scrollOMaticHeight
    const trayScrollDim = this.state.currentScrollAxis === 'x' ? trayScrollWidth : trayScrollHeight

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
        y = 0 // or this.state.animValsY if you go that route
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
    const { scrollInverted, currentScrollAxis, animValsX, animValsY, animValues, dualAxis } = this.state
    // const yData = e.deltaY ? e.deltaY : e.deltaX
    // const xData = e.deltaX ? e.deltaX : e.deltaY
    // const rawData = currentScrollAxis === 'x' ? xData : yData
    const rawData = e.deltaY ? e.deltaY : e.deltaX
    const mousePos = Math.floor(rawData)

    const animationValOp1 = animValues
    const animationValOp2 = currentScrollAxis === 'x' ? animValsX : animValsY
    const animationVal = dualAxis === false ? animationValOp1 : animationValOp2

    const newAnimationVal = (animationVal + mousePos)
    const newAnimationValNeg = (animationVal - mousePos)

    this.setScrollDirAxis(mousePos)

    if (!this.canIscroll()) return

    const scrolling = () => { // if you split animvalues into each axis, you'd set state on one or the other inside ternary here
      // scrollInverted
      //   ? this.setState({
      //     animValues: newAnimationValNeg
      //   }) : this.setState({
      //     animValues: newAnimationVal
      //   })

      // console.log(dualAxis)
      // console.log(currentScrollAxis)
      // console.log(newAnimationValNeg)
      // console.log(mousePos)
      // console.log(this.state.animValsX)

      !dualAxis
        ? scrollInverted
          ? this.setState({ animValues: newAnimationValNeg })
          : this.setState({ animValues: newAnimationVal })
        : scrollInverted
          ? currentScrollAxis === 'x'
            ? this.setState({ animValsX: newAnimationValNeg }) // right here
            : this.setState({ animValsY: newAnimationValNeg })
          : currentScrollAxis === 'x'
            ? this.setState({ animValsX: newAnimationVal })
            : this.setState({ animValsY: newAnimationVal })
    }

    raf(scrolling)
    console.log(raf(scrolling))
  }

  handleScroll (e) {
    e.preventDefault()
    this.setScrollStyleState()
    this.navigator()
    this.animateTheScroll(e)
  }

  render () {
    const { minHeight, minWidth } = this.props.scrollConfig.style
    const { currentScrollAxis, animValsX, animValsY, animValues, dualAxis } = this.state
    // const { config } = this.props
    // const { width, height } = style
    // const springConfig = config || presets.noWobble
    const springConfig = presets.noWobble
    const axisValOp1 = animValues
    const axisValOp2 = currentScrollAxis === 'x' ? animValsX : animValsY
    const axisVals = dualAxis === false ? axisValOp1 : axisValOp2
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
                height: minHeight,
                width: minWidth,
                transform: this.scrollDirTransformer(amt),
                willChange: 'transform',
                display: 'inline-flex',
                position: 'absolute'
              }}>
              { console.log(this.state, amt) }
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
