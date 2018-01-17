// import { graphql, compose } from 'react-apollo'
// import Loader from 'react-loaders'
// import withData from '../lib/withData'
// import { checkAllQueriesLoading, checkAllQueriesError } from '../lib/_utils'
import App from '../../components/App'
import PageTitle from '../../components/layout/PageTitle'
import routeData from '../../router/routeData'
import navRules from '../../router/navRules'
import { splitToSpans } from '../../lib/_utils'

// include boilerplate for global loader dependent on graphql req's:
export default ({ pathname }) => {
  // const indexRoute = routeData.find(route => route.title === 'home')

  const thisRouteData = { ...routeData.home }
  thisRouteData.navRules = navRules(thisRouteData.type)
  // const { titleCopy } = thisRouteData
  // const splitTitleCopy = titleCopy.split(' ').map((section, i) => {
  //   const wdL = section.length
  //   return (
  //     <h1 className={`section-${i}`} style={{}}>{
  //       splitToSpans(section)
  //     }</h1>
  //   )
  // })
  // const renderTitle = () => {
  //   return (
  //     <div>
  //       { splitTitleCopy }
  //     </div>
  //   )
  // }
  return (
    <App pathname={pathname} routeData={thisRouteData} title='HOME'>
      <div className='main-content'>
        {/* { renderTitle() } */}
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
