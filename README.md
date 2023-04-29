# tailwindcss-clamp

generates clamp classes for the tailwind fontSizes and spacings.

- `text-xs-to-2xl` will generate a fluid fontsize that scales from xs to 2xl in the given scaling
  range.
- `h-1-to-10` will generate a fluid height that scales from 1 to 10 in the given scaling range.

will be available wherever tailwind uses the spacing units. gaps, heights, widths, margins,
paddings, etc.

## usage:

1. `npm i tailwindcss-clamp`

2. import the function in the tailwind config:

```js
const generateClampClasses = require('tailwindcss-clamp')
```

3. add the generator function to the extend object and set the desired scaling range:

```js
theme: {
  extend: {
    ...generateClampClasses({
      scalingStart: 320, // in px
      scalingFinish: 1280, // in px
    }),
    // rest of the extend options...
    colors: {},
  },
},
```

## todo:

- make this a plugin instead of having it to paste into the extend section
- better scaling options for fonts:
  - line-heights
  - add custom -to sizes based on design prinicples like major third, minor third etc.
- add some config options to generate more custom ranges
- improve clamp calculation formula
- add tests
