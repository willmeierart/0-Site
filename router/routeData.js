import home from '../pages/home'
import converse from '../pages/converse'
import skills from '../pages/skills'
import us from '../pages/us'
import work from '../pages/work'
// import coupestudios from '../pages/work/coupestudios'
// import elementsmassage from '../pages/work/elementsmassage'
// import fit36 from '../pages/work/fit36'
// import mountainsmith from '../pages/work/mountainsmith'
// import branding from '../pages/work/branding'
// import drytown from '../pages/work/drytown'
// import giordanos from '../pages/work/giordanos'
// import nooku from '../pages/work/nooku'
// import pitchwork from '../pages/work/pitchwork'
// import romantix from '../pages/work/romantix'
// import smashburger from '../pages/work/smashburger'
// import sundance from '../pages/work/sundance'

import colors from '../lib/ui/colors'

export default {
  home: {
    component: home,
    route: 'home',
    titleCopy: 'wel come home',
    type: 'horizontal',
    bgColor1: colors[1],
    bgColor2: colors[0]
  },
  us: {
    component: us,
    route: 'us',
    titleCopy: 'us',
    type: 'vertical',
    bgColor1: colors[0],
    bgColor2: colors[1]
  },
  work: {
    component: work,
    route: 'work',
    titleCopy: 'work',
    type: 'vertical',
    bgColor1: colors[1],
    bgColor2: colors[0]
  },
  // coupestudios: {
  //   component: coupestudios,
  //   route: 'coupestudios',
  //   type: 'subMid',
  //   parent: 'work',
  //   bgColor1: colors[0],
  //   bgColor2: colors[1]
  // },
  // elementsmassage: {
  //   component: elementsmassage,
  //   route: 'elementsmassage',
  //   type: 'subMid',
  //   parent: 'work',
  //   bgColor1: colors[1],
  //   bgColor2: colors[0]
  // },
  // fit36: {
  //   component: fit36,
  //   route: 'fit36',
  //   type: 'subMid',
  //   parent: 'work',
  //   bgColor1: colors[0],
  //   bgColor2: colors[1]
  // },
  // mountainsmith: {
  //   component: mountainsmith,
  //   route: 'mountainsmith',
  //   type: 'subMid',
  //   parent: 'work',
  //   bgColor1: colors[1],
  //   bgColor2: colors[0]
  // },
  // drytown: {
  //   component: drytown,
  //   route: 'drytown',
  //   type: 'subMid',
  //   parent: 'work',
  //   bgColor1: colors[0],
  //   bgColor2: colors[1]
  // },
  // giordanos: {
  //   component: giordanos,
  //   route: 'giordanos',
  //   type: 'subMid',
  //   parent: 'work',
  //   bgColor1: colors[1],
  //   bgColor2: colors[0]
  // },
  // nooku: {
  //   component: nooku,
  //   route: 'nooku',
  //   type: 'subMid',
  //   parent: 'work',
  //   bgColor1: colors[0],
  //   bgColor2: colors[1]
  // },
  // romantix: {
  //   component: romantix,
  //   route: 'romantix',
  //   type: 'subMid',
  //   parent: 'work',
  //   bgColor1: colors[1],
  //   bgColor2: colors[0]
  // },
  // smashburger: {
  //   component: smashburger,
  //   route: 'smashburger',
  //   type: 'subMid',
  //   parent: 'work',
  //   bgColor1: colors[0],
  //   bgColor2: colors[1]
  // },
  // sundance: {
  //   component: sundance,
  //   route: 'sundance',
  //   type: 'subMid',
  //   parent: 'work',
  //   bgColor1: colors[1],
  //   bgColor2: colors[0]
  // },
  // branding: {
  //   component: branding,
  //   route: 'branding',
  //   type: 'subMid',
  //   parent: 'work',
  //   bgColor1: colors[0],
  //   bgColor2: colors[1]
  // },
  // pitchwork: {
  //   component: pitchwork,
  //   route: 'pitchwork',
  //   type: 'subLast',
  //   parent: 'work',
  //   bgColor1: colors[1],
  //   bgColor2: colors[0]
  // },
  skills: {
    component: skills,
    route: 'skills',
    titleCopy: 'skills',
    type: 'vertical',
    bgColor1: colors[0],
    bgColor2: colors[1]
  },
  converse: {
    component: converse,
    route: 'converse',
    titleCopy: 'con verse',
    type: 'horizontal',
    bgColor1: colors[1],
    bgColor2: colors[0]
  }
}
