# Web APIs

Web APIs allow to communicate with the Browser via JavaScript and to trigger different functions.

Web APIs are exposed as global functions or objects into the current JavaScript environment.

## `window`

For example there is a `window` object exposed, which contains all the information about the current window (the current tab):

```javascript
window.console.log(window.innerHeight);
window.console.log(window.innerWidth);
```

All attributes and methods of the `window` object, are exposed to your JavaScript environment automatically.

So you could use:

```javascript
window.console.log("Test");

// or simply
console.log("Test");
```
