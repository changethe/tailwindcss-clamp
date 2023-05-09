const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = function (config = {}) {
  const defaultOptions = {
    scalingStart: 400,
    scalingFinish: 1280,
  }

  const { scalingStart, scalingFinish } = { ...defaultOptions, ...config }

  const generateClasses = (themeValues) => {
    const spacingKeys = Object.keys(themeValues)
      .filter((key) => key !== 'px')
      .filter((key) => key !== '0')
      .sort((a, b) => parseFloat(a) - parseFloat(b) || a.localeCompare(b))

    const generatedClasses = {}

    for (let i = 0; i < spacingKeys.length - 1; i++) {
      const startKey = spacingKeys[i]

      for (let j = i + 1; j < spacingKeys.length; j++) {
        const finishKey = spacingKeys[j]

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

    return generatedClasses
  }

  return generateClasses({ ...defaultTheme.spacing })
}
