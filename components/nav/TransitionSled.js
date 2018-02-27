// applies a secondary transition (other than the main high-lvl fade) to route changes

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring, presets } from 'react-motion'
import { binder } from '../../lib/_utils'

export default class TransitionSled extends Component {
  constructor (props) {
    super(props)
    binder(this, ['willEnter', 'preventScrollNav'])
  }

  componentWillUnmount () {
    this.props.lockScrollOMatic(true)
  }

  componentDidMount () {
    // lock scroll-ability until animation complete
    const { lockScrollOMatic, completePageTransition } = this.props
    setTimeout(() => { completePageTransition(true) }, 500)
    setTimeout(() => { lockScrollOMatic(false) }, 1000)
  }

  preventScrollNav (e) {
    e.preventDefault()
    e.stopPropagation()
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
        styles={width ? [{ key: k, style: { translate: spring(0, { stiffness: 60, damping: 15 }), overflow: 'hidden' } }] : []}>
        { interpolated =>
          <div style={{ overflow: 'hidden' }} onWheel={this.preventScrollNav} onTouchMove={this.preventScrollNav}>
            { interpolated.map(config =>
              <div onWheel={this.preventScrollNav} onTouchMove={this.preventScrollNav} key={config.key} config={config} style={{
                transform: `translate3d(${config.style.translate}px,0,0)`,
                // opacity: config.style.opacity,
                willChange: 'transform',
                overflow: 'hidden'
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
