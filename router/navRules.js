const navRules = type => {
  let rules = {}
  switch (type) {
    case 'horizontal':
      rules = {
        type,
        style: {
          width: '1.5',
          height: '1'
        }
      }
      break
    case 'vertical' :
      rules = {
        type,
        style: {
          width: '1',
          height: '3'
        }
      }
      break
    default :
      console.log('default')
      rules = {
        type,
        style: {
          width: '3',
          height: '1',
          backgroundImageForward: '/static/img/arrowRight.png',
          backgroundImageBack: '/static/img/arrowLeft.png'
        }
      }
  }
  return rules
}

export default navRules
