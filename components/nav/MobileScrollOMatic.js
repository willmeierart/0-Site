import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'lodash.throttle'
import { transitionRoute, setColorScheme, setPrevNextRoutes, getNewOriginPos } from '../../lib/redux/actions'
import { binder, fadeColor } from '../../lib/_utils'
import router from '../../router'
const { Router } = router

class MobileScrollOMatic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 1,
      canScroll: false
    }
    binder(this, ['handleScroll', 'navigator'])
  }

  componentDidMount () {
    const { routeData: { route, bgColor1, bgColor2, type }, setPrevNextRoutes, setColorScheme } = this.props

    window.addEventListener('scroll', (e) => { this.handleScroll(e) })
    window.addEventListener('touchmove', (e) => { this.handleScroll(e) })

    this.setState({ canScroll: false })
    setTimeout(() => { this.setState({ canScroll: true }) }, 500)

    document.scrollingElement.scrollTop = 1

    const fetchEm = async () => {
      await setPrevNextRoutes(route)
      const prevNextRoutes = await this.props.prevNextRoutes
      const { prevRoute, nextRoute } = prevNextRoutes
      Router.prefetchRoute('main', { slug: nextRoute })
      Router.prefetchRoute('main', { slug: prevRoute })
    }
    fetchEm()

    setColorScheme({ base1: bgColor1, base2: bgColor2 })
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', (e) => { this.handleScroll(e) })
    window.removeEventListener('touchmove', (e) => { this.handleScroll(e) })
  }

  navigator (e) {
    const { routeData: { type }, getNewOriginPos, transitionRoute, prevNextRoutes: { nextRoute, prevRoute } } = this.props
    const { innerWidth, innerHeight } = window
    const widthHeight = [innerWidth, innerHeight]
    const scrollTop = typeof e.srcElement.scrollingElement.scrollTop !== 'undefined' ? e.srcElement.scrollingElement.scrollTop : 0
    const scrollHeight = typeof e.srcElement.scrollingElement.scrollHeight !== 'undefined' ? e.srcElement.scrollingElement.scrollHeight : 0

    const thisScrollHeight = innerHeight + scrollTop - 1

    const prevTrigger = scrollTop <= 0
    const nextTrigger = scrollHeight - thisScrollHeight - 1 <= 0

    const routerData = { prevTrigger, nextTrigger, prevRoute, nextRoute }
    if ((nextTrigger || prevTrigger) && this.state.canScroll) {
      console.log(scrollTop)
      const that = this
      const doTransitionStuff = (dir) => {
        const route = dir === 'forward' ? nextRoute : prevRoute
        getNewOriginPos(route, dir, widthHeight)
        console.log(dir)
        console.log({
          thisScrollHeight,
          scrollHeight
        })
        window.removeEventListener('scroll', (e) => { that.handleScroll(e) })
        window.removeEventListener('touchmove', (e) => { that.handleScroll(e) })
        transitionRoute(routerData)
        that.setState({ canScroll: false })
      }
      switch (true) {
        case nextTrigger :
          doTransitionStuff('forward')
          break
        case prevTrigger :
          doTransitionStuff('back')
          break
        default:
          return null
      }
    }
  }

  handleScroll (e) {
    const { current, canScroll } = this.state
    const { setColorScheme, routeData: { bgColor1, bgColor2 } } = this.props

    setColorScheme({
      cur1: fadeColor(current, [bgColor1, bgColor2]),
      cur2: fadeColor(current, [bgColor2, bgColor1])
    })
    if (canScroll) {
      throttle(this.navigator(e), 1000)
    }
  }

  render () {
    const { currentColor } = this.state
    const { routeData: { type, navRules: { style: { height } } } } = this.props

    return (
      <div className='mobile-matic' style={{
        width: '100vw',
        height: `${Math.floor(height * 100)}vh`,
        boxSizing: 'border-box',
        backgroundColor: currentColor
        // overflowScrolling: 'touch',
        // WebkitOverflowScrolling: 'touch'
      }}>
        { this.props.children }
        <style jsx global>{`
          html, body {
            overflow-x: ${type === 'horizontal' ? 'visible' : 'hidden'}!important;
            overflow-y: ${type === 'vertical' ? 'visible' : 'hidden'}!important;
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
    colors: state.ui.colors
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getNewOriginPos: (transRoute, transDir, widthHeight) => dispatch(getNewOriginPos(transRoute, transDir, widthHeight)),
    transitionRoute: routerData => dispatch(transitionRoute(routerData)),
    setPrevNextRoutes: routerData => dispatch(setPrevNextRoutes(routerData)),
    setColorScheme: colorObj => dispatch(setColorScheme(colorObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileScrollOMatic)

MobileScrollOMatic.PropTypes = {

}
