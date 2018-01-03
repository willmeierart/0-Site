import Loader from 'react-loaders'

// syntactic-sugary method for this-binding react-class-methods
// use in class constructor like: 'binder(this,['method1','method2'])'
export const binder = (x, Ms) => Ms.forEach(m => (x[m] = x[m].bind(x)))

export const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export const splitToSpans = (word, styles) => (
  word.split('').map((letter, i) => <span key={i} className='split-span-letter' >{ letter }{ styles }</span>)
)

// apparently react doesn't want you to iterate over children as a simple array, this allows it.
// useful in the case of e.g. applying 'fadeColors' to 
export const forEachChild = (array, callback) => {
  return Array.prototype.forEach.call(array, child => {
    callback(child)
  })
}

// take all seperate queries and evaluate if loading or error:
export const checkAllQueriesError = (queries) => {
  queries.forEach((query) => {
    if ([query].error) {
      return <h1>¯\_(ツ)_/¯</h1>
    }
  })
}

// take all seperate queries and evaluate if loading or error:
export const checkAllQueriesLoading = (queries, loadedState) => {
  const loadingState = (
    <div className='loader-wrapper'>
      <Loader type='line-spin-fade-loader' active />
    </div>
  )
  let loading = true
  queries.forEach((query) => {
    if ([query].loading) {
      loading = true
    } else {
      loading = false
    }
  })
  return loading ? loadingState : loadedState
}

// probably going to use something like this a lot (throw inside of position-relative container el):
export const renderGrid = (set, Component) => (
  set.map((self, i) => (
    <div className='wrapper' key={i}>
      <Component self={self} />
      <style jsx>{`
        .wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
      `}</style>
    </div>
  ))
)

export const getColorNums = (colors) => (
  colors.map((color) => {
    const nums = color
      .substring(color.indexOf('(') + 1, color.indexOf(')'))
      .split(/,\s*/)
    return [parseInt(nums[0]), parseInt(nums[1]), parseInt(nums[2]), parseInt(nums[3])]
  })
)

// takes the awkward format colors arrive in from GraphCMS and returns usable RGBA values
// (other methods left in in case API changes)
export const formatColors = (colors = []) => {
  return colors.map((each, i) => {
    // const snagColor = (x) => {
    //   console.log(x)
    //   console.log(each.color[x])
    //   console.log(each.color)
    //   return each.color[x]
    // }
    // let r, g, b, a
    // const colorList = [r, g, b, a]
    // for (let color of each.color) {
    //   console.log(color);
    // }
    // let colorList = ['"r"', '"g"', '"b"', '"a"']
    // colorList = colorList.map((letter) => {
    //   return snagColor(letter)
    // })
    // const { [r], [g], [b], [a] } = each.color
    // const { [r], [g], [b], [a] } = each.color
    const splitta = each.color.split(/"[a-z]":/g)
    const colorList = splitta
      .map(each => parseInt(each.replace(/\D/g, ''))).slice(1)
    let r = colorList[0]
    let g = colorList[1]
    let b = colorList[2]
    let a = colorList[3]
    return `rgba(${r},${g},${b},${a})`
  })
}

export const fadeColor = (multiplier, color1, color2) => {
  const colorNumsArray = getColorNums(color1, color2)
  let colorAccumulator = []
  colorNumsArray[0].map((x, i) => {
    const thisColorInt = Math.ceil(x + multiplier * (colorNumsArray[1][i] - x))
    colorAccumulator.push(thisColorInt)
  })
  const r = colorAccumulator[0]
  const g = colorAccumulator[1]
  const b = colorAccumulator[2]
  const a = colorAccumulator[3]
  return `rgba(${r},${g},${b},${a})`
}

// // since this is such a nice signature effect, go ahead and leave this here:
// export const fadeColors = (element, colors, timing) => {
//   const origColor = 'black' // element.style.color
//   const randomDelay = Math.floor(Math.random() * timing) + 300
//   const rD2 = Math.floor(Math.random() * (timing * 2))
//   const randomColorIndex = Math.floor(Math.random() * 3)
//   const interval = setInterval(() => {
//     setTimeout(() => {
//       element.style.color = colors[randomColorIndex]
//       setTimeout(() => {
//         element.style.color = origColor
//       }, rD2)
//     }, randomDelay)
//     clearInterval(interval)
//   }, 200)
// }