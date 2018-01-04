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
    
    type === 'horizontal' ? document.scrollingElement.scrollLeft = 1 : document.scrollingElement.scrollTop = 1
    if (type === 'horizontal') {
      console.log('horizontal', document.scrollingElement.scrollLeft)
      document.scrollingElement.scrollLeft = 2
      console.log('horizontal', document.scrollingElement.scrollLeft)
    } else if (type === 'vertical') {
      console.log('vertical', document.scrollingElement.scrollTop)
      document.scrollingElement.scrollTop = 2
      console.log('vertical', document.scrollingElement.scrollTop)
    }

    const fetchEm = async () => {
      await setPrevNextRoutes(route)
      const prevNextRoutes = await this.props.prevNextRoutes
      const { prevRoute, nextRoute } = prevNextRoutes
      Router.prefetchRoute('main', { slug: nextRoute })
      Router.prefetchRoute('main', { slug: prevRoute })
    }
    fetchEm()

    setColorScheme({ base1: bgColor1, base2: bgColor2 })
    // console.log(this.props.prevNextRoutes)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', (e) => { this.handleScroll(e) })
    window.removeEventListener('touchmove', (e) => { this.handleScroll(e) })
  }

  navigator (e) {
    const { routeData: { type }, getNewOriginPos, transitionRoute, prevNextRoutes: { nextRoute, prevRoute } } = this.props
    const widthHeight = [window.innerWidth, window.innerHeight]
    const { innerWidth, innerHeight } = window
    const scrollTop = typeof e.srcElement.scrollingElement.scrollTop !== 'undefined' ? e.srcElement.scrollingElement.scrollTop : 0
    const scrollLeft = typeof e.srcElement.scrollingElement.scrollLeft !== 'undefined' ? e.srcElement.scrollingElement.scrollLeft : 0
    const scrollHeight = typeof e.srcElement.scrollingElement.scrollHeight !== 'undefined' ? e.srcElement.scrollingElement.scrollHeight : 0
    const scrollWidth = typeof e.srcElement.scrollingElement.scrollWidth !== 'undefined' ? e.srcElement.scrollingElement.scrollWidth : 0
    
    let thisScrollWidth = innerWidth + scrollLeft
    let thisScrollHeight = innerHeight + scrollTop
    
    // console.log(thisScrollHeight, thisScrollWidth, scrollHeight, scrollWidth)


    const prevTrigger = type === 'horizontal' ? scrollLeft < 0 : scrollTop < 0
    const nextTrigger = type === 'horizontal' ? thisScrollWidth - scrollWidth - 1 <= 0 : thisScrollHeight - scrollHeight - 1 <= 0

    const routerData = { prevTrigger, nextTrigger, prevRoute, nextRoute }

    if ((nextTrigger || prevTrigger) && this.state.canScroll) {
      switch (true) {
        case nextTrigger :
          getNewOriginPos(nextRoute, 'forward', widthHeight)
          console.log('next')
          console.log({
            thisScrollWidth,
            scrollWidth,
            thisScrollHeight,
            scrollHeight
          })
          transitionRoute(routerData)        
          this.setState({ canScroll: false })
          break
        case prevTrigger :
          getNewOriginPos(prevRoute, 'back', widthHeight)
          console.log('prev')
          console.log({
            thisScrollWidth,
            scrollWidth,
            thisScrollHeight,
            scrollHeight
          })
          transitionRoute(routerData)
          this.setState({ canScroll: false })
          break
        default:
          return null
      }
    }
  }

  handleScroll (e) {
    const { current, canScroll } = this.state
    const { setColorScheme, routeData: { bgColor1, bgColor2, type } } = this.props

    setColorScheme({
      cur1: fadeColor(current, [bgColor1, bgColor2]),
      cur2: fadeColor(current, [bgColor2, bgColor1])
    })
    if (canScroll) {
      this.navigator(e)
    }
    // else {
    //   if (type === 'horizontal') {
    //     document.scrollingElement.scrollLeft = 2
    //     // console.log('horizontal', document.scrollingElement.scrollLeft)
    //   } else if (type === 'vertical') {
    //     document.scrollingElement.scrollTop = 2
    //     // console.log('vertical', document.scrollingElement.scrollTop)
    //   }
    // }
  }

  render () {
    const { currentColor } = this.state
    const { routeData: { navRules: { height, width } } } = this.props

    return (
      <div className='mobile-matic' style={{
        width: `${Math.floor(width * 100)}vw`,
        height: `${Math.floor(height * 100)}vh`,
        boxSizing: 'border-box'
        // zIndex: -1
      }}>
        { this.props.children }
        <style jsx>{`
          .mobile-matic {
            {/* width: ${Math.floor(width * 100)}vw;
            height: ${Math.floor(height * 100)}vh; */}
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
