// main wrapper component - layout, universal styles, etc.
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { binder } from '../lib/_utils'
import { toggleMenu, setColorScheme, checkIfMobile, lockScrollOMatic, completePageTransition } from '../lib/redux/actions'
import Head from './Head'
import ScrollOMatic from './nav/ScrollOMatic'
import CenterLogo from './layout/CenterLogo'
import Menu from './layout/Menu'
import PageTitle from './layout/PageTitle'
import TransitionSled from './nav/TransitionSled'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      ready: false
    }
    binder(this, ['handleMouseEnter', 'handleMouseLeave', 'renderMenu', 'renderTransition'])
  }
  componentWillMount () { this.props.checkIfMobile() }
  componentDidMount () {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      ready: true
    })
    window.addEventListener('resize', () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      })
    })
  }
  shouldComponentUpdate (nextProps, nextState) {
    const { menuOpen, transitionComplete, freshLoad } = this.props
    if (menuOpen !== nextProps.menuOpen ||
      transitionComplete !== nextProps.transitionComplete ||
      freshLoad !== nextProps.freshLoad ||
      this.state.ready !== nextState.ready
    ) {
      return true
    }
    return false
  }

  handleMouseEnter () { this.props.toggleMenu(true) }
  handleMouseLeave () { this.props.toggleMenu(false) }

  renderMenu () {
    const { title } = this.props
    return (
      <div onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
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
        <style jsx>{`
          .menu-wrapper {
            position: fixed;
            height: 30%;
            width: 50%;
            right: 0;
            top: 35%;
            z-index:10;
            padding-right: 20vw;
          }
        `}</style>
      </div>
    )
  }

  renderTransition () {
    const { lockScrollOMatic, transitionComplete, completePageTransition, freshLoad, children, title, routeData, pathname, isMobile} = this.props
    const { width, height, ready } = this.state
    if (freshLoad) {
      lockScrollOMatic(false)
      return (
        <div>
          <PageTitle routeData={routeData} width={width} height={height} />
          <ScrollOMatic ready={ready} isMobile={isMobile} pathname={pathname} title={title} routeData={routeData} scrollInverted>
            { children }
          </ScrollOMatic>
        </div>
      )
    }
    return (
      // <Transition appear mountOnEnter unmountOnExit in={ready} timeout={50} component={FirstChild}>
      <TransitionSled k={title} width={width} height={height} transitionComplete={transitionComplete} completePageTransition={completePageTransition} lockScrollOMatic={lockScrollOMatic} appear>
        <PageTitle routeData={routeData} width={width} height={height} />
        <ScrollOMatic isMobile={isMobile} pathname={pathname} title={title} routeData={routeData} scrollInverted>
          { children }
        </ScrollOMatic>
      </TransitionSled>
      // </Transition>
    )
  }

  render () {
    console.log('update app')
    const { title, menuOpen } = this.props
    return (
      <div className='App' style={{ overflow: 'hidden' }}>
        <Head title={title} />
        <main style={{ overflow: 'hidden' }}>
          { this.renderTransition() }
          <CenterLogo />
          { menuOpen && this.renderMenu() }
        </main>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    freshLoad: state.functional.freshLoad,
    isMobile: state.functional.isMobile,
    menuOpen: state.ui.menuOpen,
    colors: state.ui.colors,
    transitionComplete: state.router.transitionComplete
  }
}

function mapDispatchToProps (dispatch) {
  return {
    checkIfMobile: () => dispatch(checkIfMobile()),
    toggleMenu: bool => dispatch(toggleMenu(bool)),
    setColorScheme: colorObj => dispatch(setColorScheme(colorObj)),
    lockScrollOMatic: bool => dispatch(lockScrollOMatic(bool)),
    completePageTransition: bool => dispatch(completePageTransition(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

App.PropTypes = {
  lockScrollOMatic: PropTypes.func.isRequired,
  checkIfMobile: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  freshLoad: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  setColorScheme: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  colors: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  routeData: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}
