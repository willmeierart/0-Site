// import { graphql, compose } from 'react-apollo'
// import Loader from 'react-loaders'
// import withData from '../lib/withData'
import faker from 'faker'
// import { checkAllQueriesLoading, checkAllQueriesError } from '../lib/_utils'
import App from '../../components/App'
import routeData from '../../router/routeData'
// import CenterLogo from '../components/layout/CenterLogo'

const content = () => (
  <div className='active'>
    {/* {faker.lorem.paragraphs(120)} */}
    <style jsx>{`
      .active {
        {/* width: 50vw; */}
        height: 100vh;
      }
    `}</style>
  </div>
)

// include boilerplate for global loader dependent on graphql req's:
export default () => {
  // const indexRoute = routeData.find(route => route.title === 'home')
  return (
    <App routeData={routeData.home} title='home'>
      <div className='content'>
        {/* const allQueries = [allThings1, allThings2]
          checkAllQueriesLoading(allQueries, content) */}
        { content() }
      </div>
      <style jsx>{`
        .content {
          width: 100vw;
        }
      `}</style>
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
