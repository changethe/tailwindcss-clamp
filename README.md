# tailwindcss-clamp

generates fluid spacing utils that clamp() between the tailwindcss spacing units.

currently generates them for:

- margins
- paddings
- gaps
- heights
- widths
- positions

## usage:

use any of the spacing utils and append a "-to-SIZE" to it, where SIZE is the desired full size (in
tailwindcss units).

for example:

- `h-1-to-10` will generate a fluid height that scales from 1 to 10.
- `m-1-to-10` will generate a fluid margin that scales from 1 to 10.

## config:

| Name          | Type   | default | Description                                      |
| ------------- | ------ | ------- | ------------------------------------------------ |
| scalingStart  | number | 400     | (in px) at which vw to start the scaling process |
| scalingFinish | number | 1280    | (in px) at which vw to reach the final size      |
