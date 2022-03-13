# Classes

## Constructor Functions

There is the existence of constructor functions:

```javascript
function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
  this.fullName = function() {
    return `${this.firstName} ${this.lastName}`
  }
}

assert.equal(typeof Person, 'function');

const person = new Person('Test', 'Tester', 21, 'male');
assert.equal(typeof person, 'object');
assert.equal(person.firstName, 'Test');
assert.equal(person.fullName, 'Test Tester');
```

## Prototypes and Inheritance

```javascript
// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);

//If you don't set Rectangle.prototype.constructor to Rectangle,
//it will take the prototype.constructor of Shape (parent).
//To avoid that, we set the prototype.constructor to Rectangle (child).
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?', rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'
```

## Multiple Inheritance [use it with caution!]

```javascript
function MyClass() {
  SuperClass.call(this);
  OtherSuperClass.call(this);
}

// inherit one class
MyClass.prototype = Object.create(SuperClass.prototype);
// mixin another
Object.assign(
  Object.getPrototypeOf(MyClass.prototype),
  OtherSuperClass.prototype
);
// re-assign constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function () {
  // do something
};
```

## Classes

But they are used less frequently because of the implementation of Classes in ES6.
So it became more convenient to use `classes` instead of `constructor functions`:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return 'Person named ' + this.name;
  }

  get upperCaseName() {
    return this.name.toUpperCase();
  }

  set setUpperCaseName(value) {
    this.name = value.toUpperCase();
  }
}

const person = new Person('Test');

assert.equal(person.name, 'Test');
assert.equal(person.describe(), 'Person named Test');
assert.equal(person.upperCaseName, 'TEST');

person.setUpperCaseName = 'anotherTest';
assert.equal(person.name, 'ANOTHERTEST');

person.name = 'backTest';
assert.equal(person.name, 'backTest');
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

const empl1 = new Employee('Test', 'Testlast', 'Developer');
assert.equal(empl1.fullName(), 'Test Testlast');
```

## Static

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static createDefaultPerson() {
    return new Person('Test', 'TestPerson');
  }
}
```
