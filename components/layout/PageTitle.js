import { splitToSpans } from '../../lib/_utils'

const PageTitle = ({ routeData }) => {
  const { titleCopy } = routeData
  let titleWrapperStyles = {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    background: 'transparent',
    position: 'fixed',
    margin: 0,
    lineHeight: '1.5em',
    zIndex: 5,
    pointerEvents: 'none',
    opacity: 0.125,
    display: 'grid'
  }
  let titleStyles = {}

  switch (routeData.route) {
    case 'home': {
      const newTitleStyles = {
        display: 'flex',
        justifyContent: 'space-between'
      }
      const newWrapperStyles = {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        fontSize: '10vw',
        width: '55vw',
        height: '55vh',
        bottom: 0,
        left: 0
        // verticalAlign: 'bottom'
      }
      titleWrapperStyles = { ...titleWrapperStyles, ...newWrapperStyles }
      titleStyles = { ...titleStyles, ...newTitleStyles }
      break
    }
    case 'work': {
      const newTitleStyles = {}
      const newWrapperStyles = {}
      titleWrapperStyles = { ...titleWrapperStyles, ...newWrapperStyles }
      titleStyles = { ...titleStyles, ...newTitleStyles }
      break
    }
    case 'skills': {
      const newTitleStyles = {}
      const newWrapperStyles = {}
      titleWrapperStyles = { ...titleWrapperStyles, ...newWrapperStyles }
      titleStyles = { ...titleStyles, ...newTitleStyles }
      break
    }
    case 'us': {
      const newTitleStyles = {}
      const newWrapperStyles = {}
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
      <h1 className={`section-${i}`} style={{...lineStyles, ...titleStyles}}>{ splitToSpans(section) }</h1>
    )
  })

  return (
    <div className='main-page-title' style={titleWrapperStyles}>{ splitTitleCopy }</div>
  )
}
export default PageTitle
