import App from '../components/App'
import routeData from '../lib/routeData'

export default () => {
  // const workRoute = routeData.find(route => route.title === 'work')
  return (
    <App routeData={routeData.work} title='work'>
      <div>work1</div>
      <style jsx>{``}</style>
    </App>
  )
}
