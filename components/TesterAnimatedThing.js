import { Component } from 'react'
// import { connect } from 'react-redux'
import { binder } from '../lib/_utils'

export default class TesterAnimatedThing extends Component {
  constructor (props) {
    super(props)
    binder(this, ['animateStuff'])
  }
  
  animateStuff () {
    return (
      <div>a</div>
    )
  }

  render () {
    return (
      <div>{ this.animateStuff() }</div>
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
