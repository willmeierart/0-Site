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
        <body onWheel={(e) => { this.preventScrollNav(e) }}>
          <Main />
          <NextScript />
        </body>
        <style jsx>{`
          html, body {
            overflow: hidden;
          }
        `}</style>
      </html>
    )
  }
}
