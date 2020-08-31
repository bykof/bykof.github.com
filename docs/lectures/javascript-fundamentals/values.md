# Values

<figure>
  <img src="/img/values.png" width="600" />
  <figcaption>Separaton of values in JavaScript</figcaption>
</figure>

* undefined with the only element undefined
* null with the only element null
* boolean with the elements false and true
* number the type of all numbers (e.g., -123, 3.141)
* bigint the type of all big integers (e.g., -123n)
* string the type of all strings (e.g., 'abc')
* symbol the type of all symbols (e.g., Symbol('My Symbol'))
* object the type of all objects (different from Object, the type of all instances of class Object and its subclasses)

## Primitive Values vs. Objects

### Primitive values

* They are atomic building blocks of data in JavaScript.
* They are passed by value: when primitive values are assigned to variables or passed to functions, their contents are copied.
* They are compared by value: when comparing two primitive values, their contents are compared.

### Objects

* They are compound pieces of data
* They are passed by identity: when objects are assigned to variables or passed to functions, their identities (think pointers) are copied.
* They are compared by identity (my term): when comparing two objects, their identities are compared
