import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleMenu, setColorScheme } from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'
import { AzLogo01 } from '../assets/ZeroLogos'

class CenterLogo extends Component {
  constructor (props) {
    super(props)
    binder(this, ['handleMouseEnter', 'handleMouseLeave'])
    // this.state = { currentColor: this.props.colors.cur2 }
  }
  // componentDidMount () {
  //   window.addEventListener('scroll', this.handleScroll)
  //   // this.setState(() => ({ currentColor: this.props.colors.color1 }))
    // this.props.setColorScheme({})
  // }
  // componentWillUnmount () {
  //   window.removeEventListener('scroll', this.handleScroll)
  // }
  // handleScroll (e) {
  // //   const { colors } = this.props
  // //   let { scrollTop, scrollHeight } = e.srcElement.scrollingElement
  // //   scrollHeight = scrollHeight / 2
  // //   if (scrollTop === 0) { scrollTop = 1 }
  // //   const scrollTiplier = scrollTop / scrollHeight
  //   console.log('catching scroll')

  //   this.setState(() => ({
  //     currentColor: this.props.colors.cur2
  //   }))
  // }
  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
  }

  // AzLogo () {
  //   const color = this.props.menuOpen ? 'rgba(0, 255, 255, 1)' : this.props.colors.cur2
  //   return (
  //     <div className='az-logo-01' style={{ width: '120%', marginLeft: '-10%' }}>
  //       <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 103.33 152'>
  //         <title>AZ-LOGO-01</title>
  //         <path style={{ fill: 'none' }} className='cls-1' d='M57.57,35.17H45.76a11.61,11.61,0,0,0-11.6,11.59V75.53l35-14.82v-14A11.6,11.6,0,0,0,57.57,35.17Z' />
  //         <path onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} style={{ fill: color }} className='cls-2' d='M93.91,68.86V50.24l-7.6,3.22v-6.7A28.78,28.78,0,0,0,57.57,18H45.76A28.78,28.78,0,0,0,17,46.76v36L9.42,86v18.65l.77-.35L17,101.42v3.48a28.78,28.78,0,0,0,28.75,28.75V116.49a11.61,11.61,0,0,1-11.6-11.6V94.16l35-14.82V104.9a11.61,11.61,0,0,1-11.6,11.6v17.15A28.78,28.78,0,0,0,86.31,104.9V72.08ZM34.16,75.53V46.76a11.61,11.61,0,0,1,11.6-11.59H57.57a11.6,11.6,0,0,1,11.6,11.59v14Z' />
  //       </svg>
  //       <style jsx>{`
  //         .cls-1 {
  //           fill: none;
  //         }
  //         .cls-2 {
  //           fill: ${color};
  //         }
  //         .az-logo-01 {
  //           width: 120%;
  //           margin-left: -10%;
  //         }
  //       `}</style>
  //     </div>
  //   )
  // }

  handleMouseEnter () {
    this.props.toggleMenu(true)
    // this.props.openMenu()
  }
  handleMouseLeave () {
    this.props.toggleMenu(false)
    // this.props.closeMenu()
  }
  render () {
    console.log(this.props)
    // const { current } = this.props.colors
    // const { colors } = this.props
    const { cur2 } = this.props.colors
    return (
      <div className='logo-wrapper'>
        <div // onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}
          className='logo-inner-wrapper'>
          <AzLogo01 handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} color={this.props.menuOpen ? 'rgba(0, 255, 255, 1)' : cur2} />
          {/* { this.AzLogo() } */}
        </div>
        <style jsx>{`
          .logo-wrapper {
            {/* width:100%; height:100%; */}
            margin-left:35%;
            margin-top:35%;
            width:30%;
            height:30%;
            z-index:5;
            position:fixed; top:0; left:0;
            display: flex; justify-content: center; align-items: center;
            {/* pointer-events: none; */}
          }
          .logo-inner-wrapper {
            width:100%;
          }
        `}</style>
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

export default connect(mapStateToProps, mapDispatchToProps)(CenterLogo)
