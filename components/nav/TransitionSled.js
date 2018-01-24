import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { TransitionMotion, spring, presets } from 'react-motion'
import { binder } from '../../lib/_utils'

export default class TransitionSled extends Component {
  constructor (props) {
    super(props)
    binder(this, ['willEnter'])
  }

  componentWillUnmount () {
    this.props.lockScrollOMatic(true)
  }
  componentWillMount () {
  }

  componentDidMount () {
    const { lockScrollOMatic, completePageTransition } = this.props
    setTimeout(() => { completePageTransition(true) }, 500)
    setTimeout(() => { lockScrollOMatic(false) }, 1000)
  }

  willEnter () {
    return {
      translate: this.props.width
      // opacity: 0
    }
  }

  render () {
    const { k, width, height, children, transitionComplete } = this.props
    return (
      <TransitionMotion
        willEnter={this.willEnter}
        styles={width ? [{ key: k, style: { translate: spring(0, { stiffness: 60, damping: 15 }) } }] : []}>
        { interpolated =>
          <div>
            { interpolated.map(config =>
              <div key={config.key} config={config} style={{
                transform: `translate3d(${config.style.translate}px,0,0)`,
                // opacity: config.style.opacity,
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
