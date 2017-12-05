import App from '../../components/App'
import routeData from '../../router/routeData'

export default () => {
  // const converseRoute = routeData.find(route => route.title === 'converse')
  return (
    <App routeData={routeData.converse} title="converse">
      <div>converse</div>
      <style jsx>{``}</style>
    </App>
  )
}
