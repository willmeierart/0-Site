import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleMenu } from '../../lib/redux/actions'
import { binder, fadeColor } from '../../lib/_utils'
import { AzLogo01 } from '../assets/ZeroLogos'

class CenterLogo extends Component {
  constructor (props) {
    super(props)
    binder(this, ['handleScroll', 'handleMouseEnter', 'handleMouseLeave'])
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
  handleMouseEnter () {
    this.props.toggleMenu(true)
  }
  handleMouseLeave () {
    this.props.toggleMenu(false)
  }
  render () {
    // const { colors } = this.props
    return (
      <div className='logo-wrapper'>
        <div //onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} 
        className='logo-inner-wrapper'>
          <AzLogo01 handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} color={this.props.menuOpen ? 'rgba(0, 255, 255, 1)' : this.state.currentColor} />
        </div>
        <style jsx>{`
          .logo-wrapper {
            {/* width:100%; height:100%; */}
            margin-left:35%;
            margin-top:35%;
            width:30%;
            height:30%;
            z-index:5;
            position:fixed; top:0; left:0;
            display: flex; justify-content: center; align-items: center;
            {/* pointer-events: none; */}
          }
          .logo-inner-wrapper {
            width:100%;
          }
        `}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    menuOpen: state.ui.menuOpen
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleMenu: bool => dispatch(toggleMenu(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterLogo)
