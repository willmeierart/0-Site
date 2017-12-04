import colors from '../components/ui/colors'

export default {
  home: {
    path: '/',
    type: 'topNoSub',
    subpages: [],
    nextRoute: '/us',
    prevRoute: '/converse',
    bgColor1: colors[1],
    bgColor2: colors[0]
  },
  us: {
    path: '/us',
    type: 'topNoSub',
    subpages: [],
    nextRoute: '/work',
    prevRoute: '/',
    bgColor1: colors[0],
    bgColor2: colors[2]
  },
  work: {
    path: '/work',
    type: 'topWSub',
    subpages: [],
    nextRoute: '/services',
    prevRoute: '/us',
    bgColor1: colors[2],
    bgColor2: colors[3]
  },
  services: {
    path: '/services',
    type: 'topWSub',
    subpages: [],
    nextRoute: '/converse',
    prevRoute: '/work',
    bgColor1: colors[3],
    bgColor2: colors[4]
  },
  converse: {
    path: '/converse',
    type: 'topNoSub',
    subpages: [],
    nextRoute: '/',
    prevRoute: '/services',
    bgColor1: colors[4],
    bgColor2: colors[1]
  }
}
