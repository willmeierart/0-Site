// main wrapper component - layout, universal styles, etc.
import react, { Component } from 'react'
import { connect } from 'react-redux'
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
  handleMouseEnter () {
    this.props.toggleMenu(true)
  }
  handleMouseLeave () {
    this.props.toggleMenu(false)
  }
  // handleColorChange (colorObj) {
  //   this.props.setColorScheme(colorObj)
  // }
  render () {
    const { children, title, routeData, pathname, menuOpen } = this.props
    return (
      <div className='App'>
        <Head title={title} />
        <main>
          <div className='logo-clip-path'>
            <ScrollOMatic className='scroll-o-matic'
              pathname={pathname} title={title}
              routeData={routeData} scrollInverted dualAxis handleColorChange={this.handleColorChange}>
              { children }
            </ScrollOMatic>
          </div>
          <CenterLogo openMenu={this.handleMouseEnter} closeMenu={this.handleMouseLeave} /*colors={{ current: cur2 }}*/ />
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
