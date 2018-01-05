import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { transitionRoute, setColorScheme, setPrevNextRoutes, getNewOriginPos } from '../../lib/redux/actions'
import { binder, fadeColor } from '../../lib/_utils'
import router from '../../router'
const { Router } = router

class MobileScrollOMatic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canScroll: false,
      scrollTiplier: 1
    }
    binder(this, ['handleScroll', 'navigator', 'changeColors'])
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

  changeColors () {
    const { routeData: { bgColor1, bgColor2 }, setColorScheme } = this.props
    const { scrollTiplier } = this.state
    setColorScheme({
      cur1: fadeColor(scrollTiplier, [bgColor1, bgColor2]),
      cur2: fadeColor(scrollTiplier, [bgColor2, bgColor1])
    })
  }

  navigator (e) {
    const { routeData: { type, navRules: { style: { height } } }, getNewOriginPos, transitionRoute, prevNextRoutes: { nextRoute, prevRoute } } = this.props
    const { innerWidth, innerHeight } = window
    const { scrollTop, scrollHeight } = e.srcElement.scrollingElement
    const thisScrollHeight = innerHeight + scrollTop - 1
    const prevTrigger = scrollTop <= 0
    const nextTrigger = scrollHeight - thisScrollHeight - 1 <= 0
    const routerData = { prevTrigger, nextTrigger, prevRoute, nextRoute }
    const that = this

    const transitionDirection = (dir) => {
      console.log('transitionDirection')
      const route = dir === 'forward' ? nextRoute : prevRoute
      getNewOriginPos(route, dir, [innerWidth, innerHeight])
      window.removeEventListener('scroll', (e) => { that.handleScroll(e) })
      window.removeEventListener('touchmove', (e) => { that.handleScroll(e) })
      transitionRoute(routerData)
      that.setState({ canScroll: false })
    }

    const scrollTiplier = ((scrollTop / (scrollHeight - scrollTop)) / 2).toFixed(3)

    this.setState({ scrollTiplier })
    if ((nextTrigger || prevTrigger) && this.state.canScroll) {
      const doTransitionThings = () => nextTrigger ? transitionDirection('forward') : transitionDirection('back')
      const throttled = _.throttle(doTransitionThings, 800, { 'leading': true })
      throttled()
    }
  }

  handleScroll (e) {
    const { canScroll } = this.state
    const { routeData: { bgColor1, bgColor2 } } = this.props

    if (canScroll) {
      this.navigator(e)
      this.changeColors()
    }
  }

  render () {
    const { colors: { cur1 }, routeData: { type, navRules: { style: { height } } } } = this.props

    return (
      <div className='mobile-matic' style={{
        width: '100vw',
        height: `${Math.floor(height * 100)}vh`,
        boxSizing: 'border-box',
        backgroundColor: cur1
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
