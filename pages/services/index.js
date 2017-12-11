import faker from 'faker'
import App from '../../components/App'
import routeData from '../../router/routeData'

export default () => {
  // const servicesRoute = routeData.find(route => route.title === 'services')
  return (
    <App routeData={routeData.services} title="services">
      <div>
        {/* {faker.lorem.paragraphs(120)} */}
      </div>
      <style jsx>{``}</style>
    </App>
  )
}
