// takes each page and assigns styles for its background title

import { splitToSpans } from '../../lib/_utils'

const PageTitle = ({ routeData, width, height }) => {
  const { titleCopy } = routeData
  const wider = width > height

  let titleWrapperStyles = {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    background: 'transparent',
    position: 'fixed',
    margin: 0,
    zIndex: 5,
    pointerEvents: 'none',
    opacity: 0.125
  }
  let titleStyles = {}

  switch (routeData.route) {
    case 'home': {
      const fontSize = wider ? `${~~(height / 8)}px` : `${~~(width / 8)}px`
      const newTitleStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)'
      }
      const newWrapperStyles = {
        fontSize,
        width: '55vw',
        height: '55vh',
        top: '45vh',
        left: 0,
        lineHeight: '.5em'
      }
      titleWrapperStyles = { ...titleWrapperStyles, ...newWrapperStyles }
      titleStyles = { ...titleStyles, ...newTitleStyles }
      break
    }
    case 'converse': {
      const fontSize = wider ? `${~~(height / 6)}px` : `${~~(width / 6)}px`
      const newTitleStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)'
      }
      const newWrapperStyles = {
        fontSize,
        width: '55vw',
        height: '55vh',
        top: '45vh',
        left: 0,
        lineHeight: '.9em'
      }
      titleWrapperStyles = { ...titleWrapperStyles, ...newWrapperStyles }
      titleStyles = { ...titleStyles, ...newTitleStyles }
      break
    }
    case 'work': {
      const newTitleStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }
      const newWrapperStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        fontSize: '25vw',
        lineHeight: '1.5em'
      }
      titleWrapperStyles = { ...titleWrapperStyles, ...newWrapperStyles }
      titleStyles = { ...titleStyles, ...newTitleStyles }
      break
    }
    case 'skills': {
      const newTitleStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }
      const newWrapperStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        fontSize: '20vw',
        lineHeight: '1.5em'
      }
      titleWrapperStyles = { ...titleWrapperStyles, ...newWrapperStyles }
      titleStyles = { ...titleStyles, ...newTitleStyles }
      break
    }
    case 'us': {
      const newTitleStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '-.15em'
        // width: '100vw',
        // height: '100vh',
        // display: 'grid',
        // gridTemplateColumns: '1fr 1fr'
      }
      const newWrapperStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        fontSize: '50vh',
        lineHeight: '1.5em'
      }
      titleWrapperStyles = { ...titleWrapperStyles, ...newWrapperStyles }
      titleStyles = { ...titleStyles, ...newTitleStyles }
      break
    }

    
    default :
      break
  }

  const brokenTitleCopy = titleCopy.split(' ')
  const splitTitleCopy = brokenTitleCopy.map((section, i) => {
    const wdLength = section.length
    const lineStyles = {
      gridArea: `${i + 1}/${1}/${i + 2}/${wdLength + 1}`
    }
    return (
      <h1 key={i} className={`section-${i}`} style={{...lineStyles, ...titleStyles}}>{ splitToSpans(section, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        verticalAlign: 'center'
      }) }</h1>
    )
  })

  return (
    <div className='main-page-title' style={titleWrapperStyles}>{ splitTitleCopy }</div>
  )
}
export default PageTitle
