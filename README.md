# tailwindcss-clamp

simple function to generate clamp() spacing units from the default tailwindcss spacing units.

## usage:

use any of the default tailwindcss classes that use the spacing scale and append a "-to-SIZE" to it,
where SIZE is the desired full size to reach at the scalingFinish viewport width.

for example:

- `h-1-to-10` will generate a fluid height that scales from 1 to 10.
- `m-1-to-10` will generate a fluid margin that scales from 1 to 10.
- `gap-1-to-10` will generate a fluid gap that scales from 1 to 10.

etc...

## installation:

just run the generator under the spacing key of the extend section in your tailwind config:

```js
theme: {
    extend: {
        spacing: require('tailwindcss-clamp')({ scalingStart: 400, scalingFinish: 1240 }),
        // ... rest of your extend config
        },
    },
```

## options:

| Name          | Type   | default | Description                                      |
| ------------- | ------ | ------- | ------------------------------------------------ |
| scalingStart  | number | 400     | (in px) at which vw to start the scaling process |
| scalingFinish | number | 1280    | (in px) at which vw to reach the final size      |
