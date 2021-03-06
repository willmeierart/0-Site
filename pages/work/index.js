// import faker from 'faker'
import App from '../../components/App'
import routeData from '../../router/routeData'
import navRules from '../../router/navRules'

const Work = ({ pathname }) => {
  const thisRouteData = { ...routeData.work }
  thisRouteData.navRules = navRules(thisRouteData.type)
  return (
    <App pathname={pathname} routeData={thisRouteData} title='work'>
      <div>
        {/* {faker.lorem.paragraphs(120)} */}
      </div>
      {/* <style jsx>{``}</style> */}
    </App>
  )
}

export default Work
