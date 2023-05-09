const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

function createTailwindClampPlugin(config = {}) {
  const defaultOptions = {
    scalingStart: 400,
    scalingFinish: 1280,
  }

  const { scalingStart, scalingFinish, spacing } = { ...defaultOptions, ...config }

  /****************************************************************************************************
   * clamp classes generator
   ****************************************************************************************************/

  const generateClasses = (themeValues, options = {}) => {
    const { sortKeys } = options

    // ignore the px key for now
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
  /****************************************************************************************************/

  return plugin(function ({ addUtilities, theme }) {
    // Get the existing spacing values from the theme
    const existingSpacing = theme('spacing')

    const spacingClasses = generateClasses(
      { ...defaultTheme.spacing, ...existingSpacing },
      {
        ...(spacing || {}),
        sortKeys: true,
      }
    )

    const utilities = {}

    Object.entries(spacingClasses).forEach(([key, value]) => {
      // padding
      utilities[`.p-${key}`] = { padding: value }
      utilities[`.pt-${key}`] = { paddingTop: value }
      utilities[`.pr-${key}`] = { paddingRight: value }
      utilities[`.pb-${key}`] = { paddingBottom: value }
      utilities[`.pl-${key}`] = { paddingLeft: value }
      utilities[`.px-${key}`] = { paddingLeft: value, paddingRight: value }
      utilities[`.py-${key}`] = { paddingTop: value, paddingBottom: value }

      // margin
      utilities[`.m-${key}`] = { margin: value }
      utilities[`.mt-${key}`] = { marginTop: value }
      utilities[`.mr-${key}`] = { marginRight: value }
      utilities[`.mb-${key}`] = { marginBottom: value }
      utilities[`.ml-${key}`] = { marginLeft: value }
      utilities[`.mx-${key}`] = { marginLeft: value, marginRight: value }
      utilities[`.my-${key}`] = { marginTop: value, marginBottom: value }

      // width & height
      utilities[`.w-${key}`] = { width: value }
      utilities[`.h-${key}`] = { height: value }

      // gaps
      utilities[`.gap-${key}`] = { gap: value }
      utilities[`.gap-x-${key}`] = { columnGap: value }
      utilities[`.gap-y-${key}`] = { rowGap: value }
    })

    addUtilities(utilities)
  })
}

module.exports = createTailwindClampPlugin
