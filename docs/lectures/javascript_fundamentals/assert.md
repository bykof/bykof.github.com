# Assert

Please consider that the used assert object in the following examples only exists in Node.JS!

If you are going to programm JavaScript in the browser, it won't be possible to use assert.equal for example.

The Browser API only supports console.assert(condition, msg).
So if you want to assert in the browser, you have to do the condition by yourself.

For example:

```javascript
const a = 2;
const b = 3;
const c = 4;

console.assert(a !== b, "a equals b");
console.assert(a === c / 2, "a equals c divided by 2");
```
