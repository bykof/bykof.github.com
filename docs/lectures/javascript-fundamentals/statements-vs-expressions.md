# Statements vs. Expression

## Useful links

[https://joshwcomeau.com/operator-lookup/](https://joshwcomeau.com/operator-lookup/)

## Statements

Statements perform instructions step by step.

```javascript
let myStr;

if (myBool) {
  myStr = 'Yes';
} else {
  myStr = 'No';
}
```

## Expressions

Expressions always produce a value.

```javascript
let myStr = myBool ? 'Yes' : 'No';
```

## Operators

Most operators work with primitive values.

### Equality

#### Loose Equality (avoid!)

```javascript
'123' == 123;
// true

false == 0;
// true
```

#### Strict Equality

```javascript
false === 0;
// false

'123' === 123;
// false
```

### Ordering

```javascript
5 >= 2;
// true

'bar' < 'foo';
//true
```

### Nullish Coalescing

Checks if the first value is 'nullish' and uses the second value if so

```javascript
a ?? b;
// is the same as
a !== undefined && a !== null ? a : b;
```

### OR Operator

Checks if the first value is 'falsy' and uses the second value if so

```javascript
undefined || 'default';
// "default"

null || 'default';
// "default"

false || 'default';
// "default"

0 || 'default';
// "default"

0n || 'default';
// "default"

'' || 'default';
// "default"

true || 'default';
// true

'some text' || 'default';
// "some text"
```

### AND Operator

Checks if the first value is 'truthy' and uses the second value if so

```javascript
[1, 2, 3] && 'default'
// 'default'

{a: 2} && 'default'
// 'default'

true && 'default'
// 'default'

123 && 'default'
// 'default'

4n && 'default'
// 'default'

'asdf' && 'default'
// 'default'

false && 'default'
// false
```

## What is allowed where?

The body of a function must be a sequence of statements:

```javascript
function max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}
```

The arguments of a function call or a method call must be expressions:

```javascript
console.log('ab' + 'cd', Number('123'));
```
