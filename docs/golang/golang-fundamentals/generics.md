# Generics

Generics can be used, if you want to do similar operations with the same function, but you have different variable types.

Let's check an example first:

```go linenums="1"
// SumInts adds together the values of m.
func SumInts(m map[string]int64) int64 {
    var s int64
    for _, v := range m {
        s += v
    }
    return s
}

// SumFloats adds together the values of m.
func SumFloats(m map[string]float64) float64 {
    var s float64
    for _, v := range m {
        s += v
    }
    return s
}

func main() {
    // Initialize a map for the integer values
    ints := map[string]int64{
        "first":  34,
        "second": 12,
    }

    // Initialize a map for the float values
    floats := map[string]float64{
        "first":  35.98,
        "second": 26.99,
    }

    fmt.Printf("Non-Generic Sums: %v and %v\n",
        SumInts(ints),
        SumFloats(floats))
}
```

output:

```
Non-Generic Sums: 46 and 62.97
```

Now let's transform the function into a generic one:

```go linenums="1"
func SumIntsOrFloats[K comparable, V int64 | float64](m map[K]V) V {
    var s V
    for _, v := range m {
        s += v
    }
    return s
}

func main() {
    // Initialize a map for the integer values
    ints := map[string]int64{
        "first":  34,
        "second": 12,
    }

    // Initialize a map for the float values
    floats := map[string]float64{
        "first":  35.98,
        "second": 26.99,
    }

    fmt.Printf("Generic Sums: %v and %v\n",
        SumIntsOrFloats(ints),
        SumIntsOrFloats(floats))
}
```

output:

```
Generic Sums: 46 and 62.97
```

## Type Constraints

We can define type constraints by defining new interfaces and use [interface embedding](./types_interfaces_methods.md#embedding-interfaces).

For example we define:

```go linenums="1"
type Number interface {
    int64 | float64
}
```

now we can use:

```go linenums="1"
func SumNumbers[K comparable, V Number](m map[K]V) V {
    var s V
    for _, v := range m {
        s += v
    }
    return s
}
```

## Underlying Types

Sometimes you define a user-defined type, but don't want to add your type to a generic function, which takes in just `primitive` types.
Therefore just use underlying types:

```go linenums="1"
type Number interface {
    int | int8 | int16 | int32 | int64
}

type MySpecialNumber int32

func Sum[V Number](a V, b V) V {
    return a + b
}

func main() {
    var a MySpecialNumber = 1
    var b MySpecialNumber = 2
    fmt.Println(Sum(a, b))
}
```

makes the error:

```
MySpecialNumber does not implement Number (possibly missing ~ for int32 in constraint Number)
```

So what you need here is `underlying types` so that you allow any user-defined types, which use the underlying type.
Use `~` to make the type underlying.

Here is a fixed example:

```go linenums="1"
type Number interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64
}

type MySpecialNumber int32

func Sum[V Number](a V, b V) V {
    return a + b
}

func main() {
    var a MySpecialNumber = 1
    var b MySpecialNumber = 2
    fmt.Println(Sum(a, b))
}
```

!!! warning

    You cannot use underlying types with user-defined types.
    You have to use a primitive type!

## Which Types?

You can use built-in types for generics, but also interfaces:

```go linenums="1"
type Stringer interface {
    String() string
}

func Join[E Stringer](things []E) string {
    var result string
    for _, value := range things {
        result += value.String()
    }
    return result
}
```

There are also new keywords invented for generics like: `any` and `comparable`

## Constraints Package

The [constraints package](https://pkg.go.dev/golang.org/x/exp/constraints) provides some useful interfaces to use for Generics.
For example

## User defined generic types

We can also define user-defined generic types.

Check the example here:

```go linenums="1"
type Bunch[E any] []E

var myBunch := Bunch[int]{1, 2, 3}
```

Also you can use the `Bunch` now as parameter type:

```go linenums="1"
type Bunch[E any] []E

func PrintBunch[E any](bunch Bunch[E]) {
    //...
}

func [b Bunch[E]] Print() {
    // ...
}
```

or as a struct:

```go linenums="1"
type List[T any] struct {
	next  *List[T]
	value T
}

func main() {
	myList := List[int]{value: 2}
	fmt.Println(myList)
}
```
