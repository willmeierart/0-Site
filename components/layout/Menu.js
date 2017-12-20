import routeData from '../../router/routeData'
import router from '../../router'
import PropTypes from 'prop-types'
const { Link } = router

const Menu = ({ closeMenu }) => {
  const pageList = Object.keys(routeData)
  const topPages = pageList.filter(route => {
    return routeData[route].type.indexOf('top') === 0
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
      <ul style={{listStyle: 'none', color: 'rgba(0,255,255,1)', textAlign: 'right', textShadow: '0 0 30px black'}}>
        { renderList() }
      </ul>
      <style jsx>{`
        .outer-wrapper{
          {/* background: rgba(0,0,0,.5); */}
        }
        ul {
          list-style:none;
          text-transform: uppercase;
          font-family: helvetica, sans-serif;
          color: rgba(0, 255, 255, 1);
          text-align:right;
          text-shadow: 0 0 30px rgb(0,0,0);
        }
      `}</style>
    </div>
  )
}

export default Menu

Menu.PropTypes = {
  closeMenu: PropTypes.func.isRequired
}