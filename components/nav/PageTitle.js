// import ReactFitText from 'react-fittext'
import { splitToSpans } from '../../lib/_utils'

const PageTitle = ({ title }) => {
  const splitTitle = splitToSpans(title)
  return (
    <div /* className='main-page-title' */>
      {/* <ReactFitText> */}
      <h1 className='main-page-title'>{ splitTitle }</h1>
      {/* </ReactFitText> */}
      <style jsx>{`
        .main-page-title {
            font-size: 20vw;
            font-weight: bold;
            width: 100vw;
            height: 100vh;
            top:0;
            left:0;
            text-transform: uppercase;
            background: transparent;
            position: fixed;
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 5;
            pointer-events: none;
            opacity: .125;
          }
      `}</style>
    </div>
  )
}
export default PageTitle
