// main wrapper component - layout, universal styles, etc.

// import Link from 'next/link'
import Head from './Head'
import Header from './layout/Header'
import Footer from './layout/Footer'
import ScrollOMatic from './hoc/ScrollOMatic'
import CenterLogo from '../components/layout/CenterLogo'
import colors from './ui/colors'

// import globalStyles from '../../styles/index.scss'

export default ({ children, title }) => (
  <div className='App'>
    <Head title={title} />
    {/* <Header /> */}
    <main>
      <div className='logo-clip-path'>
        <ScrollOMatic colors={colors} className='scroll-o-matic'>{children}</ScrollOMatic>
      </div>
      <CenterLogo colors={colors} />
    </main>
    {/* <Footer /> */}
    <style jsx global>{`
      :root {
        --AZ-RED: #970d11;
      }
      .App {
        {/* overflow:hidden; */}
      }
      .logo-clip-path {
        position: relative; top:0; left:0;
        width:100vw; height:100vh;
      }
      .scroll-o-matic {

      }
      .active, .content, .logo-mask, .logo-wrapper {
        shape-outside: circle(15%);
        float:right;
      }
    `}</style>
    {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
  </div>
)
