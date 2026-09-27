# Add Support For Programmatic Attachment

## Bruce's Ask

Can you please follow the example of [be-persistent](https://github.com/bahrus/be-persistent) and [be-bound](../../be-bound) and [be-calculating](../../be-calculating/) and [the addendum](../types/ImportantEnhancementAddendum.md) to add demos and adjust be-dispatching.js as needed and add def.js to support programmatic attachment of this enhancement?

Please add your implementation notes below.

## Implementation Notes

I followed the addendum's checklist, including the new step 6 (README
wording), with be-persistent, be-bound and be-calculating as models.

Like be-persistent and be-bound, be-dispatching already separated the
attribute-parsed value (`crudeDispatchRules`) from the value `hydrate` reads
(`dispatchRules`), via the `when_crudeDispatchRules_changes_call_finishParsing`
compact. `dispatchRules` is a plain array of `DispatchRule` objects, so
programmatic callers set it directly and no new property was needed.

### Addendum steps

1. **`init()` awaits `roundabout(...)` and then sets `self.initialized = true`.**
   `hydrate` now uses `ifKeyIn: ['dispatchRules', 'initialized'], ifAllOf: ['dispatchRules', 'enhancedElement', 'initialized']`,
   the same as be-persistent's `hydrate`.
2. **`ctx.emc || ctx.config`.** `init` now falls back to `ctx.config`.
3. **`def.js`** exports `defBeDispatching(ref)`, using the same formula as the
   others. `package.json`:
   - `exports` now includes `./def.js`, `./emc.json` and `./📡.json`.
   - I removed `./📡.js`, which doesn't exist.
   - `files` now includes `*.json`. Before, neither `emc.json` nor `📡.json`
     was published.
   - `assign-gingerly` (0.0.97, matching be-bound and be-calculating) is now a
     direct dependency. `def.js` imports it, and it had only been installed
     transitively, at 0.0.87.
4. **Reserved names.** There are no collisions. `dispatchRules` is referenced
   by `hydrate`, so roundabout monitors it.
5. **Tests.** See below.
6. **README.** Added a "Programmatic attachment (no attribute)" section with
   the editorial intro, registration, a statement-part → property table, both
   patterns, and a link to the demos.

### `enhKey` renamed: `be-dispatching` → `beDispatching`

The enhKey was kebab-case, which would have made the programmatic API
`input.enh.set['be-dispatching']`. It is now `beDispatching`, matching
`beBound` / `beCalculating` / `bePersistent`, so the API is
`input.enh.set.beDispatching`. The emoji variant still uses `📡`. This
changes the key for attribute users too: anyone reading the instance via
`el.enh['be-dispatching']` would need `el.enh.beDispatching`. I found no such
usage in this repo.

### Bug fix: `replacing` qualifier never worked

`finishParsing` turned each qualifier into a `true` property named after it,
with only `bubbling` mapped to `bubbles`. So `replacing` produced
`rule.replacing = true`, while `hydrate` reads `rule.replace`. The triggering
event was therefore never stopped from propagating. `finishParsing` now maps
`replacing` → `replace`. The new `tests/Replacing.html` covers this for the
attribute path. I confirmed that it fails without the fix and passes with it.

### Demos and tests

Each demo has a `<div id=container>` that logs which events reach it, around
an `<input>` that dispatches `my-event` on `change`:

- `demo/Programmatic/DeclarativeInSequence.html`: `enh.set` after
  `defBeDispatching`. The container hears both `change` and `my-event`.
- `demo/Programmatic/DeclarativeOutOfSequence.html`: the same, set before
  `defBeDispatching`.
- `demo/Programmatic/Imperative.html`: `enh.get()` with `replace: true`. The
  container hears *only* `my-event`.
- `tests/Programmatic/*.html` + `*.spec.mjs` mirror the three demos, and
  `tests/Replacing.*` covers the attribute path.

All 5 Playwright tests pass (the existing `test1` plus the 4 new ones).

I also documented the qualifiers (`bubbling`, `composed`, `cancelable`,
`replacing`) in the README, since they weren't explained anywhere.

### Other changes

- `types/be-dispatching/types.d.ts` (in the `types` git submodule):
  `dispatchRules` moved to `EndUserProps`, and I added `initialized` and doc
  comments. **These edits need to be committed and pushed in the `types`
  submodule separately.**
- `emc.json` / `📡.json` were regenerated with `npm run build`.

