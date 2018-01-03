// literally HTML head - all SEO stuff, etc.
import Head from 'next/head'
import globalStyles from '../static/styles/index.scss'

const initialProps = {
  title: 'Agency Zero',
  initialScale: '1.0'
}

export default (props = initialProps) => {
  const { title, initialScale } = props
  return <Head>
    <title key='title'>{title}</title>
    <meta key='charset' charset='utf-8' />
    <meta key='viewport' name='viewport' content={`inital-scale=${initialScale || initialProps.initialScale}, width=device-width, shrink-to-fit=no`} />
    <meta key='meta-title' name='title' content='Agency Zero' />
    <link rel='shortcut icon' href='/static/zero.ico' />
    {/* <script async src='https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X' /> */}
    {/* <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css' /> */}
    <link href='https://cdn.bootcss.com/loaders.css/0.1.2/loaders.min.css' rel='stylesheet' />
    <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
  </Head>
}
