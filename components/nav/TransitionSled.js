import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { TransitionMotion, spring, presets } from 'react-motion'
import raf from 'raf'
import { binder } from '../../lib/_utils'

export default class TransitionSled extends Component {
  constructor (props) {
    super(props)
    binder(this, ['willAppear', 'willLeave', 'willEnter'])
  }

  componentWillUnmount () {
    console.log('willunmount')
    this.props.lockScrollOMatic(true)
  }
  componentWillMount () {
    console.log('willmount')
  }

  componentDidMount () {
    const { lockScrollOMatic, completePageTransition } = this.props
    console.log('didmount')
    setTimeout(() => { completePageTransition(true) }, 500)
    setTimeout(() => { lockScrollOMatic(false) }, 1000)
  }

  willAppear () {
    console.log('willappear')
    return {
      translate: this.props.width,
      opacity: 0
    }
  }

  willEnter () {
    console.log('willenter')
    console.log(spring(0))
    return {
      translate: this.props.width,
      opacity: 0
    }
  }

  willLeave () {
    console.log('willleave')
    return {
      translate: this.props.width,
      opacity: 0
    }
  }

  render () {
    // const { appear, transitionProps: { name, enterTimeout, leaveTimeout, appearTimeout }, width, height } = this.props
    const { k, width, height, children, transitionComplete } = this.props
    // console.log(k)
    // console.log(width)
    return (
      <TransitionMotion
        willAppear={this.willAppear}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        styles={width ? [{ key: k, style: { translate: spring(0), opacity: spring(1) } }] : []}>
        { interpolated =>
          <div>
            { interpolated.map(config =>
              <div key={config.key} config={config} style={{
                transform: `translate3d(${config.style.translate}px,0,0)`,
                opacity: config.style.opacity,
                willChange: 'transform'
              }} className='transition-sled'>
                { transitionComplete && children }
              </div>
            ) }
          </div>
        }
      </TransitionMotion>
    )
  }
}

TransitionSled.PropTypes = {
  transitionComplete: PropTypes.bool.isRequired,
  completePageTransition: PropTypes.func.isRequired,
  lockScrollOMatic: PropTypes.func.isRequired
}
