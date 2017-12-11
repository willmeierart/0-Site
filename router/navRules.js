export const setScrollState = type => {
  let rules = {}
  switch (true) {
    case type === 'topNoSub':
      rules = {
        type,
        leftUp: 'left',
        rightDown: 'right',
        initScrollAxis: 'x',
        style: {
          top: 0,
          left: '100vw',
          minWidth: '300vw',
          minHeight: '100vh',
          backgroundImageForward: '/static/img/arrowRight.png',
          backgroundImageBack: '/static/img/arrowLeft.png'
        }
      }
      break
    case type === 'topWSub' :
      rules = {
        type,
        leftUp: 'left',
        rightDown: 'down',
        initScrollAxis: 'y',
        style: {
          top: 0,
          left: '100vw',
          minWidth: '200vw',
          minHeight: '200vh',
          backgroundImageForward: '/static/img/arrowDown.png',
          backgroundImageBack: '/static/img/arrowLeft.png'
        }
      }
      break
    case type === 'subMid' :
      rules = {
        type,
        leftUp: 'up',
        rightDown: 'down',
        initScrollAxis: 'y',
        style: {
          top: '100vh',
          left: 0,
          minWidth: '100vw',
          minHeight: '300vh',
          backgroundImageForward: '/static/img/arrowDown.png',
          backgroundImageBack: '/static/img/arrowUp.png'
        }
      }
      break
    case type === 'subLast' :
      rules = {
        type,
        leftUp: 'up',
        rightDown: 'right',
        initScrollAxis: 'x',
        style: {
          top: '100vh',
          left: 0,
          minWidth: '200vw',
          minHeight: '200vh',
          backgroundImageForward: '/static/img/arrowRight.png',
          backgroundImageBack: '/static/img/arrowUp.png'
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
          minWidth: '300vw',
          minHeight: '100%',
          backgroundImageForward: '/static/img/arrowRight.png',
          backgroundImageBack: '/static/img/arrowLeft.png'
        }
      }
  }
  return rules
}