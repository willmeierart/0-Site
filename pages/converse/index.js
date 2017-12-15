// import faker from 'faker'
import App from '../../components/App'
import routeData from '../../router/routeData'
import navRules from '../../router/navRules'

export default ({ pathname }) => {
  // const converseRoute = routeData.find(route => route.title === 'converse')
  const thisRouteData = { ...routeData.converse }
  thisRouteData.navRules = navRules(thisRouteData.type)

  return (
    <App pathname={pathname} routeData={thisRouteData} title='converse'>
      <div>
        {/* {faker.lorem.paragraphs(120)} */}
      </div>
      <style jsx>{``}</style>
    </App>
  )
}
