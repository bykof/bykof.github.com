# Primitive Types and Declarations

## Zero Value

If a variable is declared but not initialized with a value it gets the 'zero value'.

Following zero values will be defined:

| Types     | Zero Value |
| --------- | ---------- |
| int       | 0          |
| float     | 0.0        |
| bool      | false      |
| string    | ""         |
| pointer   | nil        |
| interface | nil        |
| slice     | nil        |
| map       | nil        |
| channel   | nil        |
| function  | nil        |

## Variable Declarations

There are several ways to define a variable in Go.
Each definition describes the way, the declared variable will be used.

The default way to declare a variable is by using:

```go linenums="1"
var x int = 10
```

Using the `var` keyword, the variable name, the type, the assignment operator, and a value.

If there is a default type for the value you propose, you can use a shorter declaration:

```go linenums="1"
var x = 10
```

If you don't want to initialize the variable and just declare it, you can leave the assignment operator with the value.
The variable will be then initialized with the [Zero Value](#zero-value).

```go linenums="1"
var x int
```

---

You can declare multiple variables of the same type with:

```go linenums="1"
var x, y int = 10
```

Also it's possible to just declare multiple variables of the same type without initialization:

```go linenums="1"
var x, y int
```

or for different types, but only in this form:

```go linenums="1"
var x, y = 10, "hello"
```

---

It's also possible to wrap declarations in paranthesis:

```go linenums="1"
var (
    x    int
    y            = 20
    z    int     = 30
    d, e         = 40, "hello"
    f, g string
)
```

### Short declaration format

Golang supports also a short declaration format.
It can be only used within function scopes, not at the package scope.
The short declaration format allows you to assign values to existing variables.

Here is an example:

```go linenums="1"
var x = 10
x := 10
```

This wouldn't work:

```go linenums="1"
var x = 10
var x = 10
```

This would result:

```go linenums="1"
./prog.go:5:6: x redeclared in this block
./prog.go:4:6: other declaration of x
```

### When to use what?

When you should use `var` or `:=`?

There are some rules to follow, when you decide when to use what:

-   When you initialize a variable to its zero value, use `var x int`.
-   When assigning an untyped constant or a literal to a typed variable:
    ```go linenums="1"
    var x byte = 20
    ```
-   `:=` allows you to assign to new and existing variables. Therefore it's idiomatic to declare new variables with `var` and mixed (new and existing) variables with `:=`.

### Package Variables

Avoid defining variables in the `package block`, because they can be manipulated by other functions, which makes it harder to track, what values they have.
Use `const` for this problem.

## Const

Const allows variables to be immutable.
It has the same syntax as variables.
Here are some examples:

```go linenums="1"
package main

import (
    "fmt"
)

const x int = 10

const (
    idKey   = "id"
    nameKey = "name"
)

const z = 20 * 10

func main() {
    const y = "hello"

    fmt.Println(x)
    fmt.Println(y)

    x = x + 1
    y = "bye"

    fmt.Println(x)
    fmt.Println(y)
}

```

This would result in:

```go linenums="1"
./prog.go:22:5: cannot assign to x (constant 10 of type int)
./prog.go:23:5: cannot assign to y (untyped string constant "hello")
```

### Definition at compile time

Go initializes constants at compile time, therefore it's only possible to assign following values to them:

-   [Numeric literals](./grammar.md#integer-literals)
-   [Boolean literals](#booleans)
-   Strings
-   Runes
-   built-in function like complex, real, imag, len, cap
-   Expressions that consists of operators and the preceeding values

## Unused variables

Go will complain if you leave variables unread.

Take a look at the following example:

```go linenums="1"
package main

var x = 10

func main() {
    var y = 20
}
```

This will result in the error:

```
./prog.go:7:9: y declared but not used
```

Therefore you can define as many package variables as you want.
Only function scope variables should be read at least once.
This is an another argument to avoid package scope variables.

### Unused constants

You can define as much constants as you want.
Because constants are calculated at the compile time, they won't have any side effects.

This compiles without errors:

```go linenums="1"
package main

const x = 10

func main() {
    const y = 20
}
```


## Primitive Types

Following primitive types in Go can be used:

* Boolean
* Integer
* Float
* Complex
* Byte
* Rune
* String

## Booleans

`bool` types represents Boolean values.
It can have `true` or `false` as value.
The zero value for bool is `false`.

## Numeric Types

Go has 12 different numeric types that are grouped into three categories.

-   Integer
-   Float
-   Complex

### Integer

Go has signed and unsigned integers with different byte sizes.
They are defined in the following table:

| Type Name | Value Range                                 |
| --------- | ------------------------------------------- |
| int8      | -128 to 127                                 |
| int16     | -32768 to 32767                             |
| int32     | -2147483648 to 2147483647                   |
| int64     | -9223372036854775808 to 9223372036854775807 |
| uint8     | 0 to 255                                    |
| uint16    | 0 to 65535                                  |
| uint32    | 0 to 4294967295                             |
| uint64    | 0 to 18446744073709551615                   |

#### Overflows

Trying to set a higher value to a numeric type with it's allowed byte size

```go linenums="1"
package main

import (
    "fmt"
)

func main() {
    var x uint8
        fmt.Println("Throws integer overflow")
    x = 267       // range of uint8 is 0-255
}
```

will result in following compiler error:

```
./prog.go:10:9: cannot use 267 (untyped int constant) as uint8 value in assignment (overflows)
```

#### Special integer types

There is a special name called `int`.
It has different byte allocations depending on the CPU architecture.
On a 32-bit CPU, `int` is a 32-bit signed integer like `int32`.
On most 64-bit CPUs, `int` is a 64-bit signed integer like `int64`.
Because `int` depends on the CPU architecture, it is not allowed to perform mathematical operations or between `int` and `int32` or `int64`.

See following example for this:

```go linenums="1"
package main

import "fmt"

func main() {
	var x int = 2
	var y int32 = 5
	var z int64 = 2
	fmt.Println(x + y)
	fmt.Println(x + z)
}
```

would result in a compile error:

```
./prog.go:9:14: invalid operation: x + y (mismatched types int and int32)
./prog.go:10:14: invalid operation: x + z (mismatched types int and int64)

Go build failed.
```

## Floating point types

There are two floating point types, displayed in the following table:

| Type Name | Larget absolute value | Smallest (nonzero) absolute value |
| --------- | --------------------- | --------------------------------- |
| float32   | 3.4028e+38            | 1.4012e-45                        |
| float64   | 1.7976e+308           | 4.9406e-324                       |

In most cases you shouldn't use float, because Go just stores the nearest approximation for a value.
If you want to use float, you will need `float64` unless you really know what you do.

## Complex types

Go has a built-in support for complex numbers.
You're probably not going to need them.

Here is an example how to use complex numbers in Go:

```go linenums="1"
package main

import (
	"math/cmplx"
	"fmt"
)

func main() {
    x := complex(2.5, 4.1)
    y := complex(10.2, 6)
    fmt.Println(x + y)
    fmt.Println(x - y)
    fmt.Println(x * y)
    fmt.Println(x / y)
    fmt.Println(real(x))
    fmt.Println(imag(y))
    fmt.Println(cmplx.Abs(x))
}
```

## Byte

A `byte` is an alias for `uint8`.
You can compare, peform mathematical operations between a `byte` and `uint8`.
For example the following code works:

```go linenums="1"
package main

import "fmt"

func main() {
    var x uint8 = 2
    var y byte = 65
    fmt.Println(x + y)
}
```

this would print:

```
67
```

However if you want to work with bytes just use `byte` and not `uint8`.

## Rune

A `rune` is a an alias for `int32`.
You can compare, perform mathematical operations between a `rune` and `int32`.
A `rune` can be initialized with single quotes:

```go linenums="1"
const symbolRune = '⌘'
```

This rune has the integer value: `0x2318` which is the unicode character ⌘ ([See here](https://www.fileformat.info/info/unicode/char/2318/index.htm)).


## String

A string is a read only slice of bytes in Go.
Strings can be initialized in two ways: 

1. double quotes

Double quotes format the string with escape sequences. 
So if your string contains a `\n` it will format it to a newline.

```go linenums="1"
const myString = "Hello\n World!"
```

2. back quotes

Back quotes **ignore** escape sequences in your string. 

```go linenums="1"
const myString = `Hello\n World!`
```

Each character in your string represents an `utf-8` encoded string character by default.
In utf-8 each character occupies between 1-4 bytes. 
The characters `a` or `b` are encoded using `1 byte`. 
If you use characters like `£` (2 bytes) or `⌘` (3 bytes) the byte size can vary.
Therefore be cautious if you convert a string into a byte array, the byte array will contain each byte of a character:

```go linenums="1"
package main 

import "fmt"

func main () {
    myString := "£⌘a"
    fmt.Println([]byte(s))
}
```

will output:

```
|--£---| |---⌘-----| |a|
[194 163 226 140 152 97]
```

## Explicit Type Conversion

If you work with different type of integers and float you cannot just add, subtract, multiply, and divide those types independently.
You have to explicitly type cast an `int32` to an `int64` for example to add it to another `int64`.
That makes it clear with what types you work and if some data was truncated

```go linenums="1"
package main

import "fmt"

func main() {
    var x float64 = 1.2
    var y int = 2
    z := int(x) + y
    fmt.Println(z)
}
```

**A type conversion to boolean is not possible.**

If you want to type cast a variable to a bool, you have to use the [zero value](#zero-value) of the specific type.

```go linenums="1"
var x int
var s string = "Test"

var xZero bool = x == 0
var sZero bool = s == ""

fmt.Println(x, xZero)
fmt.Println(s, sZero)
```

