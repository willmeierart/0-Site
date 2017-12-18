const navRules = type => {
  let rules = {}
  switch (type) {
    case 'topNoSub':
      rules = {
        type,
        style: {
          top: 0,
          left: '100vw',
          width: '3',
          height: '1',
          backgroundImageForward: '/static/img/arrowLeft.png',
          backgroundImageBack: '/static/img/arrowRight.png'
        }
      }
      break
    case 'topWSub' :
      rules = {
        type,
        style: {
          top: 0,
          left: '100vw',
          width: '3',
          height: '1',
          backgroundImageForward: '/static/img/arrowLeft.png',
          backgroundImageBack: '/static/img/arrowRight.png'
        }
      }
      break
    case 'subMid' :
      rules = {
        type,
        style: {
          top: '100vh',
          left: 0,
          width: '1',
          height: '3',
          backgroundImageForward: '/static/img/arrowUp.png',
          backgroundImageBack: '/static/img/arrowDown.png'
        }
      }
      break
    case 'subLast' :
      rules = {
        type,
        style: {
          top: '100vh',
          left: 0,
          width: '1',
          height: '3',
          backgroundImageForward: '/static/img/arrowUp.png',
          backgroundImageBack: '/static/img/arrowDown.png'
        }
      }
      break
    default :
      rules = {
        type,
        style: {
          top: 0,
          left: '100vw',
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
