# Functions

JavaScript has **two categories** of functions

An **ordinary** function can play several roles:

- Real function
- Method
- Constructor function

A **specialized** function can only play one of those roles – for example:

- An arrow function can only be a real function.
- A method can only be a method.
- A class can only be a constructor function.

## Ordinary Functions

### Parts of Ordinary Functions

```javascript
function add(x, y) {
  return x + y;
}
```

- add is the name of the function declaration.
- add(x, y) is the head of the function declaration.
- x and y are the parameters.
- The curly braces ({and}) and everything between them are the body of the function declaration.
- The return statement explicitly returns value from the function.

### Different ways to define the same: an ordinary function

Three ways of doing (roughly) the same thing: creating an ordinary function.

```javascript
// Function declaration (a statement)
function ordinary1(a, b, c) {
  // ···
}

// const plus anonymous function expression
const ordinary2 = function (a, b, c) {
  // ···
};

// const plus named function expression
const ordinary3 = function myName(a, b, c) {
  // `myName` is only accessible in here
};
```

### Roles of an ordinary function

```javascript
function add(x, y) {
  return x + y;
}
```

This function declaration creates an ordinary function whose name is `add`. As an ordinary function, `add()` can play three roles:

#### 1. Real function: invoked via a function call:

```javascript
assert.equal(add(2, 1), 3);
```

#### 2. Method: stored in property, invoked via a method call:

```javascript
const obj = { addAsMethod: add };
assert.equal(obj.addAsMethod(2, 4), 6); // (A)
```

`obj` is called the `receiver` of the method call. It can be accessed via `this` inside the method.

#### 3. Constructor function/class: invoked via new.

```javascript
const inst = new add();
assert.equal(inst instanceof add, true);
```

## Specialized Functions

Specialized functions are single-purpose versions of ordinary functions. Each one of them specializes in one `single role`:

### Roles of specialized function

#### The purpose of an `arrow function` is to be a real function:

```javascript
const arrow = () => {
  return 123;
};
assert.equal(arrow(), 123);
```

#### The purpose of a `method` is to be a method:

```javascript
const obj = {
  method() {
    return 'abc';
  },
};
assert.equal(obj.method(), 'abc');
```

#### The purpose of a `class` is to be a constructor function:

```javascript
class MyClass {
  /* ··· */
}
const inst = new MyClass();
```

### Use specialized over ordinary functions

```javascript
function funcDecl(x, y) {
  return x * y;
}

const arrowFunc = (x, y) => {
  return x * y;
};
```

## Arrow Functions

```javascript
const f = function (x, y, z) {
  return 123;
};

const g = (x, y, z) => {
  return 123;
};
const h = (x, y, z) => 123;
const plusTwo = (x) => x + 2;
```

Arrow Functions are often used as a parameter of callback-functions

### Return Statements

Normally you can just use `return` in an arrow function to return expressions:

```javascript
const sum = (a, b) => {
  return a + b;
};
```

If the return value of the arrow function is an expression, you can leave the curly-brackets out.

```javascript
[1, 2, 3].map((x) => x + 1);
```

If you want to return a multiline expression you can wrap the expression in parenthesis:

```javascript
const divide = (dividend, divisor) => (
  dividend / divisor
)
```

## What about this 'this'?

In ordinary functions 'this' always relates to current function. In specialized functions 'this' always relates to the lexical this which is mostly preferred.

```javascript
const prefixer = {
  prefix: '==> ',
  prefixStringArray(stringArray) {
    return stringArray.map(function (x) {
      return this.prefix + x;
    });
  },
};

prefixer.prefixStringArray(['a', 'b', 'c'])[
  ('undefineda', 'undefinedb', 'undefinedc')
];

const prefixerRight = {
  prefix: '==> ',
  prefixStringArray(stringArray) {
    return stringArray.map((x) => {
      return this.prefix + x;
    });
  },
};

prefixerRight.prefixStringArray(['a', 'b', 'c'])[('==> a', '==> b', '==> c')];
```
