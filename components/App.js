// main wrapper component - layout, universal styles, etc.
import Head from './Head'
import ScrollOMatic from './nav/ScrollOMatic'
import CenterLogo from '../components/layout/CenterLogo'

export default ({ children, title, routeData, pathname }) => {
  return (
    <div className='App'>
      <Head title={title} />
      <main>
        <div className='logo-clip-path'>
          <ScrollOMatic className='scroll-o-matic' pathname={pathname} title={title} routeData={routeData} scrollInverted dualAxis>
            { children }
          </ScrollOMatic>
        </div>
        <CenterLogo colors={{ color1: routeData.bgColor2, color2: routeData.bgColor1 }} />
      </main>
      <style jsx>{`
        .scroll-o-matic {}
      `}</style>
      {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
    </div>
  )
}
