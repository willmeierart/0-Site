import React, { Component } from 'react'
import DOM from 'react-dom'
import { connect } from 'react-redux'
import { Motion, spring, presets } from 'react-motion'
import raf from 'raf'
import { getRouteState, setScrollPos, configScrollEnv, getTransitionDir } from '../../lib/redux/actions'
import { fadeColor, binder } from '../../lib/_utils'
import { setScrollState } from '../../router/navRules'
import router from '../../router'
const { Router } = router

// TO DO: refactor some of this data out to an HOC ? ...... get it working first...

class ScrollOMatic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentColor: this.props.reduxRouteData.bgColor1,
      isEndOfScroll: false,
      canScroll: false,
      scrollInverted: true,
      animValues: 0,
      animValsY: 0,
      animValsX: 0,
      currentScrollDir: 'forward',
      bgImage: this.props.scrollConfig.style.backgroundImageForward
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
      'scrollDirTransformer'
    ])
  }

  componentDidMount () {
    Router.prefetchRoute('main', { slug: this.props.routeData.nextRoute })
    Router.prefetchRoute('main', { slug: this.props.routeData.prevRoute })

    const { type, route } = this.props.routeData

    // if (this.props.reduxRouteData.nextRoute === '') { this.props.getRouteState(route) }
    // if (type !== '') { this.props.configScrollEnv(type) }
    this.props.getRouteState(route)
    this.props.configScrollEnv(type)
    this.setScrollStyleState()
  }

  componentWillReceiveProps (nextProps) {
    // this.initScroll()
    if (this.props.children !== nextProps.children) { this.resetMin() }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (true &&
      this.calculate.timer !== void 0 &&
      this.props.children === nextProps.children &&
      this.state.animValues === nextState.animValues) {
      return false
    }
    if (true &&
      this.props.children === nextProps.children &&
      this.canIscroll() === false) {
      return false
      // should only fire if can't scroll
    }
    return true
  }

  componentDidUpdate () { this.calculate() }

  getLayoutData () {
    const scrollOMatic = DOM.findDOMNode(this.scrollOMatic)
    const scrollTray = DOM.findDOMNode(this.scrollTray)
    const trayScrollHeight = scrollTray.scrollHeight
    const scrollOMaticOffsetHeight = scrollOMatic.offsetHeight
    const currentVal = this.state.animValues
    const scrollOMaticRect = scrollOMatic.getBoundingClientRect()
    return {
      currentVal,
      scrollTray,
      scrollOMatic,
      scrollOMaticRect,
      trayScrollHeight,
      scrollOMaticOffsetHeight,
      bounds: -(trayScrollHeight - scrollOMaticOffsetHeight),
      trayTop: scrollTray.offsetTop,
      trayLeft: scrollTray.offsetLeft,
      trayOffsetHeight: scrollTray.offsetHeight,
      trayOffsetWidth: scrollTray.offsetWidth,
      trayScrollWidth: scrollTray.scrollWidth,
      scrollOMaticTop: scrollOMaticRect.top,
      scrollOMaticLeft: scrollOMaticRect.left,
      scrollOMaticWidth: scrollOMaticRect.width,
      scrollOMaticHeight: scrollOMaticRect.height,
      scrollOMaticOffsetWidth: scrollOMatic.offsetWidth
    }
  }

  calculate () {
    const layout = this.getLayoutData()
    clearTimeout(this.calculate.timer)
    this.calculate.timer = setTimeout(() => {
      const { bounds, currentVal } = layout
      // const currentVal = this.state.animValues
      if (currentVal > 1) {
        this.resetMin()
      } else if (currentVal <= bounds) {
        const x = bounds + 1
        this.resetMax(x)
      }
    })
  }

  resetMin () { this.setState({ animValues: 0 }) }
  resetMax (x) { this.setState({ animValues: x }) }

  canIscroll () {
    const layout = this.getLayoutData()
    const { currentScrollDir } = this.state
    const { leftUp, rightDown, type } = this.props.scrollConfig
    const horizontalConditions = (leftUp === 'left' && currentScrollDir === 'back') || (rightDown === 'right' && currentScrollDir === 'forward')
    const verticalConditions = (leftUp === 'up' && currentScrollDir === 'back') || (rightDown === 'down' && currentScrollDir === 'forward')
    const canScrollSideways = horizontalConditions && (layout.trayLeft < layout.scrollOMaticLeft || layout.trayOffsetWidth > layout.scrollOMaticWidth)
    const canScrollVertical = verticalConditions && (layout.trayTop < layout.scrollOMaticTop || layout.trayOffsetHeight > layout.scrollOMaticHeight)

    // console.log(currentScrollDir)
    // console.log(this.props)
    // console.log(layout)
    // console.log(verticalConditions)
    // console.log(horizontalConditions)
    // console.log(canScrollSideways)
    // console.log(canScrollVertical)

    return canScrollVertical || canScrollSideways
  }

  navigator () {
    const { nextRoute, prevRoute } = this.props.routeData
    const layout = this.getLayoutData()
    const { currentVal, scrollOMaticHeight, trayScrollHeight } = layout
    const shouldBeNextRoute = -(currentVal - scrollOMaticHeight) + 1 >= trayScrollHeight
    const shouldBePrevRoute = (currentVal / (scrollOMaticHeight - trayScrollHeight)) < 0 

    if (shouldBePrevRoute) {
      this.props.getRouteState(prevRoute)
      Router.pushRoute('main', { slug: this.props.routeData.prevRoute })
      this.props.setScrollPos({ x: 0, y: trayScrollHeight - 1 })
    }

    // console.log(currentVal)
    // console.log((currentVal / (scrollOMaticHeight - trayScrollHeight)))
    // console.log(this.state.animValues)

    if (shouldBeNextRoute) {
      this.props.getRouteState(nextRoute)
      Router.pushRoute('main', { slug: this.props.routeData.nextRoute })
      this.props.setScrollPos({ x: 0, y: 1 })
    }
  }

  setCurrentScrollDir (dir) { this.setState({ currentScrollDir: dir }) }

  setScrollStyleState () {
    const layout = this.getLayoutData()
    const { currentVal, scrollOMaticHeight, trayScrollHeight, trayOffsetHeight } = layout
    const { bgColor1, bgColor2 } = this.props.routeData
    const { type, style: { backgroundImageBack, backgroundImageForward } } = this.props.scrollConfig

     // THIS IS THE CORRECT FORMULA FOR CHANGING COLOR:
    const scrollTiplier = ((currentVal / (scrollOMaticHeight - trayScrollHeight))).toFixed(3)

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
    const { initScrollAxis, leftUp, rightDown } = this.props.scrollConfig
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

    return `translate3d(${x},${y},0)`
  }

  handleScroll (e) {
    e.preventDefault()
    // const yData = e.deltaY ? e.deltaY : e.deltaX
    // const xData = e.deltaX ? e.deltaX : e.deltaY
    const rawData = e.deltaY ? e.deltaY : e.deltaX
    const mousePos = Math.floor(rawData)
    const animationVal = this.state.animValues
    const newAnimationVal = (animationVal + mousePos)
    const newAnimationValNeg = (animationVal - mousePos)

    this.setState({
      currentScrollDir: this.state.scrollInverted
        ? (mousePos < 0 ? 'back' : 'forward')
        : (mousePos < 0 ? 'forward' : 'back')
    })

    if (!this.canIscroll()) return

    const scrolling = () => {
      this.state.scrollInverted
        ? this.setState({
          animValues: newAnimationValNeg
        }) : this.setState({
          animValues: newAnimationVal
        })
    }

    this.setScrollStyleState()
    this.navigator()
    raf(scrolling)
  }

  render () {
    const { minHeight, minWidth, left, top } = this.props.scrollConfig.style
    // const { config } = this.props
    // const { width, height } = style
    // const springConfig = config || presets.noWobble
    console.log(minHeight, minWidth);
    const springConfig = presets.noWobble
    return (
      <div className='scroll-o-matic' ref={(ref) => { this.scrollOMatic = ref }}
        style={{
          backgroundColor: this.state.currentColor, 
          position: 'relative',
          width: '100vw',
          height: '100vh'
        }} onWheel={this.handleScroll}>
        <Motion style={{ amt: spring(this.state.animValues, springConfig) }}>
          { ({ amt }) => (
            <div className='scroll-tray' ref={(scrollTray) => { this.scrollTray = scrollTray }}
              style={{
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
              { console.log(minWidth, minHeight) }
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
    transitionDir: state.nav.transitionDir
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getRouteState: route => dispatch(getRouteState(route)),
    setScrollPos: coords => dispatch(setScrollPos(coords)),
    configScrollEnv: type => dispatch(configScrollEnv(type)),
    getTransitionDir: dir => dispatch(getTransitionDir(dir))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollOMatic)
