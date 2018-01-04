import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { binder } from '../lib/_utils'

export default class CustomDocument extends Document {
  constructor (props) {
    super(props)
    binder(this, ['preventScrollNav'])
  }
  preventScrollNav (e) { e.preventDefault() }
  render () {
    return (
      <html lang='en-US' onWheel={(e) => { this.preventScrollNav(e) }}>
        <Head />
        <body style={{background: 'rgba(151,13,17,1)'}}
          onTouchStart={(e) => { this.preventScrollNav(e) }}
          onTouchMove={(e) => { this.preventScrollNav(e) }}
          onWheel={(e) => { this.preventScrollNav(e) }}>
          <Main />
          <NextScript />
        </body>
        <style jsx global>{`
          html, body {
            overflow: hidden;
            {/* background: black; */}
          }
        `}</style>
      </html>
    )
  }
}
