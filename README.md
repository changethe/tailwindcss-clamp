## usage:

1. `npm i tailwindcss-clamp`

2. import the function in the tailwind config:

```js
const generateClampClasses = require('tailwindcss-clamp')
```

3. add the function to the extend section:

```js
theme: {
  extend: {
    ...generateClampClasses({
      scalingStart: 320,
      scalingFinish: 1280,
      spacing: {},
      fonts: {},
    }),
    // more extensions...
    colors: {},
  },
},
```

## todo:

- make this a plugin instead of having it to paste into the extend section
- add tests
- work on better scaling options
- add more config options
