import { Component } from 'react'
import DOM from 'react-dom'
import throttle from 'lodash.throttle'
// import { connect } from 'react-redux'
import { binder } from '../lib/_utils'

let timer = null

export default class TesterAnimatedThing extends Component {
  constructor (props) {
    super(props)
    binder(this, ['animateStuff', 'makeRandomCircle'])
  }

  makeRandomCircle () {
    const randomNum = () => Math.floor(Math.random() * 100)
    const circle = DOM.findDOMNode(this.circle)
    if (timer) clearTimeout(timer)

    if (circle) {
      timer = setTimeout(() => {
        console.log(circle.style.transform)
        const trans3d = 'translate3d(' + -this.props.amt * Math.floor(randomNum() / 20 + 1) + 'px, ' + -this.props.amt * Math.floor(randomNum() / 20 + 1) + 'px, 1px)'
        circle.style.width = randomNum() + 'px'
        circle.style.height = randomNum() + 'px'
        circle.style.transform = trans3d
      }, 15)
    }
  }

  animateStuff () {
    this.makeRandomCircle()
    return (
      <div>{ this.props.amt }</div>
    )
  }

  render () {
    return (
      <div className='animation-test-wrapper'>
        { this.animateStuff() }
        <div ref={(ref) => { this.circle = ref }} style={{
          borderRadius: '50%',
          backgroundColor: 'black'
        }} className='circle' />
        <style jsx>{`
          .animation-test-wrapper {
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            left:0;
            {/* display: flex;
            justify-content: center;
            align-items: center; */}
          }
        `}</style>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     freshLoad: state.functional.freshLoad,
    
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     checkIfMobile: () => dispatch(checkIfMobile()),
    
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TesterAnimatedThing)
