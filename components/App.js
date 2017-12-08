// main wrapper component - layout, universal styles, etc.

import ScrollLock from 'react-scroll-lock-component'
import Head from './Head'
import Header from './layout/Header'
import Footer from './layout/Footer'
import ScrollOMatic from './hoc/ScrollOMatic'
import CenterLogo from '../components/layout/CenterLogo'

export default ({ children, title, routeData }) => {
  return (
    <div className='App'>
      <Head title={title} />
      {/* <Header /> */}
      <main>
        <div className='logo-clip-path'>
          <ScrollLock>
            <ScrollOMatic routeData={routeData} className='scroll-o-matic'>
              { children }
            </ScrollOMatic>
          </ScrollLock>
        </div>
        <CenterLogo colors={{ color1: routeData.bgColor2, color2: routeData.bgColor1 }} />
      </main>
      {/* <Footer /> */}
      <style jsx>{`
        .scroll-o-matic {}
      `}</style>
      {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
    </div>
  )
}
