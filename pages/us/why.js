// import faker from 'faker'
import App from '../../components/App'
import routeData from '../../router/routeData'
import navRules from '../../router/navRules'

export default ({ pathname }) => {
  const thisRouteData = { ...routeData.why }
  thisRouteData.navRules = navRules(thisRouteData.type)
  return (
    <App pathname={pathname} routeData={thisRouteData} title='why'>
      <div>
        {/* {faker.lorem.paragraphs(120)} */}
      </div>
      {/* <style jsx>{``}</style> */}
    </App>
  )
}
