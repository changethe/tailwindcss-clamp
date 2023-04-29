const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = function (config) {
  const defaultOptions = {
    scalingStart: 320,
    scalingFinish: 1280,
  }

  const { scalingStart, scalingFinish, spacing, fonts } = { ...defaultOptions, ...config }

  const generateClasses = (themeValues, options = {}) => {
    const { sortKeys } = options

    let spacingKeys = Object.keys(themeValues).filter((key) => key !== 'px')

    if (sortKeys) {
      spacingKeys = spacingKeys.sort((a, b) => parseFloat(a) - parseFloat(b) || a.localeCompare(b))
    }

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

  const spacingClasses = generateClasses(defaultTheme.spacing, {
    ...(spacing || {}),
    sortKeys: true,
  })
  const fontSizeClasses = generateClasses(defaultTheme.fontSize, fonts || {})

  return {
    spacing: spacingClasses,
    fontSize: fontSizeClasses,
  }
}
