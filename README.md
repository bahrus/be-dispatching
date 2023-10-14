# be-dispatching [TODO]

Dispatch event from enhanced element with specified name.

```html
<input be-composed='{
    "dispatch":{
        "change":{
            "as": "402735ed-b9e8-4ef4-9e0d-3a6b385de863",
            "bubbles": true,
            "composed": true,
            "cancelable": true,
            "stopPropagation": true,
        }
    }
}'>
```

becomes:

```html
<input be-dispatching='of bubbling, composed, cancelable, replacing event 402735ed-b9e8-4ef4-9e0d-3a6b385de863 on change.'>
```