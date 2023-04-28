// clamp-generator.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = function (config) {
  const defaultOptions = {
    scalingStart: 320,
    scalingFinish: 1280,
    range: 15,
  }

  const { scalingStart, scalingFinish, spacing, fonts } = config

  const generateClasses = (themeValues, options = {}) => {
    const { range } = { ...defaultOptions, ...options }

    const spacingKeys = Object.keys(themeValues)
      .filter((key) => key !== 'px')
      .sort((a, b) => parseFloat(a) - parseFloat(b) || a.localeCompare(b))

    const generatedClasses = {}

    for (let i = 0; i < spacingKeys.length - 1; i++) {
      const startKey = spacingKeys[i]

      for (let j = 1; j <= range && i + j < spacingKeys.length; j++) {
        const finishKey = spacingKeys[i + j]

        const startValue = parseFloat(themeValues[startKey])
        const finishValue = parseFloat(themeValues[finishKey])

        if (finishValue > startValue) {
          const valueDifference = finishValue - startValue
          const clampValue = `clamp(${startValue}rem, calc(${startValue}rem + ${valueDifference} * ((100vw - ${scalingStart}px) / (${
            scalingFinish - scalingStart
          }) * 16)), ${finishValue}rem)`

          generatedClasses[`${startKey}-to-${finishKey}`] = clampValue
        }
      }
    }
    // console.log(generatedClasses);

    return generatedClasses
  }

  const spacingClasses = spacing ? generateClasses(defaultTheme.spacing, spacing) : {}
  const fontSizeClasses = fonts ? generateClasses(defaultTheme.fontSize, fonts) : {}

  return {
    spacing: spacingClasses,
    fontSize: fontSizeClasses,
  }
}
