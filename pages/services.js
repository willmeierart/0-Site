import App from '../components/App'
import routeData from '../lib/routeData'

export default () => {
  const servicesRoute = routeData.find(route => route.title === 'services')
  return (
    <App routeData={servicesRoute} title='services'>
      <div>services</div>
      <style jsx>{``}</style>
    </App>
  )
}
