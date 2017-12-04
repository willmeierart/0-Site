import React, { Component } from 'react'
import Router from 'next/router'
import { fadeColor, binder } from '../../lib/_utils'
import { setScrollState } from '../../lib/_navRules'

export default class ScrollOMatic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prevRoute: '',
      nextRoute: '',
      currentColor: this.props.routeData.bgColor1,
      scrollState: {},
      isEndOfScroll: false
    }
    binder(this, ['handleScroll'])
  }
  componentDidMount () {
    window.removeEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleScroll)
    const { type, bgColor1, bgColor2, subpages, prevRoute, nextRoute } = this.props.routeData
    this.setState(() => ({
      prevRoute,
      nextRoute,
      currentColor: window.scrollTop > 50 ? bgColor2 : bgColor1,
      scrollState: setScrollState(type)
    }))
    // this.setState()
  }
  componentWillUnmount () {
    const { scrollTop, scrollHeight } = window
    const scrollTiplier = scrollTop / scrollHeight
    if (scrollTop === 0) {
      window.scrollTo(0, scrollHeight - 1)
    }
    if (scrollTiplier === 1) {
      window.scrollTo(0, 1)
    }
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll (e) {
    // e.preventDefault()
    const { routeData: {bgColor1, bgColor2} } = this.props
    let { scrollTop, scrollHeight } = e.srcElement.scrollingElement
    scrollHeight = scrollHeight / 2
    const scrollTiplier = scrollTop / scrollHeight
    this.setState({ currentColor: fadeColor(scrollTiplier, [bgColor1, bgColor2]) })
    if (scrollTop === 0) {
      Router.push(this.state.prevRoute)
      window.scrollTo(0, scrollHeight - 1)
    }
    if (scrollTiplier === 1) {
      Router.push(this.state.nextRoute)
      window.scrollTo(0, 1)
    }
  }
  render () {
    return (
      <div className='scroll-o-matic'>
        {this.props.children}
        <style jsx>{`
          .scroll-o-matic {
            width:100vw;
            height:200vh;
            background-color: ${this.state.currentColor};
            {/* animation: cycleColors 5s infinite ease-in-out; */}
          }
        `}</style>
      </div>
    )
  }
}
