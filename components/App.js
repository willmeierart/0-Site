// main wrapper component - layout, universal styles, etc.
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { binder } from '../lib/_utils'
import { toggleMenu, setColorScheme } from '../lib/redux/actions'
import Head from './Head'
import ScrollOMatic from './nav/ScrollOMatic'
import CenterLogo from './layout/CenterLogo'
import Menu from './layout/Menu'

class App extends Component {
  constructor (props) {
    super(props)
    binder(this, ['handleMouseEnter', 'handleMouseLeave'])
  }
  handleMouseEnter () { this.props.toggleMenu(true) }
  handleMouseLeave () { this.props.toggleMenu(false) }
  render () {
    const { children, title, routeData, pathname, menuOpen } = this.props
    return (
      <div className='App'>
        <Head title={title} />
        <main>
          <div className='logo-clip-path'>
            <div className='page-title'>{ title }</div>
            <ScrollOMatic className='scroll-o-matic'
              pathname={pathname} title={title}
              routeData={routeData} scrollInverted>
              { children }
            </ScrollOMatic>
          </div>
          <CenterLogo />
          { menuOpen &&
            <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}
              className='menu-wrapper' style={{
                position: 'absolute',
                height: '10%',
                width: '30%',
                right: '8%',
                top: '40%',
                zIndex: 5,
                marginRight: '2vw'
              }}>
              <Menu title={title} closeMenu={() => this.props.toggleMenu(false)} />
            </div>
          }
        </main>
        <style jsx>{`
          .page-title {
            font-family: Helvetica, sans-serif;
            margin: .5em;
            font-size: 4em;
            text-transform: uppercase;
            background: transparent;
            position: fixed;
            top: .5em;
            left: .5em;
            z-index: 5;
          }
          .scroll-o-matic {}
          .menu-wrapper {
            position: fixed;
            height: 30%;
            width: 50%;
            right: 0;
            top: 35%;
            z-index:5;
            padding-right: 20vw;
            {/* transition: opacity 1s ease-in-out; */}
          }
        `}</style>
        {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
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
    toggleMenu: bool => dispatch(toggleMenu(bool)),
    setColorScheme: colorObj => dispatch(setColorScheme(colorObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

App.PropTypes = {
  toggleMenu: PropTypes.func.isRequired,
  setColorScheme: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  colors: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  routeData: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}
