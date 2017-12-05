// main wrapper component - layout, universal styles, etc.

// import Link from 'next/link'
import Head from './Head'
import Header from './layout/Header'
import Footer from './layout/Footer'
import ScrollOMatic from './hoc/ScrollOMatic'
import CenterLogo from '../components/layout/CenterLogo'

export default ({ children, title, routeData }) => (
  <div className='App'>
    <Head title={title} />
    {/* <Header /> */}
    <main>
      <div className='logo-clip-path'>
        <ScrollOMatic routeData={routeData} className='scroll-o-matic'>{ children }</ScrollOMatic>
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
