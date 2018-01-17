// import faker from 'faker'
import App from '../../components/App'
import routeData from '../../router/routeData'
import navRules from '../../router/navRules'

export default ({ pathname }) => {
  const thisRouteData = { ...routeData.converse }
  thisRouteData.navRules = navRules(thisRouteData.type)

  const titleStyle = {
    fontSize: '20vw',
    fontWeight: 'bold',
    width: '100vw',
    height: '100vh',
    top:0,
    left:0,
    textTransform: 'uppercase',
    background: 'transparent',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 5,
    pointerEvents: 'none',
    opacity: .125
  }

  return (
    <App titleStyle={titleStyle} pathname={pathname} routeData={thisRouteData} title='converse'>
      <div className='main-content'>
        {/* {faker.lorem.paragraphs(120)} */}
        <h3>Contact Info</h3>
        <div>WE WANT YOU! (maybe)</div>
        <div>[jobs]</div>
        <div>Hello, is it you we're looking for?</div>
      </div>
      <style jsx>{`
        .main-content {
          {/* position: absolute; */}
          width: 100%;
          height: 100%;
          padding: 10vw;
        }
      `}</style>
    </App>
  )
}
