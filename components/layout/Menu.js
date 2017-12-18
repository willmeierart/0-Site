import routeData from '../../router/routeData'
import router from '../../router'
const { Link } = router

const Menu = (props) => {
  const pageList = Object.keys(routeData)
  const topPages = pageList.filter(route => {
    return routeData[route].type.indexOf('top') === 0
  })
  const topPageData = topPages.map((route) => routeData[route])

  const renderList = () => {
    return topPageData.map((each, i) => {
      return (
        <li onClick={props.closeMenu} key={i}>
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
  console.log(renderList)
  return (
    <div className='outer-wrapper'>
      <ul style={{listStyle: 'none', color: 'rgba(255,0,0,1)', textAlign: 'right', textShadow: '0 0 30px black'}}>
        { renderList() }
      </ul>
      <style jsx>{`
        .outer-wrapper{
          {/* background: rgba(0,0,0,.5); */}
        }
        ul {
          list-style:none;
          color: rgba(255, 0, 0, 1);
          text-align:right;
          text-shadow: 0 0 30px rgb(0,0,0);
        }
      `}</style>
    </div>
  )
}

export default Menu
