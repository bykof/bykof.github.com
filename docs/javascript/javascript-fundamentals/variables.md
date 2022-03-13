# Variables

## Const > Let

Use always `const` unless you have to reset the variable, then use `let`

```javascript
const a = 2;
a = 3;
Uncaught TypeError: Assignment to constant variable.

let a = 4;
a = 6;
```

## And what about var?

`var` was the variable before `const` and `let` were introduced.
The reason why const and let were introduced is that they are block scoped.

`var` is only __function scoped__ but this is not enough as following example should show:

```javascript
function processArray(array) {
  for (var i = 0; i < array.length; i++) {
    console.log("Element ", array[i]);
  }

  console.log("I can use variable i outside the loop ", i);
}
```
