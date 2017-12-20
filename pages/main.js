import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import RouteSwitcher from '../components/nav/RouteSwitcher'

export default class Main extends PureComponent {
  render () {
    const { pathname } = this.props
    return (
      <div>
        <div id='container'>
          <RouteSwitcher pathname={pathname} />
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
              {/* background: black; */}
            }
            #container[class*="animate-"] {
              position: fixed;
              animation: animateIn .5s ease-in-out forwards; 
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
