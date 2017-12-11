import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  render () {
    return (
      <html lang='en-US'>
        <Head />
        <body>
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
