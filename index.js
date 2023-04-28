module.exports = function (themeSpacing, options = {}) {
  const defaultOptions = {
    scalingStart: 320,
    scalingFinish: 1280,
    range: 5,
  }

  const { scalingStart, scalingFinish, range } = { ...defaultOptions, ...options }

  const spacingKeys = Object.keys(themeSpacing)
    .filter((key) => key !== 'px')
    .sort((a, b) => parseFloat(a) - parseFloat(b) || a.localeCompare(b))

  const generatedClasses = {}

  for (let i = 0; i < spacingKeys.length - 1; i++) {
    const startKey = spacingKeys[i]

    for (let j = 1; j <= range && i + j < spacingKeys.length; j++) {
      const finishKey = spacingKeys[i + j]

      const startValue = parseFloat(themeSpacing[startKey])
      const finishValue = parseFloat(themeSpacing[finishKey])

      if (finishValue > startValue) {
        const valueDifference = finishValue - startValue
        const clampValue = `clamp(${startValue}rem, calc(${startValue}rem + ${valueDifference} * ((100vw - ${scalingStart}px) / (${
          scalingFinish - scalingStart
        }) * 16)), ${finishValue}rem)`

        generatedClasses[`${startKey}-to-${finishKey}`] = clampValue
      }
    }
  }
  return generatedClasses
}
