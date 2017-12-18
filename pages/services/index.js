// import faker from 'faker'
import App from '../../components/App'
import routeData from '../../router/routeData'
import navRules from '../../router/navRules'

export default ({ pathname }) => {
  const thisRouteData = { ...routeData.services }
  thisRouteData.navRules = navRules(thisRouteData.type)
  return (
    <App pathname={pathname} routeData={thisRouteData} title='services'>
      <div>
        {/* {faker.lorem.paragraphs(120)} */}
      </div>
      <style jsx>{``}</style>
    </App>
  )
}
