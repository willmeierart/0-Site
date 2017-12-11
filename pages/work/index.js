import faker from 'faker'
import App from '../../components/App'
import routeData from '../../router/routeData'

export default () => {
  // const workRoute = routeData.find(route => route.title === 'work')
  return (
    <App routeData={routeData.work} title='work'>
      <div>
        {/* {faker.lorem.paragraphs(120)} */}
      </div>
      <style jsx>{``}</style>
    </App>
  )
}
