import routeData from '../../router/routeData'

export default ({ pathname }) => {
  // const splitPath = pathname.split('/')
  // const pathEnd = splitPath === '' ? 'home' : splitPath[splitPath.length - 1]
  // console.log(splitPath)
  // const thisRoute = routeData[pathEnd]
  // const ThisComponent = thisRoute.component
  const ThisComponent = routeData[pathname].component

  return <ThisComponent pathname={pathname} />
}
