import App from '../../components/App'
import routeData from '../../router/routeData'

export default () => {
  // const usRoute = routeData.find(route => route.title === 'us')
  return (
    <App routeData={routeData.us} title="us">
      <div>us</div>
      <style jsx>{``}</style>
    </App>
  )
}
