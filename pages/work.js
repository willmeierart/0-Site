import App from '../components/App'
import routeData from '../lib/routeData'

export default () => {
  const workRoute = routeData.find(route => route.title === 'work')
  return (
    <App routeData={workRoute} title='work'>
      <div>work</div>
      <style jsx>{``}</style>
    </App>
  )
}
