# be-dispatching [TODO]

better syntax than be-composed

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
<input be-dispatching='of bubbling, composed, cancelable, propagation-stopping event 402735ed-b9e8-4ef4-9e0d-3a6b385de863 on change.'>
```