import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleMenu, setColorScheme } from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'
import { AzLogo01 } from '../assets/ZeroLogos'

class CenterLogo extends Component {
  constructor (props) {
    super(props)
    binder(this, ['handleMouseEnter', 'handleMouseLeave'])
  }

  handleMouseEnter () {
    this.props.toggleMenu(true)
  }

  handleMouseLeave () {
    this.props.toggleMenu(false)
  }
  render () {
    const { cur2 } = this.props.colors
    return (
      <div className='logo-wrapper'>
        <div className='logo-inner-wrapper'>
          <AzLogo01 handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} color={this.props.menuOpen ? 'rgba(0, 255, 255, 1)' : cur2} />
        </div>
        <style jsx>{`
          .logo-wrapper {
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
    menuOpen: state.ui.menuOpen,
    colors: state.ui.colors
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleMenu: bool => dispatch(toggleMenu(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterLogo)
