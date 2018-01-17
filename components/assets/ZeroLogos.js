// const AZ_RED = '#970d11'
const AZ_RED = 'var(--AZ-RED)'

export function AzLogo01 ({ color, handleMouseEnter, handleMouseLeave, handleClick }) {
  // red glyph with no background:
  return (
    <div className='az-logo-01' style={{width: '120%', marginLeft: '-10%'}}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 103.33 152'>
        <title>AZ-LOGO-01</title>
        <path style={{ fill: 'none' }} className='cls-1' d='M57.57,35.17H45.76a11.61,11.61,0,0,0-11.6,11.59V75.53l35-14.82v-14A11.6,11.6,0,0,0,57.57,35.17Z' />
        <path onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ fill: color }} className='cls-2' d='M93.91,68.86V50.24l-7.6,3.22v-6.7A28.78,28.78,0,0,0,57.57,18H45.76A28.78,28.78,0,0,0,17,46.76v36L9.42,86v18.65l.77-.35L17,101.42v3.48a28.78,28.78,0,0,0,28.75,28.75V116.49a11.61,11.61,0,0,1-11.6-11.6V94.16l35-14.82V104.9a11.61,11.61,0,0,1-11.6,11.6v17.15A28.78,28.78,0,0,0,86.31,104.9V72.08ZM34.16,75.53V46.76a11.61,11.61,0,0,1,11.6-11.59H57.57a11.6,11.6,0,0,1,11.6,11.59v14Z' />
      </svg>
      <style jsx>{`
        .cls-1 { fill: none; }
        .cls-2 {
          fill: ${color};
          transition: fill .5s ease-in-out;
        }
        .az-logo-01 { width: 120%; margin-left: -10%; }
      `}</style>
    </div>
  )
}
export function AzLogo02 () {
  // white glyph on red background:
  return (
    <div className='az-logo-02'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 394.44 582.31'>
        <title>AZ-LOGO-02</title>
        <path className='cls-1' d='M394.44,424.38A157.93,157.93,0,0,1,236.52,582.31H157.92A157.93,157.93,0,0,1,0,424.38V157.92A157.92,157.92,0,0,1,157.92,0h78.59A157.92,157.92,0,0,1,394.44,157.92Z' />
        <path className='cls-2' d='M220.31,130.77H174.13a45.4,45.4,0,0,0-45.37,45.34V288.67l136.91-58V176.11A45.38,45.38,0,0,0,220.31,130.77Z' />
        <path className='cls-3' d='M362.47,262.78V189.92L332.75,202.5V176.31A112.57,112.57,0,0,0,220.31,63.87H174.13A112.57,112.57,0,0,0,61.67,176.31v141L32,329.85v73l3-1.38,26.7-11.31v13.61A112.57,112.57,0,0,0,174.13,516.17V449.09a45.41,45.41,0,0,1-45.37-45.36v-42l136.91-58v100a45.4,45.4,0,0,1-45.36,45.36v67.08A112.57,112.57,0,0,0,332.75,403.73V275.35Zm-233.71,26.1V176.31A45.4,45.4,0,0,1,174.13,131h46.18a45.38,45.38,0,0,1,45.36,45.34V230.9Z' />
        <path className='cls-4' d='M102.39,266.67c0,.07,0,.14,0,.22v-.44c0,.07,0,.14,0,.22' />
      </svg>
      <style jsx>{`
        .cls-1{ fill:${AZ_RED}; }
        .cls-2{ fill:none; }
        .cls-3{ fill:#fff; }
        .cls-4{ fill:#231f20; }
      `}</style>
    </div>
  )
}
export function AzLogo03 ({ color }) {
  // transparent glyph, filled bg
  return (
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 394.44 582.31'>
        <title>AZ-LOGO-03</title>
        <path className='cls-1' d='M236.52,0h-78.6A157.92,157.92,0,0,0,0,157.92V424.38A157.93,157.93,0,0,0,157.92,582.31h78.6A157.94,157.94,0,0,0,394.44,424.38V157.92A157.93,157.93,0,0,0,236.52,0Zm126,262.58-29.72,12.57V403.53A112.56,112.56,0,0,1,220.31,516V448.89a45.39,45.39,0,0,0,45.36-45.36v-100L128.76,361.51v42a45.41,45.41,0,0,0,45.37,45.36V516A112.57,112.57,0,0,1,61.67,403.53V389.92L35,401.23l-3,1.38v-73l29.7-12.58v-141A112.57,112.57,0,0,1,174.13,63.67h46.18A112.56,112.56,0,0,1,332.75,176.11V202.3l29.72-12.58Z' />
        <path className='cls-1' d='M220.31,130.77H174.13a45.39,45.39,0,0,0-45.37,45.34V288.67l136.91-58V176.11A45.38,45.38,0,0,0,220.31,130.77Z'/><path d='M102.41,266.89v-.45c0,.08,0,.15,0,.23S102.41,266.81,102.41,266.89Z' />
      </svg>
      <style jsx>{`
        .cls-1{ fill: ${color || AZ_RED}; }
      `}</style>
    </div>
  )   
}
