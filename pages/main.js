import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import home from './home'
import converse from './converse'
import services from './services'
import us from './us'
import work from './work'

export default class Main extends PureComponent {
  render () {
    // console.log(home);
    // console.log(this.props.pathname);
    // const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`
    const { pathname } = this.props
    let ThisComponent = home
    switch (true) {
      case pathname === 'converse':
        ThisComponent = converse
        break
      case pathname === 'services':
        ThisComponent = services
        break
      case pathname === 'us':
        ThisComponent = us
        break
      case pathname === 'work':
        ThisComponent = work
        break
      default:
        ThisComponent = home
        break
    }
    // console.log(ThisComponent)
    return (
      <div>
        <div id='container'>
          <ThisComponent />
        </div>
        <style jsx>{`
            @keyframes animateIn {
              from {
                transform: translate3d(0, 0, 0);
                opacity: 0;
              }
              to {
                transform: translate3d(0, 0, 0);
                opacity: 1;
              }
            }
            @keyframes animateOut {
              from {
                opacity:1;
              }
              to {
                transform: translate3d(0, 0, 0);
                opacity: 0;
              }
            }
            @keyframes fadeIn {
              from: {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            #container {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
            }
            #container[class*="animate-"] {
              position: fixed;
              animation: animateIn .75s ease-in-out forwards;
              transform-origin: center;
              will-change: transform opacity;
            }
            #container.animate-out {
              animation-name: animateOut;
            }
            .loading #container:not(.clone) main {
              opacity: 0;
              animation: fadeIn 1s .15s ease-in-out forwards;
            }
          `}</style>
      </div>
    )
  }
}

Main.propTypes = {
  pathname: PropTypes.string.isRequired
}
