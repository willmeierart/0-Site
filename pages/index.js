import { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppProvider from '../lib/redux/AppProvider'

import raf from 'raf'
import router from '../router'
import Main from './main'

router.Router.onRouteChangeStart = () => {
  const $container = document.getElementById('container')
  const $clone = $container.cloneNode(true)

  document.body.classList.add('loading')
  $clone.classList.add('clone')

  raf(() => {
    $container.parentNode.insertBefore($clone, $container.nextSibling)
    $clone.classList.add('animate-out')
    $container.classList.add('animate-in')
  })

  $clone.addEventListener(
    'animationend',
    () => {
      document.body.classList.remove('loading')
      $container.classList.remove('animate-in')
      $clone.parentNode.removeChild($clone)
    },
    { once: true }
  )
}

export default class Index extends PureComponent {
  static async getInitialProps ({ query }) {
    const pathname = query.slug || '/'
    return { pathname }
  }
  render () {
    return (
      <AppProvider>
        <Main {...this.props} />
      </AppProvider>
    )
  }
}

Index.PropTypes = {
  query: PropTypes.string.isRequired
}
