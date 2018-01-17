import { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RouteSwitcher from '../components/nav/RouteSwitcher'

class Main extends PureComponent {
  render () {
    const { pathname, bgColor } = this.props
    return (
      <div>
        <div id='container' style={{ background: bgColor, overflowScrolling: 'touch', WebkitOverflowScrolling: 'touch', overflow: 'hidden' }}>
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
            }
            #container[class*="animate-"] {
              position: fixed;
              animation: animateIn 1s ease-in-out forwards; 
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

function mapStateToProps (state) {
  return {
    bgColor: state.ui.colors.actualBG
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

Main.propTypes = {
  pathname: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired
}
