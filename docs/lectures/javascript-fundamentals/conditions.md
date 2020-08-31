# Conditions

## Truthy vs. Falsy values

Falsy values are:

- undefined
- null
- Boolean: false
- Numbers: 0, NaN
- Bigint: 0n
- String: ""

!!! note
    All other values are truthy!

## if-condition

```javascript
const a = 2;
const b = 3;

if (a === b) {
  console.log("equal");
} else {
  console.log("not equal");
}
```

## if-in-condition

```javascript
const a = {
  firstName: "Test",
  lastName: "Testlast",
};

assert.equal("firstName" in a, true);
assert.equal("lastName" in a, true);
assert.equal("Test" in a, false);
assert.equal("NotExistingKey" in a, false);

const b = ["a", "b", "c"];

assert.equal("a" in b, false);
assert.equal("b" in b, false);
assert.equal(0 in b, true);
assert.equal(2 in b, true);
assert.equal(3 in b, false);
```

## switch-case

```javascript
const STARTED = "started";
const FINISHED = "finished";
const status = STARTED;

switch (status) {
  case STARTED:
    console.log("Process has started!");
    break;
  case FINISHED:
    console.log("Process has finished!");
    break;
  default:
    console.log("Unknown status!");
}

// Process has started!
```
