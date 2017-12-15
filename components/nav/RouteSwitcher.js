import home from '../../pages/home'
import converse from '../../pages/converse'
import services from '../../pages/services'
import us from '../../pages/us'
import work from '../../pages/work'

export default ({ pathname }) => {
  let ThisComponent = home
  switch (true) {
    case pathname === 'converse':
      ThisComponent = converse
      break
    case pathname === 'services':
      ThisComponent = services
      break
    case pathname === 'us':
      ThisComponent = us
      break
    case pathname === 'work':
      ThisComponent = work
      break
    default:
      ThisComponent = home
      break
  }
  return <ThisComponent pathname={pathname} />
}