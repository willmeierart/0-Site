import colors from '../components/ui/colors'

export default {
  home: {
    path: '/main/home',
    type: 'topNoSub',
    subpages: [],
    nextRoute: 'us',
    prevRoute: 'converse',
    bgColor1: colors[1],
    bgColor2: colors[0]
  },
  us: {
    path: '/main/us',
    type: 'topNoSub',
    subpages: [],
    nextRoute: 'work',
    prevRoute: 'home',
    bgColor1: colors[0],
    bgColor2: colors[2]
  },
  work: {
    path: '/main/work',
    type: 'topWSub',
    subpages: [],
    nextRoute: 'services',
    prevRoute: 'us',
    bgColor1: colors[2],
    bgColor2: colors[3]
  },
  services: {
    path: '/main/services',
    type: 'topWSub',
    subpages: [],
    nextRoute: 'converse',
    prevRoute: 'work',
    bgColor1: colors[3],
    bgColor2: colors[4]
  },
  converse: {
    path: '/main/converse',
    type: 'topNoSub',
    subpages: [],
    nextRoute: 'home',
    prevRoute: 'services',
    bgColor1: colors[4],
    bgColor2: colors[1]
  }
}
