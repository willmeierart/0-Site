const nextRoutes = require('next-routes')
const router = nextRoutes()

router
  .add('main', '/:slug/:child?', '')  // <<< transition example = this only
  // .add('home', '/:slug', '')
  // .add('us', '/:slug', '')
  // .add('work', '/:slug', '')
  // .add('services', '/:slug', '')
  // .add('converse', '/:slug', '')

  // .add('home', '/')
  // .add('us', '/us')
  // .add('work', '/work')
  // .add('services', '/services')
  // .add('converse')

  // .add('us', '/us/:slug', '')
  // .add('work', '/work/:slug', '')
  // .add('services', '/services/:slug', '')

module.exports = router
