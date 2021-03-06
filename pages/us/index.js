// import faker from 'faker'
import App from '../../components/App'
import routeData from '../../router/routeData'
import navRules from '../../router/navRules'
import UsSplash from './splash'

const Us = ({ pathname }) => {
  const thisRouteData = { ...routeData.us }
  thisRouteData.navRules = navRules(thisRouteData.type)
  const titleStyle = {
    fontSize: '70vw',
    fontWeight: 'bold',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    textTransform: 'uppercase',
    background: 'transparent',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 5,
    pointerEvents: 'none',
    opacity: 0.125
  }
  return (
    <App splitSpans titleStyle={titleStyle} pathname={pathname} routeData={thisRouteData} title='us'>
      <div>
        {/* {faker.lorem.paragraphs(120)} */}
        <UsSplash />
      </div>
      {/* <style jsx>{``}</style> */}
    </App>
  )
}

export default Us
