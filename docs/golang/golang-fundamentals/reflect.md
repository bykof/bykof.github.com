# Reflect

[Informative Source](https://go.dev/blog/laws-of-reflection)

With reflect we get information about our variables at runtime.
It's highly recommended **not** to use reflection, because every wrong usage can `panic`.
Reflect should be the last possible way to do "meta-programming" in Go.

But let's check an example anyway:

```go linenums="1"
package main

import (
	"fmt"
	"reflect"
)

type Foo struct {
	A int `tag1:"First Tag" tag2:"Second Tag"`
	B string
}

func main() {
	sl := []int{1, 2, 3}
	greeting := "hello"
	greetingPtr := &greeting
	f := Foo{A: 10, B: "Salutations"}
	fp := &f

	fmt.Println(reflect.TypeOf(sl))
	fmt.Println(reflect.TypeOf(greeting))
	fmt.Println(reflect.TypeOf(greetingPtr))
	fmt.Println(reflect.TypeOf(f))
	fmt.Println(reflect.TypeOf(fp))
}
```

output:

```
[]int
string
*string
main.Foo
*main.Foo
```

Reflection has three rules, that you should remember, when you work with `reflect`:

1.  [Reflection goes from interface value to reflection object](#reflection-goes-from-interface-value-to-reflection-object)
2.  [Reflection goes from reflection object to interface value](#reflection-goes-from-reflection-object-to-interface-value)
3.  [To modify a reflection object, the value must be settable](#to-modify-a-reflection-object-the-value-must-be-settable)

## Reflection goes from interface value to reflection object

If you use [`reflect.TypeOf`](https://pkg.go.dev/reflect#TypeOf) you pass in `any` and get a [`Type`](https://pkg.go.dev/reflect#Type) back.
`Type` is an interface to get more information about the reflected type.
If we want to examine the [`Value`](https://pkg.go.dev/reflect#Value) of a specific variable we can do that by:

```go linenums="1"
var x float64 = 3.4
fmt.Println("type:", reflect.TypeOf(x))
fmt.Println("value:", reflect.ValueOf(x).String())
```

We can use the reflection to check, if a variable has a specific type:

```go linenums="1"
var x float64 = 3.4
v := reflect.ValueOf(x)
fmt.Println("type:", reflect.TypeOf(x))
fmt.Println("value:", v.String())
fmt.Println("kind is float64:", v.Kind() == reflect.Float64)
```

output would be:

```
type: float64
value: <float64 Value>
kind is float64: true
```

If you have a user-defined type, `Type` can give you the user-defined type, but `Kind` will always give you the built-in type.

```go linenums="1"
type MyInt int
var x MyInt = 7
v := reflect.ValueOf(x)
fmt.Println(v.Kind().String())
fmt.Println(v.Type())
```

## Reflection goes from reflection object to interface value

If we have a reflected `reflect.Value`, we can derive back the inverse of it.
We call the `Interface` method on a `Value` to get it's interface again and then we can [Type Assert](./types_interfaces_methods.md#type-assertions) it back to it's natural Go type.

Let's take an example:

```go linenums="1"
y := 2.9
v := reflect.ValueOf(y)
x := v.Interface().(float64)
fmt.Printf("x, type: %T, value: %v\n", x, x)
```

output:

```
x, type: float64, value: 2.9
```

## To modify a reflection object, the value must be settable

To set a value via reflection, the value must be settable.

```go linenums="1"
var x float64 = 3.4
v := reflect.ValueOf(x)
v.SetFloat(7.1) // Error: will panic.
```

output:

```
panic: reflect: reflect.Value.SetFloat using unaddressable value
```

Go is call-by-value, therefore it's a copy of the variable `x` what `reflect.ValueOf` is using.
When we want to set the value of `x`, we have to pass a "Setable" type: a pointer.

```go linenums="1"
var x float64 = 3.4
v := reflect.ValueOf(&x)
v.SetFloat(7.1)
fmt.Println(x)
```

If we now to set the value, the output would be:

```
panic: reflect: reflect.Value.SetFloat using unaddressable value
```

Why? Because we just try to set 7.1 to the pointer itself and not to the actual value in RAM.
To get the actual Value of a pointer in the RAM we have to call [`Elem`].

Elem returns the value that the interface v contains or that the pointer v points to.
It panics if v's Kind is not Interface or Pointer.
It returns the zero Value if v is nil.

Example:

```go linenums="1"
var x float64 = 3.4
v := reflect.ValueOf(&x)
v.Elem().SetFloat(7.1)
fmt.Println(x)
```

now the output is correct:

```
7.1
```
