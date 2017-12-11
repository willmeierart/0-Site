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
      'changeBGcolor',
      'setCurrentScrollDir',
      'setScrollStyleState'
    ])
  }

  componentDidMount () {
    Router.prefetchRoute('main', { slug: this.props.routeData.nextRoute })
    Router.prefetchRoute('main', { slug: this.props.routeData.prevRoute })

    const { type, bgColor1, bgColor2, /* subpages, */ route } = this.props.routeData

    if (this.props.reduxRouteData.nextRoute === '') {
      this.props.getRouteState(route)
    }
    if (type !== '') {
      this.props.configScrollEnv(type)
    }

    console.log(this.props)
  }

  componentWillReceiveProps (nextProps) {
    // this.initScroll()
    if (this.props.children !== nextProps.children) {
      this.resetMin()
    }
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
    const max = scrollOMatic.scrollHeight
    const win = scrollOMatic.offsetHeight
    const currentVal = this.state.animValues
    const bounds = -(max - win)
    const trayTop = scrollTray.offsetTop
    const trayOffsetHeight = scrollTray.offsetHeight
    const trayScrollHeight = scrollTray.scrollHeight
    const scrollOMaticRect = scrollOMatic.getBoundingClientRect()
    const scrollOMaticTop = scrollOMaticRect.top
    const scrollOMaticHeight = scrollOMaticRect.height
    const scrollOMaticOffsetHeight = scrollOMatic.offsetHeight
    return {
      currentVal,
      bounds,
      scrollTray,
      trayTop,
      trayOffsetHeight,
      trayScrollHeight,
      scrollOMatic,
      scrollOMaticTop,
      scrollOMaticHeight,
      scrollOMaticOffsetHeight,
      scrollOMaticRect
    }
  }

  calculate () {
    const layout = this.getLayoutData()
    clearTimeout(this.calculate.timer)
    this.calculate.timer = setTimeout(() => {
      const max = layout.trayScrollHeight
      const win = layout.scrollOMaticOffsetHeight
      const currentVal = this.state.animValues
      const bounds = -(max - win)
      // console.log(bounds)
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
    return layout.trayOffsetTop < layout.scrollOMaticTop ||
      layout.trayOffsetHeight > layout.scrollOMaticHeight
  }

  changeBGcolor () {
    const layout = this.getLayoutData()
    const { currentVal, scrollOMaticHeight, trayScrollHeight, trayOffsetHeight } = layout

    const { bgColor1, bgColor2 } = this.props.routeData

    // THIS IS THE CORRECT FORMULA:
    const scrollTiplier = ((currentVal / (scrollOMaticHeight - trayScrollHeight))).toFixed(3)

    this.setState({ currentColor: fadeColor(scrollTiplier, [bgColor1, bgColor2]) })
  }

  navigator () {
    const { nextRoute, prevRoute } = this.props.routeData
    const layout = this.getLayoutData()
    const { currentVal, scrollOMaticHeight, trayScrollHeight } = layout
    const shouldBeNextRoute = -(currentVal - scrollOMaticHeight) + 1 >= trayScrollHeight
    const shouldBePrevRoute = (currentVal / (scrollOMaticHeight - trayScrollHeight)) < 0

    if (shouldBePrevRoute) {
      this.props.getRouteState(this.props.routeData.prevRoute)
      Router.pushRoute('main', { slug: this.props.routeData.prevRoute })
      this.props.setScrollPos({ x: 0, y: trayScrollHeight - 1 })  
    }

    // console.log(currentVal)
    // console.log((currentVal / (scrollOMaticHeight - trayScrollHeight)))
    // console.log(this.state.animValues)

    if (shouldBeNextRoute) {
      this.props.getRouteState(this.props.routeData.nextRoute)
      Router.pushRoute('main', { slug: this.props.routeData.nextRoute })
      this.props.setScrollPos({ x: 0, y: 1 })
    }
  }

  setCurrentScrollDir (dir) { this.setState({ currentScrollDir: dir }) }

  setScrollStyleState () {
    const { type, style: { backgroundImageBack, backgroundImageForward } } = this.props.scrollConfig
    const dirSwitcher = (b, f) => this.state.currentScrollDir === 'back' ? b : f
    const styles = {
      background: dirSwitcher(backgroundImageBack, backgroundImageForward)
      // width: 
    }
    // return styles
    this.setState({
      bgImage: styles.background
    })
  }

  handleScroll (e) {
    e.preventDefault()

    const rawData = e.deltaY ? e.deltaY : e.deltaX
    const mouseY = Math.floor(rawData)
    const animationVal = this.state.animValues
    const newAnimationVal = (animationVal + mouseY)
    const newAnimationValNeg = (animationVal - mouseY)
    


    if (!this.canIscroll()) return

    const layout = this.getLayoutData()
    const { currentVal, scrollOMaticHeight, trayScrollHeight } = layout
    const isEndOfPage = -(currentVal - scrollOMaticHeight) + 1 === trayScrollHeight

    const scrolling = () => {
      this.state.scrollInverted
        ? this.setState({
          animValues: newAnimationValNeg,
          currentScrollDir: mouseY < 0 ? 'back' : 'forward'
        }) : this.setState({
          animValues: newAnimationVal,
          currentScrollDir: mouseY < 0 ? 'forward' : 'back'
        })
    }

    this.setScrollStyleState()
    this.changeBGcolor()
    this.navigator()
    raf(scrolling)
  }

  render () {
    // const { config } = this.props
    // const { width, height } = style
    // const springConfig = config || presets.noWobble
    const springConfig = presets.noWobble
    return (
      <div className='scroll-o-matic' ref={(ref) => { this.scrollOMatic = ref}}
        style={{
          backgroundColor: this.state.currentColor,
          position: 'relative',
          width: '100vw',
          height: '100vh'
        }} onWheel={this.handleScroll}>
        <Motion style={{ y: spring(this.state.animValues, springConfig) }}>
          { ({ y }) => (
            <div className='scroll-tray' ref={(scrollTray) => { this.scrollTray = scrollTray }}
              style={{
                background: `url(${this.state.bgImage})`,
                height: '300vh',
                width: '100vw',
                transform: `translate3d(0,${y.toFixed(3)}px,0)`,
                willChange: 'transform',
                display: 'inline-flex',
                position: 'absolute'
              }}>
              {/* { console.log(this.state.bgImage) } */}
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
