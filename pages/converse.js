import App from '../components/App'
import routeData from '../lib/routeData'

export default () => {
  const converseRoute = routeData.find(route => route.title === 'converse')
  return (
    <App routeData={converseRoute} title='converse'>
      <div>converse</div>
      <style jsx>{``}</style>
    </App>
  )
}
