import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRouteState } from '../../lib/_redux/actions'
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
      isEndOfScroll: false,
      canScroll: false,
      scrollTimer: null,
      router: null
    }
    binder(this, ['handleScroll', 'handleClick', 'initScroll'])
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ canScroll: true })
    }, 100)
    window.addEventListener('scroll', this.handleScroll)

    const { type, bgColor1, bgColor2, subpages, prevRoute, nextRoute, route } = this.props.routeData

    this.props.getRouteState(route)

    // this.initScroll()

    this.setState(() => ({
      prevRoute,
      nextRoute,
      router: router.Router,
      currentColor: window.scrollTop > 50 ? bgColor2 : bgColor1,
      scrollState: setScrollState(type)
    }))
  }
  async initScroll () {
    await window.scrollTo(0, 5)
    this.setState({ canScroll: true })
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

    this.setState({
      currentColor: fadeColor(scrollTiplier, [bgColor1, bgColor2])
    })
    if (this.state.canScroll) {
      if (scrollTop === 0) {
        router.pushRoute('main', { slug: this.state.prevRoute })
        window.scrollTo(0, scrollHeight - 1)
      }
    }
    if (scrollTiplier === 1) {
      console.log(router)
      this.props.getRouteState(this.props.routeData.nextRoute)
      router.pushRoute('main', { slug: this.props.routeData.nextRoute })
      console.log(this.props.reduxRouteData.nextRoute)
      window.scrollTo(0, 1)
    }

  }
  handleClick () {
    // console.log(router)
    const { router } = this.state
    console.log(this.props)
    // console.log(this.state.router)
    // this.props.getRouteState()
    this.props.getRouteState(this.props.routeData.nextRoute)
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
  return { reduxRouteData: state.nav.routeData }
}

export default connect(mapStateToProps, { getRouteState })(ScrollOMatic)
