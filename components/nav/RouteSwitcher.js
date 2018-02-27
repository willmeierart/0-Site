// uses pathname synthetically applied via custom express server to change the core component of a given route

import routeData from '../../router/routeData'
import PropTypes from 'prop-types'

const RouteSwitcher = ({ pathname }) => {
  // const splitPath = pathname.split('/')
  // const pathEnd = splitPath === '' ? 'home' : splitPath[splitPath.length - 1]
  // console.log(splitPath)
  // const thisRoute = routeData[pathEnd]
  // const ThisComponent = thisRoute.component
  // console.log(pathname)
  const isHome = pathname === '' || pathname === '/'
  const ThisComponent = isHome ? routeData.home.component : routeData[pathname].component

  return <ThisComponent pathname={pathname} />
}

export default RouteSwitcher

RouteSwitcher.PropTypes = {
  pathname: PropTypes.string.isRequired
}
