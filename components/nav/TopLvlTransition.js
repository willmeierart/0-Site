import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Motion, spring, presets } from 'react-motion'
import raf from 'raf'
import { binder } from '../../lib/_utils'
import { completePageTransition, lockScrollOMatic } from '../../lib/redux/actions/'

class TopLvlTransition extends Component {
  constructor (props) {
    super(props)
    binder(this, [])
  }

  componentWillUnmount () { this.props.lockScrollOMatic(true) }

  componentDidMount () {
    const { lockScrollOMatic } = this.props
    setTimeout(() => { lockScrollOMatic(false) }, 1000)
  }

  render () {
    return (
      <div className='top-lvl-transition'>{ this.props.children }</div>
    )
  }
}

function mapStateToProps (state) {
  return {
    transitionComplete: state.router.transitionComplete
  }
}

function mapDispatchToProps (dispatch) {
  return {
    completePageTransition: bool => dispatch(completePageTransition(bool)),
    lockScrollOMatic: bool => dispatch(lockScrollOMatic(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopLvlTransition)

TopLvlTransition.PropTypes = {
  transitionComplete: PropTypes.bool.isRequired,
  completePageTransition: PropTypes.func.isRequired,
  lockScrollOMatic: PropTypes.func.isRequired
}
