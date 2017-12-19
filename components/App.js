// main wrapper component - layout, universal styles, etc.
import react, { Component } from 'react'
import { connect } from 'react-redux'
import { binder } from '../lib/_utils'
import { toggleMenu } from '../lib/redux/actions'
import Head from './Head'
import ScrollOMatic from './nav/ScrollOMatic'
import CenterLogo from './layout/CenterLogo'
import Menu from './layout/Menu'

class App extends Component {
  constructor (props) {
    super(props)
    binder(this, ['handleMouseEnter', 'handleMouseLeave'])
  }
  handleMouseEnter () {
    this.props.toggleMenu(true)
  }
  handleMouseLeave () {
    this.props.toggleMenu(false)
  }
  render () {
    const { children, title, routeData, pathname, menuOpen } = this.props
    return (
      <div className='App'>
        <Head title={title} />
        <main>
          <div className='logo-clip-path'>
            <ScrollOMatic className='scroll-o-matic'
              pathname={pathname} title={title}
              routeData={routeData} scrollInverted dualAxis>
              { children }
            </ScrollOMatic>
          </div>
          <CenterLogo colors={{ color1: routeData.bgColor2, color2: routeData.bgColor1 }} />
          { menuOpen &&
            <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}
              className='menu-wrapper' style={{
                position: 'absolute',
                height: '10%',
                width: '200%',
                right: 0,
                top: '30%',
                zIndex: 5,
                marginRight: '2vw'
              }}>
              <Menu closeMenu={() => this.props.toggleMenu(false)} />
            </div>
          }
        </main>
        <style jsx>{`
          .scroll-o-matic {}
          .menu-wrapper {
            position: absolute;
            height: 30%;
            width: 50%;
            right: 0;
            top: 30%;
            z-index:5;
            padding-right: 20vw;
          }
        `}</style>
        {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    menuOpen: state.ui.menuOpen
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleMenu: bool => dispatch(toggleMenu(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
