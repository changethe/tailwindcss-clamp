const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

function createTailwindClampPlugin(config = {}) {
  const defaultOptions = {
    scalingStart: 400,
    scalingFinish: 1280,
  }

  const { scalingStart, scalingFinish, spacing } = { ...defaultOptions, ...config }

  /****************************************************************************************************/
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
      const escapedKey = key.replace('.', '\\.')

      // padding
      utilities[`.p-${escapedKey}`] = { padding: value }
      utilities[`.pt-${escapedKey}`] = { paddingTop: value }
      utilities[`.pr-${escapedKey}`] = { paddingRight: value }
      utilities[`.pb-${escapedKey}`] = { paddingBottom: value }
      utilities[`.pl-${escapedKey}`] = { paddingLeft: value }
      utilities[`.px-${escapedKey}`] = { paddingLeft: value, paddingRight: value }
      utilities[`.py-${escapedKey}`] = { paddingTop: value, paddingBottom: value }

      // margin
      utilities[`.m-${escapedKey}`] = { margin: value }
      utilities[`.mt-${escapedKey}`] = { marginTop: value }
      utilities[`.mr-${escapedKey}`] = { marginRight: value }
      utilities[`.mb-${escapedKey}`] = { marginBottom: value }
      utilities[`.ml-${escapedKey}`] = { marginLeft: value }
      utilities[`.mx-${escapedKey}`] = { marginLeft: value, marginRight: value }
      utilities[`.my-${escapedKey}`] = { marginTop: value, marginBottom: value }

      // width & height
      utilities[`.w-${escapedKey}`] = { width: value }
      utilities[`.h-${escapedKey}`] = { height: value }

      // gaps
      utilities[`.gap-${escapedKey}`] = { gap: value }
      utilities[`.gap-x-${escapedKey}`] = { columnGap: value }
      utilities[`.gap-y-${escapedKey}`] = { rowGap: value }

      // position
      utilities[`.left-${escapedKey}`] = { left: value }
      utilities[`.right-${escapedKey}`] = { right: value }
      utilities[`.top-${escapedKey}`] = { top: value }
      utilities[`.bottom-${escapedKey}`] = { bottom: value }
    })

    addUtilities(utilities)
  })
}

module.exports = createTailwindClampPlugin
