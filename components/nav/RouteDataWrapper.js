import React, { Component } from 'react'
import { binder } from '../../lib/_utils'
import routeData from '../../router/routeData'
import navRules from '../../router/navRules'
import ScrollOMatic from './ScrollOMatic'

export default class RouteDataWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = { title: 'home' }
    binder(this, ['handleChange'])
  }
  componentDidMount () {

  }
  render () {
    const { title } = this.state
    return (
      <div>
        <ScrollOMatic title={title} />
      </div>
    )
  }
}