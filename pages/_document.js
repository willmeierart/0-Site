import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { binder } from '../lib/_utils'

export default class CustomDocument extends Document {
  constructor (props) {
    super(props)
    this.state = { loaded: false, isMobile: false }
    binder(this, ['preventScrollNav'])
  }
  preventScrollNav (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  // componentDidMount () {
  //   this.windowCheck()
  // }
  // windowCheck () {
  //   // console.log('windowCheck')
  //   // if (typeof window !== 'undefined') {
  //   //   this.setState({
  //   //     loaded: true,
  //   //     isMobile: window.orientation !== undefined
  //   //   })
  //   //   console.log('found window')
  //   // } else {
  //   //   setInterval(() => this.windowCheck(), 500)
  //   // }
  // }
  render () {
    // let overflowStatus = 'hidden'
    // if (typeof window !== 'undefined'){
    //   if (typeof window.orientation === 'undefined') {
    //     overflowStatus = 'scroll'
    //   }
    // }
    return (
      <html lang='en-US'
        onWheel={(e) => { this.preventScrollNav(e) }}
        onTouchStart={(e) => { this.preventScrollNav(e) }}
        onTouchMove={(e) => { this.preventScrollNav(e) }}>
        <Head />
        <body style={{ background: 'rgba(151,13,17,1)' }}
          onTouchStart={(e) => { this.preventScrollNav(e) }}
          onTouchMove={(e) => { this.preventScrollNav(e) }}
          onWheel={(e) => { this.preventScrollNav(e) }}>
          <Main />
          <NextScript />
        </body>
        <style jsx global>{`
          html, body {
            overflow: hidden;
            {/* overflowScrolling: 'touch';
            -webkit-overflow-scrolling: 'touch'; */}
          }
        `}</style>
      </html>
    )
  }
}
