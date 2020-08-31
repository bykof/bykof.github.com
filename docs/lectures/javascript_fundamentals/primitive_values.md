# Primitive Values

## undefined vs. null

`undefined` means "not initialized" (e.g. a variable) or "not existing" (e.g. a property of an object)

`null` means "the intentional absence of any object value" (a quote from the language specification)

```javascript
let myVar;
assert.equal(myVar, undefined);

function func(x) {
  return x;
}
assert.equal(func(), undefined);

const obj = {};
assert.equal(obj.unknownProp, undefined);

function func() {}
assert.equal(func(), undefined);
```

## Booleans

```javascript
const a = true;
const b = false;
const c = Boolean("");
const d = Boolean(123);

assert.equal(c, false);
assert.equal(d, true);
```

See Truthy vs. Falsy values for further information

## Numbers

All numbers are `doubles` with `64-bit floating point`

```javascript
assert.equal(98, 98.0);
```

## Strings

```javascript
const str1 = "abc";
const str2 = "abc";

assert.equal(str1[0], str2[0]);
```

All possible functions: [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#)

### Template Strings

```javascript
const firstName = "Test";
const lastName = "LastTest";
const str = `${firstName} ${lastName}`;
const str2 = firstName + " " + lastName;
```
