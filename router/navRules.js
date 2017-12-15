const navRules = type => {
  let rules = {}
  switch (type) {
    case 'topNoSub':
      rules = {
        type,
        leftUp: 'left',
        rightDown: 'right',
        initScrollAxis: 'x',
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
        leftUp: 'left',
        rightDown: 'down',
        initScrollAxis: 'y',
        style: {
          top: 0,
          left: '100vw',
          width: '2',
          height: '2',
          backgroundImageForward: '/static/img/arrowUp.png',
          backgroundImageBack: '/static/img/arrowRight.png'
        }
      }
      break
    case 'subMid' :
      rules = {
        type,
        leftUp: 'up',
        rightDown: 'down',
        initScrollAxis: 'y',
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
        leftUp: 'up',
        rightDown: 'right',
        initScrollAxis: 'x',
        style: {
          top: '100vh',
          left: 0,
          width: '2',
          height: '2',
          backgroundImageForward: '/static/img/arrowLeft.png',
          backgroundImageBack: '/static/img/arrowDown.png'
        }
      }
      break
    default :
      rules = {
        type,
        leftUp: 'left',
        rightDown: 'right',
        initScrollAxis: 'x',
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
