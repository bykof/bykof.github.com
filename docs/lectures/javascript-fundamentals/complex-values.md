# Complex Values

## Arrays

```javascript
const shoppingList = ["milk", "rice", "sugar"];
const values = ["abc", 123, ["dfg", "jkl"]];

assert.equal(shoppingList[0], "milk");
assert.equal(shoppingList.length, 3);

// Adding an item
shopping_list.push("potatoes");
assert.equal(shoppingList.length, 4);

// Shrinking the array to a length
shopping_list.length = 1;
assert.equal(shoppingList, ["milk"]);

// Remove at 0 index 1 element from array
shopping_list.splice(0, 1);
```

All possible functions: [Arrays](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array)

### Destructuring

```javascript
const arr = ["a", "b", "c"];
const [a, b, c, d = "d"] = arr;

assert.equal(a, "a");
assert.equal(b, "b");
assert.equal(c, "c");
assert.equal(d, "d");
```

### Spreading

```javascript
const arr = [1, 2, 3];
const copyArr = [...arr];
const anotherCopyArr = [0, ...arr, 4, 5, 6];

assert.equal(arr, arr);
assert.notEqual(arr, copyArr);
assert.deepEqual(arr, copyArr);

copyArr;
// [ 1, 2, 3 ]

anotherCopyArr;
/*
[
  0, 1, 2, 3,
  4, 5, 6
]
*/
```

### Map Filter Reduce Find

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const mappedArr = arr.map((value) => value + 1);

const filteredArr = arr.filter((value) => value % 2 === 0);

const reducedArr = arr.reduce((value, total) => total + value, 0);

const findArr = arr.find((value) => value === 9);

const notFindArr = arr.find((value) => value === 10);

assert.deepEqual(mappedArr, [2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepEqual(filteredArr, [2, 4, 6, 8]);
assert.deepEqual(reducedArr, 45);
assert.deepEqual(findArr, 9);
assert.deepEqual(notFindArr, undefined);
```

See Anonymous Functions for further information.

## Objects

```javascript
const person = {
  firstName: 'Test',
  lastName: 'Testlast',
};

assert.equal(person.firstName, 'Test');
assert.equal(person['firstName'], 'Test');

person.age = 12;
assert.equal(
  person,
  { firstName: 'Test', lastName: 'Testlast', age: 12 }
)
> Uncaught AssertionError

assert.deepEqual(
  person,
  { firstName: 'Test', lastName: 'Testlast', age: 12 }
)
```

All possible functions: [MDN Docs](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object)

### Destructuring

```javascript
const person = {
  firstName: "Test",
  lastName: "Testlast",
};

const { firstName, lastName, age = 0 } = person;
const { fName, lName } = person;

assert.equal(firstName, "Test");
assert.equal(lastName, "Testlast");
assert.equal(age, 0);
assert.equal(fName, undefined);
assert.equal(lName, undefined);
```

### Spreading

```javascript
const person = {
  firstName: "Test",
  lastName: "Testlast",
};

const newPerson = {
  firstName: "AnotherTest",
  ...person,
  age: 18,
};

assert.deepEqual(newPerson, {
  firstName: "Test",
  lastName: "Testlast",
  age: 18,
});
```

### Object.keys

```javascript
const person = {
  firstName: 'Test',
  lastName: 'Testlast',
};

assert.equal(
  Object.keys(person),
  ['firstName', 'lastName'],
);
> Uncaught AssertionError

assert.deepEqual(
  Object.keys(person),
  ['firstName', 'lastName'],
);
```

### Object.values

```javascript
const person = {
  firstName: "Test",
  lastName: "Testlast",
};

assert.deepEqual(Object.values(person), ["Test", "Testlast"]);
```

### Methods

```javascript
const person = {
  firstName: "Test",
  lastName: "Testlast",
  fullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

assert.equal(person.fullName(), "Test Testlast");
```
