// import ReactFitText from 'react-fittext'

const PageTitle = ({ title }) => {
  return (
    <div /* className='main-page-title' */>
      {/* <ReactFitText> */}
      <h1 className='main-page-title'>{ title }</h1>
      {/* </ReactFitText> */}
      <style jsx>{`
        .main-page-title {
            {/* width:100vw;
            height:100vh;
            position:fixed;
            top:0;
            left:0;
            z-index:5;
            pointer-events: none;
            text-align:center;
            vertical-align:middle; */}
            {/* display: flex; */}
            {/* flex-shrink:0;
            justify-content: center;
            align-items: center; */}
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
            justify-content: center;
            align-items: center;
            z-index: 5;
            pointer-events: none;
            opacity: .5;
          }
      `}</style>
    </div>
  )
}
export default PageTitle
