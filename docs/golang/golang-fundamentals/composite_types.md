# Composite Types

Composite types in Go contain more functionality than the primitive types.
There are builtin functions in Go to support composite types.
Let's see how to use them and what are the best practices.

## Comparable Types

This types are comparable:

-   Boolean
-   Numeric
-   String,
-   Pointer
-   Channel
-   Interface types
-   Structs – if all it’s field type is comparable
-   Array – if the type of value of array element is comparable

This are **not** comparable types:

-   Slice
-   Map
-   Function

## Arrays

Arrays aren't used directly.
Normally Go developers use Slices, we will see why in the next chapter, but let's first check what Arrays are and how to use them.

First we look at the declaration of an array:

```go linenums="1"
var x [3]int
```

This creates an array of three ints (`x[0]`, `x[1]`, `x[2]`), each initialized to a zero value (`0`).
If you want to define the values for all array elements use the array literal:

```go linenums="1"
var x = [3]int{1, 2, 3}
```

If can specify the indices of a new array:

```go linenums="1"
var x = [10]int{
    1: 1,
    3: 2,
    5: 3,
}
```

This will create the following array:

```
[0 1 0 2 0 3 0 0 0 0]
```

If you want to initialize an array with a dynamic number of values use the variadic keyword `...`.

```go linenums="1"
var x = [...]int{
    1: 1,
    3: 2,
    5: 3,
}
fmt.Println(x)
```

This will create the following array:

```
[0 1 0 2 0 3]
```

You can also define multi-dimensional arrays:

```go linenums="1"
var x [2][3]int
```

An array can be compared to other arrays with the same type:

```go linenums="1"
var x = [3]int{1, 2, 3}
var y = [...]int{1, 2, 3}
fmt.Println(x == y) // true
```

Use the known bracket syntax to access array indices:

```go linenums="1"
var x = [3]int{1, 2, 3}
x[0] = 5
fmt.Println(x[2])
```

!!! note

    You cannot read or write past an array or use negative indices.
    If you do it, this will result in a compile time error.
    An out-of-bound read or write during the execution time will result in a `panic`.
    We will talk about that later.

The builtin function `len` gives us the length of an array:

```go linenums="1"
var x = [3]int{1, 2, 3}
fmt.Println(len(x))
```

will output:

```
3
```

---

Array are used rarely and explcitly.
If you define an array with the size `[3]int` another array with the size `[4]int` is a different type.
This means you cannot use a variable to specify the size, because Go resolves the size at compile time.

You cannot use type conversion to convert arrays.
For example this won't work:

!!! failure

    ```go linenums="1"
    package main

    import "fmt"

    func main () {
        var x [3]int
        var y = [4]int(x)
        fmt.Println(x)
        fmt.Println(y)
    }
    ```

    will result in:

    ```
    ./prog.go:7:16: cannot convert x (variable of type [3]int) to type [4]int
    ```

**Therefore you should use arrays only, if you really know the exact length of your array.**

## Slices

If you want to use arrays and you do not have a fixed size of elements, use slices.
The length is not part of a slice.

```go linenums="1"
var x = []int{1, 2, 3}
```

!!! Note

    Using [...] makes arrays, using [] makes slices.

Also use the same syntax for slices as for arrays just without the size specifier:

```go linenums="1"
var x = []int{1: 1, 3: 2, 5: 3}
var y [][]int
```

You can read and write slices with the bracket syntax.
Read or write past a slice or using negative syntax is not allowed:

```go linenums="1"
x[0] = 20
fmt.Println(x[1])
```

If you declare a slice without initializing it the zero value for a slice is `nil`.
So if you want to check if a slice has been initialized use:

```go linenums="1"
var x []int
fmt.Println(x != nil) // -> false
```

A slice is not a comparable.

You can use following built-in functions for slices:

-   len
-   append
-   capacity
-   make

As for arrays you can use len to get the length of a slice:

```go linenums="1"
var x []int
fmt.Println(len(x)) // 0
```

The built-in `append` function can add elements to slices:

```go linenums="1"
var x []int
x = append(x, 1)
```

The append function takes at least two parameters, a slice of any type and a value of that type.
It returns a new slice of the same type and the appended element at the end.

You can append more than one value:

```go linenums="1"
var x = []int{0}
x = append(x, 1, 2, 3)
```

You can also append one slice to another by using variadic symbol:

```go linenums="1"
var x = []int{1, 2, 3}
var y = []int{4, 5, 6}
x = append(x, y...)
fmt.Println(x)
```

output:

```
[1 2 3 4 5 6]
```

If you do not assign the return value of an append call, it will result in a compile time error:

!!! failure
`go linenums="1" var x = []int{1, 2, 3} var y = []int{4, 5, 6} append(x, y...) fmt.Println(x) `

    will result in:

    ```
    append(x, y...) (value of type []int) is not used
    ```

Go is a call by value language, therefore Go makes a copy of the slice that you pass in, adds an element and return the new copy.

### Capacity

With `capacity` you retrieve the reserved consecutive memory locations.
This can be larger than the length of a slice.
Each time you `append` to a slice Go checks if the capacity is reached and allocates more memory for your slice.

It takes some time, if you append to a slice which has reached it's capacity and Go allocates a new bigger slice, copies the values to the new slice and garbage collects the old slice.
Therefore has following rule for handling with capacities:

-   from 0 to 1024 Go doubles the sizes of the current capacity
-   from 1024 to maximum default integer of the target built (32bit or 64bit) increase by 25%

`cap` returns the current capacity of a slice.
Let's see how `append` and `cap` changes:

```go linenums="1"
var x []int
fmt.Println(x, len(x), cap(x))
x = append(x, 1)
fmt.Println(x, len(x), cap(x))
x = append(x, 2)
fmt.Println(x, len(x), cap(x))
x = append(x, 3)
fmt.Println(x, len(x), cap(x))
x = append(x, 4)
fmt.Println(x, len(x), cap(x))
x = append(x, 5)
fmt.Println(x, len(x), cap(x))
```

output:

```
[] 0 0
[1] 1 1
[1 2] 2 2
[1 2 3] 3 4
[1 2 3 4] 4 4
[1 2 3 4 5] 5 8
```

This is just a syntactic sugar, to not care about sizes.
But if you need to make the code more efficient and especially work with big data inside your slices use `make`.

With `make` you create a slice with a defined **length**:

`x := make([]int, 5)`

This creates a slice with an initial **length** of 5.
`x` is **not** `nil` and is already initialized with zero values from index 0 to 4.

If you try to use `append`, because you want to start to fill the slice, it can be a mistake:

```go linenums="1"
x := make([]int, 5)
x = append(x, 1)
```

would append to an initialized slice, which would have 5 int zero values and an appended element:

```
[0, 0, 0, 0, 0, 1]
```

With the `cap` function you can also optionally specify the **capacity** of a slice.

```go linenums="1"
x := make([]int, 5, 10)
```

This would create a slice of length 5 and a capacity of 10.
If you want to initial the slice with append just `make` a slice if the initial length of 0 and a preferred capacity:

```go linenums="1"
x := make([]int, 0, 4)
x = append(x, 1)
x = append(x, 2)
x = append(x, 3, 4)
fmt.Println(x)
```

output:

```
[1 2 3 4]
```

### Slicing

You can use slicing with slices to define a "from" "to" (excluded) range.
If you do not the "from" range `0` will be assumed, as for "to".

```go linenums="1"
x := []int{1, 2, 3, 4}
fmt.Println(x[:2])
fmt.Println(x[1:])
fmt.Println(x[1:2])
fmt.Println(x[:])
```

output:

```
[1 2]
[2 3 4]
[2]
[1 2 3 4]
```

!!! Note

    You will **not** make a copy of a slice, if you use slicing.
    Slicings of a slice share the same memory and can be modified.

Let's see how we modify the sliced slice to the original slice:

```go linenums="1"
x := []int{1, 2, 3, 4}
y := x[:1]
y[0] = 9
fmt.Println(x)
```

output:

```
[9 2 3 4]
```

If you have arrays, you can convert them to a slice by using slicing.

```go linenums="1"
x := [4]int{1, 2, 3, 4}
y := x[:]
y = append(y, 1)
fmt.Println(x)
fmt.Println(y)
```

Output:

```
[1 2 3 4]
[1 2 3 4 1]
```

If you want to `copy` a slice you can use the built-in function.

It copies all values from a source slice into a destination slice, but consider that the parameters are swapped: `copy(destination, source)`.

`copy` is limited to the **length** of the smaller slice (the capacity doesn't matter).

So for example:

```go linenums="1"
x := []int{1, 2, 3, 4}
y := make([]int, 2)
num := copy(x, y)
fmt.Println(num, y)
```

output:

```
2 [1 2]
```

## Maps

Maps are key-value variables.
Maps are not comparable.
Let's see how to declare one:

```go linenums="1"
var myMap map[string]int

fmt.Println(myMap == nil) // -> true
```

If you want to create a map you have several options:

```go linenums="1"
classes := map[string][]string{
    "Class 1": []string{
        "Sarah", "Peter", "Justin",
    },
    "Class 2": []string{
        "Fred", "Ralph", "Lea",
    },
}
```

or use the built-int `make` function.
This will create a 10 length key-value pair map.
But, other than slices, it will have a length of 0.

```go linenums="1"
classes := make(map[string][int], 10)
```

The key of a slice can be a [comparable type](#comparable-types).

Reading and writing to a map is similar to reading and writing to slices:

```go linenums="1"
class1 := "Class 1"
class2 := "Class 2"
classes := map[string][]string{
    class1: []string{
        "Sarah", "Peter", "Justin",
    },
    class2: []string{
        "Fred", "Ralph", "Lea",
    },
}
fmt.Println(classes)
classes[class1] = append(classes[class1], "Christian")
fmt.Println(classes[class1])
```

output:

```
map[Class 1:[Sarah Peter Justin] Class 2:[Fred Ralph Lea]]
[Sarah Peter Justin Christian]
```

If you access a key which is not assigned to the map, it will return the value to that type:

```go linenums="1"
classes := map[string][]string{
    "Class 1": []string{ "Sarah", "Peter", "Justin" },
}
fmt.Println(classes["Not exist"])
fmt.Println(classes["Not exist"] == nil)
```

output:

```
[]
true
```

### variable, ok := idiom

Sometimes you don't want to explicitly check for the zero value like `""` for strings or `0` for numeric values.
There is a syntactic sugar, which helps to do that properly:

```go linenums="1"
example := map[string]int{
    "Hello": 119,
    "World": 312,
}

value, ok := example["Hello"]
fmt.Println(value, ok)

value, ok = example["NotExist"]
fmt.Println(value, ok)
```

output:

```
119 true
0 false
```

If the key is present it will return the value as first return value and a boolean `true` in the second return value.
If the key is not preset it will return the zero value as first return value and a boolean `false` in the second return value.

If you need to delete from maps you can use the built-in `delete` function.
The `delete` function takes a map and the key.
If the key is not present or the map is nil nothing happens.
The delete function does not return any value.

```go linenums="1"
example := map[string]int{
    "Hello": 119,
    "World": 312,
}
delete(example, "Hello")
delete(example, "Test")
```

## Structs

With maps you can define dynamic data, but they have limitations.
All values have to have the same type and you cannot define which keys are public or private.
If you know already what classes are, this is probably what you are searching for: **a struct**

Here is a struct:

```go linenums="1"
type person struct {
    firstName   string
    lastName    string
    age         int
}
```

You can define structs inside or outside functions (respecting the scopes).
If you declared a struct type, you can use it:

```go linenums="1"
var michael person
```

The variable gets the zero value of a struct which the `nil` value.
If you want to initialize a struct use `{}`, this will initialize the struct with zero values for all fields.

```go linenums="1"
var michael = person{
    "Michael",
    "Bykovski",
    28,
}
```

alternatively you can use the field names to make it explicit:

```go linenums="1"
var michael = person{
    firstName:  "Michael",
    lastName:   "Bykovski",
    age:        28,
}
```

Access a struct field by punctuation:

```go linenums="1"
var michael = person{
    firstName:  "Michael",
    lastName:   "Bykovski",
    age:        28,
}
michael.age++
fmt.Println(michael)
```

output:

```
{Michael Bykovski 29}
```

### Anonymous structs

An anonymous struct is a struct without a name.

Let's look at an example:

```go linenums="1"
var person struct {
    firstName   string
    lastName    string
    age         int
}

pet := struct {
    name string
    kind string
} {
    name: "Jukes",
    kind: "cat",
}
```

Anonymous structs are useful if you want to serialize and deserialize data, which is called "marshal" and "unmarshal" in Go.

### Comparing and Converting Structs

If you want to compare structs, Go only compares structs if the fields of a given struct are all [comparable](#comparable-types).
So if you have a list or a map in a struct, it becomes not comparable.

If you want to have a custom compare function, you can write your own method.

If you compare two different **type structs** Go will falsify it.
But you can do a type conversion between two type structs **if they have the same field signatures**.

Let's first look at a successful type conversion but failed comparison.

```go linenums="1"
type firstPet struct {
    name    string
    kind    string
}
type secondPet struct {
    name    string
    kind    string
}

pet := firstPet {
    name: "Jukes",
    kind: "cat",
}

var pet2 secondPet
pet2 = secondPet(pet)
fmt.Println(pet2)
//fmt.Println(pet2 == pet)
```

Type conversion on line 16 would work.
But it would fail on line 18 because `invalid operation: pet2 == pet (mismatched types secondPet and firstPet)`

Now let's look at failed type conversions and therefore failed comparisons.

```go linenums="1"
type firstPet struct {
    name    string
    kind    string
}

// wrong order
type thirdPet struct {
    kind    string
    name    string
}

// wrong name
type fourthPet struct {
    name    string
    race    string
}

// wrong signatures
type fifthPet struct {
    name    string
    kind    string
    age     int
}


pet := firstPet {
    name: "Jukes",
    kind: "cat",
}

var pet3 thirdPet
var pet4 fourthPet
var pet5 fifthPet
pet3 = thirdPet(pet)
pet4 = fourthPet(pet)
pet5 = fifthPet(pet)
```

Cannot type convert to any type, because all field signatures are wrong: 

```
./prog.go:41:17: cannot convert pet (variable of type firstPet) to type thirdPet
./prog.go:42:18: cannot convert pet (variable of type firstPet) to type fourthPet
./prog.go:43:17: cannot convert pet (variable of type firstPet) to type fifthPet
```

Now we look at a successfull type conversion and comparison:

```go linenums="1"
type firstPet struct {
    name    string
    kind    string
}
var anonymousPet struct {
    name    string
    kind    string
}

pet := firstPet {
    name: "Jukes",
    kind: "cat",
}
anonymousPet = pet
fmt.Println(pet, anonymousPet, anonymousPet == pet)
```

output:

```
{Jukes cat} {Jukes cat} true
```

