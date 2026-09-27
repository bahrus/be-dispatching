# be-dispatching (📡)

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

The qualifiers are optional:

- `bubbling` -- the dispatched event bubbles.
- `composed` -- the dispatched event crosses shadow DOM boundaries.
- `cancelable` -- the dispatched event is cancelable.
- `replacing` -- the triggering event (`change`, `input`, ...) is stopped from propagating, so ancestors hear only the new event.

## Programmatic attachment (no attribute)

The attribute syntax shown above shines for server-rendered HTML and progressive enhancement:  the markup alone says which event gets dispatched when.  But most web development today renders on the client, with a framework (Lit, React, Vue, Svelte, etc.) that already has a JavaScript reference to each element it creates.  In that setting, attaching be-dispatching programmatically is the better fit:

1.  **A less clunky API.**  Frameworks tend to be awkward about setting arbitrary (let alone emoji) attributes, and composing a string like `"of bubbling, composed, cancelable, replacing event 402735ed-b9e8-4ef4-9e0d-3a6b385de863 on change."` from framework state is error prone.  Setting `dispatchRules` to an array of plain objects, with real booleans for the qualifiers, is ordinary JavaScript, which the framework, your editor, and TypeScript all understand.
2.  **Less stringifying and parsing.**  With an attribute, the framework serializes the rules to a string, which be-dispatching then parses back apart with regular expressions, followed by splitting out the qualifiers.  Setting `dispatchRules` directly skips both steps.
3.  **Less overhead monitoring attributes.**  The attribute approach relies on [be-hive](https://github.com/bahrus/be-hive) / [mount-observer](https://github.com/bahrus/mount-observer) watching the DOM for elements that carry (or gain) the attribute, and for changes to its value.  The programmatic approach needs none of that -- `def.js` just registers the enhancement's config, and the enhancement is attached exactly when, and to exactly the elements, your code says.

Both approaches produce the same enhancement, with the same defaults, so you can mix them in one app -- attributes for server-rendered islands, programmatic attachment inside client-rendered components.

First register the enhancement's config once:

```JS
import { defBeDispatching } from 'be-dispatching/def.js';
const emc = await defBeDispatching(document.body); // or a shadow root's host, for a scoped registry
```

Then set `dispatchRules` -- an array with one object per statement:

| Statement part     | Property     | Notes                                  |
|--------------------|--------------|----------------------------------------|
| `event my-event`   | `dispatch`   | Required.                              |
| `on change`        | `dispatchOn` | Defaults to `'input'`.                 |
| `bubbling`         | `bubbles`    | `true` / `false`                       |
| `composed`         | `composed`   | `true` / `false`                       |
| `cancelable`       | `cancelable` | `true` / `false`                       |
| `replacing`        | `replace`    | `true` / `false`                       |

### Declarative -- via `enh.set`

```JS
// equivalent to <input be-dispatching="of bubbling event my-event on change">
input.enh.set.beDispatching.dispatchRules = [
    {dispatch: 'my-event', dispatchOn: 'change', bubbles: true}
];
```

This can be done before or after `defBeDispatching` has been called.

### Imperative -- via `enh.get()`

```JS
// equivalent to Example 1
input.enh.get(emc).dispatchRules = [{
    dispatch: '402735ed-b9e8-4ef4-9e0d-3a6b385de863',
    dispatchOn: 'change',
    bubbles: true,
    composed: true,
    cancelable: true,
    replace: true,
}];
```

See [demo/Programmatic](demo/Programmatic/) for runnable examples.

## Viewing Locally

Any web server that serves static files with server-side includes will do but...

1. Install git
2. Fork/clone this repo
3. Install node.js
4. Open command window to folder where you cloned this repo
5. > git submodule add https://github.com/bahrus/types.git types
6. > git submodule update --init --recursive
7. > npm install
8. > npm run serve
9. Open http://localhost:8000/demo/ in a modern browser

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

