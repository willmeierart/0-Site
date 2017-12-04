import React, { Component } from 'react'
import Router from 'next/router'
import { fadeColor, binder } from '../../lib/_utils'

export default class ScrollOMatic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prevPage: '/',
      nextRoute: '/us',
      currentColor: 'rgb(255,255,255,1)',
      isEndOfScroll: false
    }
    binder(this, ['handleScroll', 'handleRouting'])
  }
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleRouting (dir) {
    if (dir === 'next'){
      Router.push(this.state.nextRoute)
      setTimeout(() => {
        this.setState({
          currentColor: 'var(--az-red)',
          nextRoute: this.state.nextRoute === '/us' ? '/' : '/us'
        })
      }, 50)
    }
  }
  handleScroll (e) {
    const { colors } = this.props
    let { scrollTop, scrollHeight } = e.srcElement.scrollingElement
    scrollHeight = scrollHeight / 2
    if (scrollTop === 0) { scrollTop = 1 }
    const scrollTiplier = scrollTop / scrollHeight
    this.setState({ currentColor: fadeColor(scrollTiplier, [colors[1], colors[0]]) })
    if (scrollTiplier === 1) {
      this.handleRouting('next')
    }
  }
  render () {
    const { colors } = this.props
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
          @keyframes cycleColors {
            from {
              background-color: ${colors[0]};
            } 50% {
              background-color: white;
            } to {
              background-color: ${colors[0]};
            }
          }
        `}</style>
      </div>
    )
  }
}
