## usage:

1.  import the .js file to the tailwind.config.js:

```js
const generateClampClasses = require('./clampgenerator.cjs')
```

2. add the function to the extend section:

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

- make this an npm package/plugin
- add tests
- add more options
- work on better scaling options
