// const AZ_RED = '#970d11'
const AZ_RED = 'var(--AZ-RED)'

export function AzLogo01 ({ color }) {
  // red glyph with no background:
  // console.log(color)
  return (
    <div className='az-logo-01'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 103.33 152'>
        <title>AZ-LOGO-01</title>
        <path
          style={{ fill: 'none' }}
          className='cls-1'
          d='M57.57,35.17H45.76a11.61,11.61,0,0,0-11.6,11.59V75.53l35-14.82v-14A11.6,11.6,0,0,0,57.57,35.17Z' />
        <path
          style={{fill: color}}
          className='cls-2'
          d='M93.91,68.86V50.24l-7.6,3.22v-6.7A28.78,28.78,0,0,0,57.57,18H45.76A28.78,28.78,0,0,0,17,46.76v36L9.42,86v18.65l.77-.35L17,101.42v3.48a28.78,28.78,0,0,0,28.75,28.75V116.49a11.61,11.61,0,0,1-11.6-11.6V94.16l35-14.82V104.9a11.61,11.61,0,0,1-11.6,11.6v17.15A28.78,28.78,0,0,0,86.31,104.9V72.08ZM34.16,75.53V46.76a11.61,11.61,0,0,1,11.6-11.59H57.57a11.6,11.6,0,0,1,11.6,11.59v14Z' />
      </svg>
      <style jsx>{`
        .cls-1 { fill: none; }
        .cls-2 { fill: ${color}; }
      `}</style>
    </div>
  )
}
