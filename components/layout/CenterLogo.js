import React, { Component } from 'react'
import { binder, fadeColor } from '../../lib/_utils'
import { AzLogo01 } from '../assets/ZeroLogo01'

export default class CenterLogo extends Component {
  constructor (props) {
    super(props)
    binder(this, ['handleScroll'])
    this.state = { currentColor: this.props.colors.color1 }
  }
  static async getInitialProps () {
    this.setState(() => ({ currentColor: this.props.colors.color2 }))
  }
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
    this.setState(() => ({ currentColor: this.props.colors.color1 }))
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll (e) {
    const { colors } = this.props
    let { scrollTop, scrollHeight } = e.srcElement.scrollingElement
    scrollHeight = scrollHeight / 2
    if (scrollTop === 0) { scrollTop = 1 }
    const scrollTiplier = scrollTop / scrollHeight
    this.setState(() => ({
      currentColor: fadeColor(scrollTiplier, [colors.color1, colors.color2])
    }))
  }
  render () {
    // const { colors } = this.props
    return (
      <div className='logo-wrapper'>
        <div className='logo-inner-wrapper'>
          <AzLogo01 color={this.state.currentColor} />
        </div>
        <style jsx>{`
          .logo-wrapper {
            width:100%; height:100%;
            z-index:5;
            position:fixed; top:0; left:0;
            display: flex; justify-content: center; align-items: center;
            pointer-events:none;
          }
          .logo-inner-wrapper {
            width:25%;
          }
        `}</style>
      </div>
    )
  }
}
