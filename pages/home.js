// import { graphql, compose } from 'react-apollo'
// import Loader from 'react-loaders'
// import withData from '../lib/withData'
// import faker from 'faker'
// import { checkAllQueriesLoading, checkAllQueriesError } from '../lib/_utils'
import App from '../components/App'
import routeData from '../router/routeData'
import navRules from '../router/navRules'

// include boilerplate for global loader dependent on graphql req's:
export default ({ pathname, isMobile }) => {
  // const indexRoute = routeData.find(route => route.title === 'home')

  const thisRouteData = { ...routeData.home }
  thisRouteData.navRules = navRules(thisRouteData.type)
  const titleStyle = {
    fontSize: '20vw',
    fontWeight: 'bold',
    width: '100vw',
    height: '100vh',
    top:0,
    left:0,
    textTransform: 'uppercase',
    background: 'transparent',
    position: 'fixed',
    display: 'flex',
    whiteSpace: 'word-wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 5,
    pointerEvents: 'none',
    opacity: .125
  }
  return (
    <App splitSpans titleStyle={titleStyle} pathname={pathname} routeData={thisRouteData} title=' wel come home'>
      <div className='main-content'>
        {/* const allQueries = [allThings1, allThings2]
          checkAllQueriesLoading(allQueries, content) */}
      </div>
      {/* <style jsx>{`
        .content {
        }
      `}</style> */}
    </App>
  )
}

// example of GraphQL with multiple queries composed:
// export default withData(
//   compose(
//     graphql(allThings1, { name: 'allThings1' }),
//     graphql(allThings2, { name: 'allThings2' })
//   )(HomePage)
// )
