import React, { Component } from 'react'
// import Router from 'next/router'
import router from '../../router'
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
      isEndOfScroll: false,
      canScroll: false,
      scrollTimer: null
    }
    binder(this, ['handleScroll'])
  }
  componentWillMount () {
    // window.scrollY = 10    
  }
  componentDidMount () {
    console.log('mounted');
    if (this.state.canScroll === false) {
      document.scrollingElement.scrollTop = 1
      setTimeout(() => {
        this.setState({ canScroll: true })
      }, 50)
    }
    // window.removeEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', (e) => {
      this.handleScroll(e)
    })
    // window.scroll(0, 1)
    // window.scrollTo(0, 1)
    console.log(window.scrollY)    
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
    // const { scrollTop, scrollHeight } = window
    // const scrollTiplier = scrollTop / scrollHeight
    // if (scrollTop === 0) {
    //   window.scrollTo(0, scrollHeight - 1)
    // }
    // if (scrollTiplier === 1) {
    //   window.scrollTo(0, 1)
    // }
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll (e) {
    // e.preventDefault()
    console.log(window);
    const { Router } = router
    const { routeData: {bgColor1, bgColor2} } = this.props
    let { scrollTop, scrollHeight } = e.srcElement.scrollingElement
    scrollHeight = scrollHeight / 2
    const scrollTiplier = scrollTop / scrollHeight
    console.log(scrollTop);
    this.setState({ 
      currentColor: fadeColor(scrollTiplier, [bgColor1, bgColor2])
    })
    if (this.state.canScroll) {
      if (scrollTop === 0) {
        Router.pushRoute('main', { slug: this.state.prevRoute })
        window.scrollTo(0, scrollHeight - 1)
        console.log(this.state.prevRoute)
      }
      if (scrollTiplier === 1) {
        Router.pushRoute('main', { slug: this.state.nextRoute })
        console.log(this.state.nextRoute)
        window.scrollTo(0, 1)
      }
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
          }
        `}</style>
      </div>
    )
  }
}
