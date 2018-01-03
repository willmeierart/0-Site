// import faker from 'faker'
import App from '../../components/App'
import routeData from '../../router/routeData'
import navRules from '../../router/navRules'

export default ({ pathname }) => {
  const thisRouteData = { ...routeData.skills }
  thisRouteData.navRules = navRules(thisRouteData.type)
  return (
    <App pathname={pathname} routeData={thisRouteData} title='services'>
      <div className='main-content'>
        {/* {faker.lorem.paragraphs(120)} */}
        <ul>
          <li>Research</li>
          <li>Strategy</li>
          <li>Brand Development</li>
          <li>Identity</li>
          <li>Web<ul>
            <li>Websites</li>
            <li>Digital Advertising</li>
            <li>Social Advertising</li>
            <li>Viral</li>
          </ul></li>
          <li>Video</li>
          <li>Audio</li>
          <li>Photography</li>
          <li>Copywriting</li>
          <li>Print/Outdoor</li>
          <li>Media<ul>
            <li>Second Thing</li>
            <li>Third Thing<ul>
              <li>Fourth Thing</li>
            </ul></li>
          </ul></li>
        </ul>
      </div>
      <style jsx>{`
        .main-content {
          width: 100%;
          height: 100%;
          padding: 10vw;
        }
      `}</style>
    </App>
  )
}
