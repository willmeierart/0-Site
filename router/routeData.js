import home from '../pages/home'
import converse from '../pages/converse'
import skills from '../pages/skills'
import us from '../pages/us'
import fun from '../pages/us/fun'
import what from '../pages/us/what'
import who from '../pages/us/who'
import why from '../pages/us/why'
import writings from '../pages/us/writings'
import work from '../pages/work'
import coupestudios from '../pages/work/coupestudios'
import elementsmassage from '../pages/work/elementsmassage'
import fit36 from '../pages/work/fit36'
import mountainsmith from '../pages/work/mountainsmith'

import colors from '../lib/ui/colors'

export default {
  home: {
    component: home,
    route: 'home',
    type: 'topNoSub',
    subpages: [],
    nextRoute: 'us',
    prevRoute: 'converse',
    bgColor1: colors[1],
    bgColor2: colors[0]
  },
  us: {
    component: us,
    route: 'us',
    type: 'topWSub',
    subpages: ['fun', 'what', 'who', 'why', 'writings'],
    nextRoute: 'fun',
    prevRoute: 'home',
    bgColor1: colors[0],
    bgColor2: colors[1]
  },
  fun: {
    component: fun,
    route: 'us/fun',
    type: 'subMid',
    parent: 'us',
    nextRoute: 'what',
    prevRoute: 'us',
    bgColor1: colors[1],
    bgColor2: colors[0]
  },
  what: {
    component: what,
    route: 'us/what',
    type: 'subMid',
    parent: 'us',
    nextRoute: 'who',
    prevRoute: 'fun',
    bgColor1: colors[0],
    bgColor2: colors[1]
  },
  who: {
    component: who,
    route: 'who',
    type: 'subMid',
    parent: 'us',
    nextRoute: 'why',
    prevRoute: 'what',
    bgColor1: colors[1],
    bgColor2: colors[0]
  },
  why: {
    component: why,
    route: 'why',
    type: 'subMid',
    parent: 'us',
    nextRoute: 'writings',
    prevRoute: 'what',
    bgColor1: colors[1],
    bgColor2: colors[0]
  },
  writings: {
    component: writings,
    route: 'writings',
    type: 'subLast',
    parent: 'us',
    nextRoute: 'work',
    prevRoute: 'why',
    bgColor1: colors[0],
    bgColor2: colors[1]
  },
  work: {
    component: work,
    route: 'work',
    type: 'topWSub',
    subpages: ['coupestudios', 'elementsmassage', 'fit36', 'mountainsmith'],
    nextRoute: 'coupestudios',
    prevRoute: 'writings',
    bgColor1: colors[1],
    bgColor2: colors[0]
  },
  coupestudios: {
    component: coupestudios,
    route: 'coupestudios',
    type: 'subMid',
    parent: 'work',
    nextRoute: 'elementsmassage',
    prevRoute: 'work',
    bgColor1: colors[0],
    bgColor2: colors[1]
  },
  elementsmassage: {
    component: elementsmassage,
    route: 'elementsmassage',
    type: 'subMid',
    parent: 'work',
    nextRoute: 'fit36',
    prevRoute: 'coupestudios',
    bgColor1: colors[1],
    bgColor2: colors[0]
  },
  fit36: {
    component: fit36,
    route: 'fit36',
    type: 'subMid',
    parent: 'work',
    nextRoute: 'mountainsmith',
    prevRoute: 'elementsmassage',
    bgColor1: colors[0],
    bgColor2: colors[1]
  },
  mountainsmith: {
    component: mountainsmith,
    route: 'mountainsmith',
    type: 'subMid',
    parent: 'work',
    nextRoute: 'skills',
    prevRoute: 'fit36',
    bgColor1: colors[1],
    bgColor2: colors[0]
  },
  skills: {
    component: skills,
    route: 'skills',
    type: 'topWSub',
    subpages: [],
    nextRoute: 'converse',
    prevRoute: 'mountainsmith',
    bgColor1: colors[0],
    bgColor2: colors[1]
  },
  converse: {
    component: converse,
    route: 'converse',
    type: 'topNoSub',
    subpages: [],
    nextRoute: 'home',
    prevRoute: 'skills',
    bgColor1: colors[1],
    bgColor2: colors[0]
  }
}
