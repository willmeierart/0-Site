import React, { Component } from 'react'
import { connect } from 'react-redux'
import { transitionRoute, setColorScheme, setPrevNextRoutes, getNewOriginPos } from '../../lib/redux/actions'
import { binder, fadeColor } from '../../lib/_utils'
import router from '../../router'
const { Router } = router

class MobileScrollOMatic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 1
    }
    binder(this, ['handleScroll', 'navigator'])
  }

  componentDidMount () {
    const { routeData: { route, bgColor1, bgColor2 }, setPrevNextRoutes, setColorScheme } = this.props

    window.addEventListener('scroll', (e) => this.handleScroll(e))
    window.addEventListener('touchmove', (e) => this.handleScroll(e))

    const fetchEm = async () => {
      await setPrevNextRoutes(route)
      const prevNextRoutes = await this.props.prevNextRoutes
      const { prevRoute, nextRoute } = prevNextRoutes
      Router.prefetchRoute('main', { slug: nextRoute })
      Router.prefetchRoute('main', { slug: prevRoute })
      console.log(prevRoute, nextRoute)
    }
    fetchEm()

    setColorScheme({ base1: bgColor1, base2: bgColor2 })
  }

  navigator (e) {
    const { routeData: { type }, getNewOriginPos, transitionRoute, prevNextRoutes: { nextRoute, prevRoute } } = this.props
    const { scrollTop, scrollLeft, scrollHeight, scrollWidth } = e.srcElement.scrollingElement
    const thisScrollHeight = scrollHeight / 2
    const thisScrollWidth = scrollWidth / 2
    const scrollTiplier = type === 'horizontal' ? scrollLeft / thisScrollWidth : scrollTop / thisScrollHeight
    console.log(scrollTiplier)
    const prevTrigger = false
    const nextTrigger = false
    const routerData = { prevTrigger, nextTrigger, prevRoute, nextRoute }

    if (nextTrigger || prevTrigger) {
      const widthHeight = [window.outerWidth, window.outerHeight]
      nextTrigger
        ? getNewOriginPos(nextRoute, 'forward', widthHeight)
        : getNewOriginPos(prevRoute, 'back', widthHeight)
      transitionRoute(routerData)
    }
  }

  handleScroll (e) {
    const { current } = this.state
    const { setColorScheme, routeData: { bgColor1, bgColor2 } } = this.props

    setColorScheme({
      cur1: fadeColor(current, [bgColor1, bgColor2]),
      cur2: fadeColor(current, [bgColor2, bgColor1])
    })
    this.navigator(e)
  }

  render () {
    const { currentColor } = this.state
    const { routeData: { navRules: { height, width } } } = this.props

    return (
      <div className='mobile-matic'>
        { this.props.children }
        <style jsx>{`
          .mobile-matic {
            width: ${Math.floor(width * 100)}vw;
            height: ${Math.floor(height * 100)}vh;
            background-color: ${currentColor};
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
