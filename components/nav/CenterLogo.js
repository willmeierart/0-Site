import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toggleMenu, setColorScheme } from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'
import { AzLogo01 } from '../assets/ZeroLogos'

class CenterLogo extends Component {
  constructor (props) {
    super(props)
    binder(this, ['handleMouseEnter', 'handleMouseLeave', 'handleClick'])
  }

  handleMouseEnter () { this.props.toggleMenu(true) }
  handleMouseLeave () { this.props.toggleMenu(false) }
  handleClick (e) {
    e.preventDefault()
    console.log('click')
    const { menuOpen, toggleMenu } = this.props
    toggleMenu(!menuOpen)
  }

  render () {
    const { colors: { cur2 } } = this.props
    return (
      <div className='logo-wrapper'>
        <div className='logo-inner-wrapper'>
          <AzLogo01 handleClick={this.handleClick}
            handleMouseEnter={this.handleMouseEnter}
            handleMouseLeave={this.handleMouseLeave}
            color={this.props.menuOpen ? 'rgba(0, 255, 255, 1)' : cur2} />
        </div>
        <style jsx>{`
          .logo-wrapper {
            width:6%;
            height:6%;
            z-index:5;
            position:fixed; top:47%; left:47%;
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

CenterLogo.PropTypes = {
  toggleMenu: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  colors: PropTypes.object.isRequired
}
