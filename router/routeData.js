import colors from '../components/ui/colors'

export default {
  home: {
    route: 'home',
    type: 'topNoSub',
    subpages: [],
    nextRoute: 'us',
    prevRoute: 'converse',
    bgColor1: colors[1],
    bgColor2: colors[0]
  },
  us: {
    route: 'us',
    type: 'topNoSub',
    subpages: [],
    nextRoute: 'work',
    prevRoute: 'home',
    bgColor1: colors[0],
    bgColor2: colors[2]
  },
  work: {
    route: 'work',
    type: 'topWSub',
    subpages: [],
    nextRoute: 'services',
    prevRoute: 'us',
    bgColor1: colors[2],
    bgColor2: colors[3]
  },
  services: {
    route: 'services',
    type: 'topWSub',
    subpages: [],
    nextRoute: 'converse',
    prevRoute: 'work',
    bgColor1: colors[3],
    bgColor2: colors[4]
  },
  converse: {
    route: 'converse',
    type: 'topNoSub',
    subpages: [],
    nextRoute: 'home',
    prevRoute: 'services',
    bgColor1: colors[4],
    bgColor2: colors[1]
  }
}
