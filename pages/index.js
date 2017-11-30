// import { graphql, compose } from 'react-apollo'
// import Loader from 'react-loaders'
// import withData from '../lib/withData'
// import { allFadeColors, allPaintings } from '../lib/queries'
// import { formatColors } from '../lib/_utils'
// import faker from 'faker'
// import { checkAllQueriesLoading, checkAllQueriesError } from '../lib/_utils'
import App from '../components/App'
import CenterLogo from '../components/layout/CenterLogo'

const content = () => (
  <div className='active'>
    {/* {faker.lorem.paragraphs(70)} */}
    <style jsx>{`
      .active {
        width: 50vw;
        height: 100vh;
        overflow: hidden;
        {/* text-align: justify; */}
      }
    `}</style>
  </div>
)

// include boilerplate for global loader dependent on graphql req's:
export default () => {
  return (
    <App title='Home'>
      <div className='content'>

        {/* const allQueries = [allThings1, allThings2]
          checkAllQueriesLoading(allQueries, content) */}

        {/* { content() } */}
        { content() }
        {/* <CenterLogo /> */}
        {/* <div className='logo-mask' /> */}
      </div>
      <style jsx>{`
        .content {
          {/* background-color: var(--AZ-RED); */}
          width:100vw;
          height:100vh;
        }
        {/* .logo-mask {
          width:100vw;
          height:100vh;
          position:absolute;
          top:0; left:0;
          display:flex;
          justify-content:center;
          align-items:center;
        } */}
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
