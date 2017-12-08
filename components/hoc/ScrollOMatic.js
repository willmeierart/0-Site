import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRouteState, setScrollPos } from '../../lib/_redux/actions'
// import Router from 'next/router'
import router from '../../router'
import { fadeColor, binder } from '../../lib/_utils'
import { setScrollState } from '../../lib/_navRules'

class ScrollOMatic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prevRoute: '',
      nextRoute: '',
      currentColor: this.props.routeData.bgColor1,
      scrollState: {},
      scrollPos: this.props.reduxRouteData.scrollPos,
      isEndOfScroll: false,
      canScroll: false,
      scrollTimer: null,
      router: null
    }
    binder(this, ['handleScroll', 'handleClick', 'initScroll'])
  }

  async initScroll () {
    const { scrollPos } = this.props
    console.log(window)
    await window.scrollTo(scrollPos.x, scrollPos.y)

    // THIS IS CRUCIAL, ALLOWS FOR NAV BEYOND SAME ROUTE:
    await setTimeout(() => {
      console.log(this.state.canScroll)
      window.addEventListener('scroll', this.handleScroll)
      this.setState({ canScroll: true })
    }, 1000)
  }

  componentDidMount () {
    router.Router.prefetchRoute('main', { slug: this.props.routeData.nextRoute })
    router.Router.prefetchRoute('main', { slug: this.props.routeData.prevRoute })
    // setTimeout(() => {
    //   // this.setState({ canScroll: true })
    //   this.initScroll()
    // }, 100)

    const { type, bgColor1, bgColor2, subpages, prevRoute, nextRoute, route } = this.props.routeData

    if (this.props.reduxRouteData.nextRoute === ''){
      this.props.getRouteState(route)
    }

    this.initScroll()

    this.setState(() => ({
      prevRoute,
      nextRoute,
      router: router.Router,
      currentColor: window.scrollTop > 50 ? bgColor2 : bgColor1,
      scrollState: setScrollState(type)
    }))
  }

  componentWillReceiveProps (nextProps) {
    this.initScroll()
  }

  componentWillUnmount () {
    // this.setState({canScroll: false})
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll (e) {
    e.preventDefault()
    const { router } = this.state
    const { routeData: { bgColor1, bgColor2 } } = this.props
    let { scrollTop, scrollHeight } = e.srcElement.scrollingElement
    scrollHeight = scrollHeight / 2
    const scrollTiplier = scrollTop / scrollHeight
    // console.log(scrollTop)

    // if (!this.state.canScroll && scrollTop === 0) {
    //   window.scrollTo(0, 5)
    // }

    this.setState({
      currentColor: fadeColor(scrollTiplier, [bgColor1, bgColor2])
    })

    if (this.state.canScroll) {
      if (scrollTop === 0) {
        this.setState({ canScroll: false })        
        router.pushRoute('main', { slug: this.state.prevRoute })
        this.props.setScrollPos({ x: 0, y: scrollHeight - 1 })
        // window.scrollTo(0, scrollHeight - 1)
      }

    // else {
    //   window.scrollTo(0, 5)
    //   this.setState({ canScroll: true })
    // }
      if (scrollTiplier === 1) {
        this.setState({ canScroll: false })        
        console.log(router)
        this.props.getRouteState(this.props.routeData.nextRoute)
        router.pushRoute('main', { slug: this.props.routeData.nextRoute })
        this.props.setScrollPos({ x: 0, y: 1 })
        // window.scrollTo(0, 1)
      }
    }
  }
  handleClick () {
    // console.log(router)
    this.setState({ canScroll: false })
    
    const { router } = this.state
    console.log(this.props)
    // console.log(this.state.router)
    // this.props.getRouteState()
    this.props.getRouteState(this.props.routeData.nextRoute)
    this.props.setScrollPos({ x: 0, y: 1 })
    router.pushRoute('main', { slug: this.props.routeData.nextRoute })
    // router.pushRoute('main', { slug: this.state.prevRoute })
  }
  render () {
    return (
      <div className='scroll-o-matic' onClick={this.handleClick}>
        {this.props.children}
        <style jsx>{`
          .scroll-o-matic {
            width:100vw;
            height:200vh;
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
    scrollPos: state.nav.scrollPos
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getRouteState: (route) => { dispatch(getRouteState(route)) },
    setScrollPos: (coords) => {
      window.scrollTo(coords.x, coords.y)
      dispatch(setScrollPos(coords))
    }
  }
}

export default connect(
  mapStateToProps,
  // { getRouteState, setScrollPos }
  mapDispatchToProps
)(ScrollOMatic)
