# Classes

## Constructor Functions

There is the existence of constructor functions:

```javascript
function Person(name) {
  this.name = name;
  this.describe = function () {
    return "Person named " + this.name;
  };
}

assert.equal(typeof Person, "function");

const person = new Person("Test");
assert.equal(typeof person, "object");
assert.equal(person.name, "Test");
assert.equal(person.describe(), "Person named Test");
```

But they are used less frequently because of the implementation of Classes in ES6.
So it became more convenient to use `classes` instead of `constructor functions`:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return "Person named " + this.name;
  }

  get upperCaseName() {
    return this.name.toUpperCase();
  }

  set setUpperCaseName(value) {
    this.name = value.toUpperCase();
  }
}

const person = new Person("Test");

assert.equal(person.name, "Test");
assert.equal(person.describe(), "Person named Test");
assert.equal(person.upperCaseName, "TEST");

person.setUpperCaseName = "anotherTest";
assert.equal(person.name, "ANOTHERTEST");

person.name = "backTest";
assert.equal(person.name, "backTest");
```

## Inheritance

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Employee extends Person {
  constructor(firstName, lastName, position) {
    super(firstName, lastName);
    this.position = position;
  }
}

const empl1 = new Employee("Test", "Testlast", "Developer");
assert.equal(empl1.fullName(), "Test Testlast");
```

## Static

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static createDefaultPerson() {
    return new Person("Test", "TestPerson");
  }
}
```
