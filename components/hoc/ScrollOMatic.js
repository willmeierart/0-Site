import React, { Component } from 'react'
import DOM from 'react-dom'
import { connect } from 'react-redux'
import { Motion, spring, presets } from 'react-motion'
import raf from 'raf'
import { getRouteState, setScrollPos, configScrollEnv } from '../../lib/_redux/actions'
import { fadeColor, binder } from '../../lib/_utils'
import { setScrollState } from '../../lib/_navRules'
import router from '../../router'
const { Router } = router

class ScrollOMatic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentColor: this.props.reduxRouteData.bgColor1,
      scrollPos: this.props.reduxRouteData.scrollPos,
      isEndOfScroll: false,
      canScroll: false,
      scrollInverted: false,
      animValues: 0
    }
    binder(this, [
      'handleScroll',
      // 'initScroll',
      'resetMin',
      'resetMax',
      'navigator',
      'canIscroll',
      'getLayoutData',
      'changeBGcolor'
    ])
  }

  componentDidMount () {
    // Router.prefetchRoute('main', { slug: this.props.routeData.nextRoute })
    // Router.prefetchRoute('main', { slug: this.props.routeData.prevRoute })
    Router.prefetchRoute(this.props.routeData.nextRoute)
    Router.prefetchRoute(this.props.routeData.prevRoute)

    const { type, bgColor1, bgColor2, /* subpages, */ route } = this.props.routeData

    if (this.props.reduxRouteData.nextRoute === '') {
      this.props.getRouteState(route)
    }
    if (type !== '') {
      this.props.configScrollEnv(type)
    }

    // this.initScroll()

    // this.setState(() => ({
    //   currentColor: window.scrollTop > 50 ? bgColor2 : bgColor1
    // }))
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

  // componentWillUnmount () { window.removeEventListener('scroll', this.handleScroll) }

  // async initScroll () {
  //   const { scrollPos } = this.props
  //   await window.scrollTo(scrollPos.x, scrollPos.y)
  //   // // // // // // // // THIS IS CRUCIAL, ALLOWS FOR NAV BEYOND SAME ROUTE:
  //   await setTimeout(() => {
  //     window.addEventListener('scroll', this.handleScroll)
  //     this.setState({ canScroll: true })
  //   }, 1000)
  // }

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
      if (currentVal >= 1) {
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
    const scrollTiplier = ((-(currentVal - scrollOMaticHeight)) / trayScrollHeight).toFixed(3)
    // console.log(currentVal - scrollOMaticHeight);
    // console.log((-3 * (currentVal - scrollOMaticHeight) / trayOffsetHeight).toFixed(3))
    // console.log(scrollTiplier)
    // console.log(layout);
    this.setState({ currentColor: fadeColor(scrollTiplier, [bgColor1, bgColor2]) })
  }

  navigator () {
    const { nextRoute, prevRoute } = this.props.routeData
    const layout = this.getLayoutData()
    const { currentVal, scrollOMaticHeight, trayScrollHeight } = layout
    const shouldBeNextRoute = -(currentVal - scrollOMaticHeight) + 1 >= trayScrollHeight
    // const shouldBePrevRoute = this.state.animValues < 0

    if (shouldBeNextRoute) {
      Router.push('/' + nextRoute)
    }
    // if (shouldBePrevRoute) {
    //   Router.push(this.state.prevRoute)      
    // }
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

    this.changeBGcolor()
    this.navigator()

    const scrolling = () => {
      this.state.scrollInverted
        ? this.setState({ animValues: newAnimationValNeg })
        : this.setState({ animValues: newAnimationVal })
    }
    raf(scrolling)

    // const { routeData: { bgColor1, bgColor2 } } = this.props
    // let { scrollTop, scrollHeight } = e.target
    // scrollHeight = scrollHeight / 2
    // const scrollTiplier = scrollTop / scrollHeight
    // this.setState({
    //   currentColor: fadeColor(scrollTiplier, [bgColor1, bgColor2])
    // })
    // if (this.state.canScroll) {
    //   if (scrollTop === 0) {
    //     this.setState({ canScroll: false })
    //     this.props.getRouteState(this.props.routeData.prevRoute)
    //     Router.pushRoute('main', { slug: this.props.routeData.prevRoute })
    //     this.props.setScrollPos({ x: 0, y: scrollHeight - 1 })
    //   }

    //   if (scrollTiplier === 1) {
    //     this.setState({ canScroll: false })
    //     this.props.getRouteState(this.props.routeData.nextRoute)
    //     Router.pushRoute('main', { slug: this.props.routeData.nextRoute })
    //     this.props.setScrollPos({ x: 0, y: 1 })
    //   }
    // }
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
        <Motion style={{ z: spring(this.state.animValues, springConfig) }}>
          { ({ z }) => (
            <div className='scroll-tray' ref={(scrollTray) => { this.scrollTray = scrollTray }}
              style={{
                height: '300vh',
                width: '100vw',
                // top: '-100vh',
                transform: `translate3d(0,${z.toFixed(3)}px,0)`,
                willChange: 'transform',
                display: 'inline-flex',
                position: 'absolute'
              }}>
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
    scrollConfig: state.nav.scrollConfig
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getRouteState: route => dispatch(getRouteState(route)),
    setScrollPos: coords => dispatch(setScrollPos(coords)),
    configScrollEnv: type => dispatch(configScrollEnv(type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollOMatic)
