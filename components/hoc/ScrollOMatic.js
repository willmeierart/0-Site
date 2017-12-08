import React, { Component } from 'react'
import { connect } from 'react-redux'
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
      scrollState: {},
      scrollPos: this.props.reduxRouteData.scrollPos,
      isEndOfScroll: false,
      canScroll: false
    }
    binder(this, ['handleScroll', 'initScroll'])
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

    this.initScroll()

    this.setState(() => ({
      currentColor: window.scrollTop > 50 ? bgColor2 : bgColor1,
      scrollState: setScrollState(type)
    }))
  }

  // componentWillReceiveProps (nextProps) { this.initScroll()}

  componentWillUnmount () { window.removeEventListener('scroll', this.handleScroll) }

  async initScroll () {
    const { scrollPos } = this.props
    await window.scrollTo(scrollPos.x, scrollPos.y)
    // // // // // // // // THIS IS CRUCIAL, ALLOWS FOR NAV BEYOND SAME ROUTE:
    await setTimeout(() => {
      window.addEventListener('scroll', this.handleScroll)
      this.setState({ canScroll: true })
    }, 1000)
  }

  handleScroll (e) {
    e.preventDefault()
    console.log(e.deltaY)
    const { routeData: { bgColor1, bgColor2 } } = this.props
    console.log(e.target.scrollTop)
    let { scrollTop, scrollHeight } = e.target
    scrollHeight = scrollHeight / 2
    const scrollTiplier = scrollTop / scrollHeight

    this.setState({
      currentColor: fadeColor(scrollTiplier, [bgColor1, bgColor2])
    })

    if (this.state.canScroll) {
      if (scrollTop === 0) {
        this.setState({ canScroll: false })
        this.props.getRouteState(this.props.routeData.prevRoute)
        Router.pushRoute('main', { slug: this.props.routeData.prevRoute })
        this.props.setScrollPos({ x: 0, y: scrollHeight - 1 })
      }

      if (scrollTiplier === 1) {
        this.setState({ canScroll: false })
        this.props.getRouteState(this.props.routeData.nextRoute)
        Router.pushRoute('main', { slug: this.props.routeData.nextRoute })
        this.props.setScrollPos({ x: 0, y: 1 })
      }
    }
  }

  render () {
    return (
      <div style={{ backgroundColor: this.state.currentColor }} className='scroll-o-matic' onWheel={this.handleScroll}>
        {this.props.children}
        <style jsx>{`
          .scroll-o-matic {
            width:100vw;
            height:200vh;
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
