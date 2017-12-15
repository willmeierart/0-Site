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

    const { routeData: {
      bgColor1,
      navRules: {
        initScrollAxis,
        style: {
          backgroundImageForward
        }
      }
    },
    transitionOrigin: { x, y } } = props

    this.state = {
      currentColor: bgColor1,
      isEndOfScroll: false,
      canScroll: false,
      animValues: 0,
      animValsY: y,
      animValsX: x,
      currentScrollDir: 'forward',
      currentScrollAxis: initScrollAxis || 'x',
      bgImage: backgroundImageForward,
      current: -1,
      bounds: -1
    }
    binder(this, [
      'handleScroll',
      'resetMin',
      'resetMax',
      'navigator',
      'canIscroll',
      // 'getLayoutData',
      'setCurrentScrollDir',
      'setScrollStyleState',
      'scrollDirTransformer',
      'animateTheScroll',
      'setScrollDirAxis',
      'animValSwitch',
      'trackCurrentPosition'
    ])
  }

  componentDidMount () {
    Router.prefetchRoute('main', { slug: this.props.routeData.nextRoute })
    Router.prefetchRoute('main', { slug: this.props.routeData.prevRoute })

    const scrollOMatic = DOM.findDOMNode(this.scrollOMatic)
    const scrollTray = DOM.findDOMNode(this.scrollTray)
    const { leftUp, rightDown } = this.props.routeData.navRules

    this.props.setScrollLayoutRules({ scrollOMatic, scrollTray, leftUp, rightDown })

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

  // getLayoutData () {
  //   const { currentScrollAxis } = this.state
  //   const { leftUp, rightDown } = this.props.routeData.navRules
  //   const currentVal = this.animValSwitch().val
  //   const scrollOMatic = DOM.findDOMNode(this.scrollOMatic)
  //   const scrollTray = DOM.findDOMNode(this.scrollTray)
  //   const scrollOMaticRect = scrollOMatic.getBoundingClientRect()
  //   const scrollOMaticWidth = scrollOMaticRect.width
  //   const scrollOMaticHeight = scrollOMaticRect.height
  //   const trayOffsetHeight = scrollTray.offsetHeight
  //   const trayOffsetWidth = scrollTray.offsetWidth
  //   return {
  //     currentVal,
  //     scrollTray,
  //     scrollOMatic,
  //     scrollOMaticRect,
  //     scrollOMaticWidth,
  //     scrollOMaticHeight,
  //     trayOffsetHeight,
  //     trayOffsetWidth,
  //     bounds: currentScrollAxis === 'y'
  //       ? -(trayOffsetHeight - scrollOMaticHeight)
  //       : -(trayOffsetWidth - scrollOMaticWidth),
  //     trayTop: scrollTray.offsetTop,
  //     trayLeft: scrollTray.offsetLeft,
  //     scrollOMaticTop: scrollOMaticRect.top,
  //     scrollOMaticLeft: scrollOMaticRect.left,
  //     equations: {
  //       shouldBePrevRoute: leftUp === 'up'
  //         ? -(currentVal - scrollOMaticHeight) + 1
  //         : -(currentVal - scrollOMaticWidth) + 1,
  //       shouldBePrevRouteBool: leftUp === 'up'
  //         ? -(currentVal - scrollOMaticHeight) + 1 >= trayOffsetHeight
  //         : -(currentVal - scrollOMaticWidth) + 1 >= trayOffsetWidth,
  //       shouldBeNextRoute: rightDown === 'down'
  //         ? (currentVal / (scrollOMaticHeight - trayOffsetHeight))
  //         : (currentVal / (scrollOMaticWidth - trayOffsetWidth)),
  //       shouldBeNextRouteBool: rightDown === 'down'
  //         ? (currentVal / (scrollOMaticHeight - trayOffsetHeight)) < 0
  //         : (currentVal / (scrollOMaticWidth - trayOffsetWidth)) < 0
  //     }
  //   }
  // }

  animValSwitch () {
    const { animValues, animValsX, animValsY, currentScrollAxis } = this.state
    const { dualAxis } = this.props
    const valSwitch = !dualAxis
      ? { name: 'animValues', val: animValues }
      : currentScrollAxis === 'x'
        ? { name: 'animValsX', val: animValsX }
        : { name: 'animValsY', val: animValsY }
    return valSwitch
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

  canIscroll () {
    const { layout } = this.props
    const { currentScrollDir } = this.state
    const { leftUp, rightDown } = this.props.routeData.navRules
    const horizontalConditions = (leftUp === 'left' && currentScrollDir === 'back') || (rightDown === 'right' && currentScrollDir === 'forward')
    const verticalConditions = (leftUp === 'up' && currentScrollDir === 'back') || (rightDown === 'down' && currentScrollDir === 'forward')
    const canScrollSideways = horizontalConditions && (layout.trayLeft < layout.scrollOMaticLeft || layout.trayOffsetWidth > layout.scrollOMaticWidth)
    const canScrollVertical = verticalConditions && (layout.trayTop < layout.scrollOMaticTop || layout.trayOffsetHeight > layout.scrollOMaticHeight)
    return canScrollVertical || canScrollSideways
  }

  trackCurrentPosition () {
    const { layout: { widthMargin, heightMargin } } = this.props
    const { currentScrollAxis } = this.state
    const bounds = currentScrollAxis === 'y'
      ? heightMargin
      : widthMargin
    const current = this.animValSwitch().val
    this.setState({ bounds: bounds, current: current })
  }

  navigator () {
    const { current } = this.state
    const {
      layout: {
        scrollOMaticHeight,
        scrollOMaticWidth,
        widthMargin,
        heightMargin
      },
      routeData: {
        navRules: {
          leftUp,
          rightDown
        },
        nextRoute,
        prevRoute
      },
      getNewOriginPos
    } = this.props

    const shouldBePrevRoute = leftUp === 'up'
      ? current >= 0
      : current >= 0
    const shouldBeNextRoute = rightDown === 'down'
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
      console.log(widthHeight)
      console.log(widthMargin, heightMargin)
      shouldBeNextRoute
        ? getNewOriginPos(nextRoute, 'forward', widthHeight)
        : getNewOriginPos(prevRoute, 'back', widthHeight)
      this.props.transitionRoute(routerData)
    }

    console.log(current, widthMargin, heightMargin)
    
    if (shouldBeNextRoute || shouldBePrevRoute) {
      shouldBeNextRoute
        ? console.log('next')
        : console.log('prev')
    }
  }

  setCurrentScrollDir (dir) { this.setState({ currentScrollDir: dir }) }

  setScrollStyleState () {
    const {
      layout: {
        scrollOMaticHeight,
        scrollOMaticWidth,
        trayOffsetHeight,
        trayOffsetWidth
      },
      routeData: {
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

    const scrollOMaticDim = this.state.currentScrollAxis === 'x' ? scrollOMaticWidth : scrollOMaticHeight
    const trayScrollDim = this.state.currentScrollAxis === 'x' ? trayOffsetWidth : trayOffsetHeight

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
    let amt3 = amt ? amt.toFixed(3) : 0
    const { leftUp, rightDown } = this.props.routeData.navRules
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
    const { routeData: { navRules: { leftUp, rightDown } }, scrollInverted } = this.props
    const { currentScrollDir } = this.state
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
    const { scrollInverted } = this.props
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
    this.trackCurrentPosition()
  }

  render () {
    const { height, width } = this.props.routeData.navRules.style
    const springConfig = presets.noWobble
    const axisVals = this.animValSwitch().val
    // console.log(axisVals)
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
    transitionOrigin: state.router.transitionOrigin,
    layout: state.scroll.layout
    // state.
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
