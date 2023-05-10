const defaultConfig = {
  scalingStart: 400,
  scalingFinish: 1280,
}

module.exports = function (config = {}) {
  const { scalingStart, scalingFinish } = { ...defaultConfig, ...config }

  /********************************** helpers **********************************/
  const toRem = (value) => value / 16
  const remRound = (value) => parseFloat(value.toFixed(3))
  const vwRound = (value) => parseFloat(value.toFixed(2))

  const generateClampValue = (startValue, finishValue) => {
    const changeRate = (finishValue - startValue) / (toRem(scalingFinish) - toRem(scalingStart))
    const relativeChange = 100 * changeRate
    const preferred = finishValue - toRem(scalingFinish) * changeRate

    // prettier-ignore
    return `clamp(${startValue}rem, ${remRound(preferred)}rem + ${vwRound(relativeChange)}vw, ${finishValue}rem)`
  }

  /********************************** generate the classes **********************************/
  const generateClasses = (themeValues) => {
    const generatedClasses = {}

    const spacingKeys = Object.keys(themeValues)
      .filter((key) => key !== 'px')
      .filter((key) => key !== '0')
      .sort((a, b) => parseFloat(a) - parseFloat(b) || a.localeCompare(b))

    for (let i = 0; i < spacingKeys.length - 1; i++) {
      const startKey = spacingKeys[i]

      for (let j = i + 1; j < spacingKeys.length; j++) {
        const finishKey = spacingKeys[j]

        const startValue = parseFloat(themeValues[startKey])
        const finishValue = parseFloat(themeValues[finishKey])

        if (finishValue > startValue) {
          generatedClasses[`${startKey}-to-${finishKey}`] = generateClampValue(
            startValue,
            finishValue
          )
        }
      }
    }
    return generatedClasses
  }
  /****************************************************************************************************/
  const defaultTheme = require('tailwindcss/defaultTheme')
  return generateClasses({ ...defaultTheme.spacing })
}
