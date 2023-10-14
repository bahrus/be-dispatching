# be-dispatching

Dispatch event from enhanced element with specified name.

[![NPM version](https://badge.fury.io/js/be-dispatching.png)](http://badge.fury.io/js/be-dispatching)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-dispatching?style=for-the-badge)](https://bundlephobia.com/result?p=be-dispatching)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-dispatching?compression=gzip">
[![Playwright Tests](https://github.com/bahrus/be-dispatching/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-dispatching/actions/workflows/CI.yml)

## Example 1

```html
<input be-dispatching='
  of 
    bubbling, 
    composed, 
    cancelable, 
    replacing 
  event 402735ed-b9e8-4ef4-9e0d-3a6b385de863 
  on change.'>
```

## Example 2

```html
<input be-dispatching='
    of 
        bubbling, 
        composed, 
        cancelable, 
        replacing 
    event 402735ed-b9e8-4ef4-9e0d-3a6b385de863.'>
```

Dispatches on input event by default.

## Viewing Demos Locally

Any web server that can serve static files will do, but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.js.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/ in a modern browser.

## Running Tests

```
> npm run test
```

## Using from ESM Module:

```JavaScript
import 'be-dispatching/be-dispatching.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-dispatching';
</script>
```

