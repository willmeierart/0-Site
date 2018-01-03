import routeData from '../../router/routeData'
import router from '../../router'
import PropTypes from 'prop-types'
const { Link } = router

const Menu = ({ closeMenu, title }) => {
  const pageList = Object.keys(routeData)
  const topPages = pageList.filter(route => {
    return routeData[route].type.indexOf('top') === 0 && routeData[route].route !== title
  })
  const topPageData = topPages.map((route) => routeData[route])

  const renderList = () => {
    return topPageData.map((each, i) => {
      return (
        <li onClick={closeMenu} key={i}>
          <Link prefetch route='main' params={{slug: each.route}}>
            <a style={{textDecoration: 'none', color: 'inherit'}}><h1>{ each.route }</h1></a>
          </Link>
          <style jsx>{`
            a {
              text-decoration: none;
              color: inherit;
            }
          `}</style>
        </li>
      )
    })
  }
  return (
    <div className='outer-wrapper'>
      <ul style={{listStyle: 'none', textTransform: 'uppercase', fontFamily: 'helvetica, sans-serif', fontSize: '.8vw', color: 'rgba(0,255,255,1)', textAlign: 'right'}}>
        { renderList() }
      </ul>
    </div>
  )
}

export default Menu

Menu.PropTypes = {
  closeMenu: PropTypes.func.isRequired
}
