# Functions

Functions are defined with the `func` keyword, then the function name, input parameters and their types and the return types.

```go linenums="1"
func sum(a int, b int) int {
    return a + b
}
```

There can be also functions without parameters and return types like the main function:

```go linenums="1"
func main() {
    fmt.Println("Hello World")
}
```

## Names and Optional Parameters

Go doesn't have named and optional parameters.
If you want to simulate such a feature, you have create a struct for that.

```go linenums="1"
type Options struct {
    a   int
    b   int
}

func sum(options Options) int {
    return options.a + options.b
}

func main() {
    fmt.Println(sum(Options{a: 1}))
    fmt.Println(sum(Options{b: 2}))
    fmt.Println(sum(Options{a: 1, b: 2}))
}
```

output:

```
1
2
3
```

## Variadic Input Parameters and Slices

Go supports variadic parametes. Which means, that you can pass an undefined number of parameters of the same type into a function and it will be stored as a slice of the specified parameter type.
Let's have a look at variadic functions:

```go linenums="1"
func sum(values ...int) int {
    var result int
    for _, value := range values {
        result += value
    }
    return result
}
```

## Multiple Return Values

Go allows multiple return values. It works nearly the same way as in Python.

Let's check an example:

```go linenums="1"
func divAndRemainder(numerator int, denominator int) (int, int, error) {
    if denominator == 0 {
        return 0, 0, errors.New("cannot divide by zero")
    }

    return numerator / denominator, numerator % denominator, nil
}

func main () {
    result, remainder, err := divAndRemainder(7, 4)
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }
    fmt.Println(result, remainder)
}
```

!!! danger

    You **cannot** assign multiple return values to one variable.

    ```go linenums="1"
    func divAndRemainder(numerator int, denominator int) (int, int, error) {
        if denominator == 0 {
            return 0, 0, errors.New("cannot divide by zero")
        }

        return numerator / denominator, numerator % denominator, nil
    }

    func main () {
        results := divAndRemainder(7, 4)
    }
    ```

    output:

    ```
    ./prog.go:18:13: assignment mismatch: 1 variable but divAndRemainder returns 3 values
    ```

### Ignoring Return Values

Surely you can use `_` to ignore are value as in variable declarations:

```go linenums="1"
func divAndRemainder(numerator int, denominator int) (int, int, error) {
    if denominator == 0 {
        return 0, 0, errors.New("cannot divide by zero")
    }

    return numerator / denominator, numerator % denominator, nil
}

func main () {
    result, _, err := divAndRemainder(7, 4)
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }
    fmt.Println(result)
}
```

## Named Return Values

You can use named return values to predeclare variables, which can be used inside of the function to return them later.
Those variables will be initialized with zero values, therefore you can return them directly without overwriting the value.

Let's check an example:

```go linenums="1"
func divAndRemainder(numerator int, denominator int) (result int, remainder int, err error) {
    if denominator == 0 {
        err = errors.New("cannot divide by zero")
        return result, remainder, err
    }

    result = numerator / denominator
    remainder = numerator % denominator
    return result, remainder, err
}

func main () {
    result, _, err := divAndRemainder(7, 4)
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }
    fmt.Println(result)
}
```

You don't have to return the specified named return values but be careful.
If you specified named return values, then you can use `return`, but you should never ever do this.

## Functions are values

As in other languages functions are values.
Therefore you can store functions in variables and work with them.

```go linenums="1"
package main

import (
	"fmt"
	"strconv"
)

func add(i int, j int) int {
	return i + j
}
func sub(i int, j int) int {
	return i - j
}
func mult(i int, j int) int {
	return i * j
}
func div(i int, j int) int {
	return i / j
}

var operatorMap = map[string]func(int, int) int{
	"+": add,
	"-": sub,
	"*": mult,
	"/": div,
}

func main() {
	operations := [][]string{{"2", "+", "4"}, {"43", "-", "17"}}
	for _, operation := range operations {
		n1, err := strconv.Atoi(operation[0])
		if err != nil {
			fmt.Println(err)
			continue
		}

		operatorFunc, ok := operatorMap[operation[1]]
		if !ok {
			fmt.Println("unsupported operator: ", operation[1])
			continue
		}

		n2, err := strconv.Atoi(operation[2])

		if err != nil {
			fmt.Println(err)
			continue
		}

		result := operatorFunc(n1, n2)
		fmt.Println(result)
	}
}
```

output:

```
6
26
```

## Function Type Declarations

As we see in [Functions are values](#functions-are-values) you can use functions in variables.
But to use a function as variable you have to define the type of the function.
In Go you can define a function as type.
Let's look at the following example:

```go linenums="1"
type operatorFunction func(int, int) int

var operatorMap = map[string]operatorFunction {
	"+": add,
	"-": sub,
	"*": mult,
	"/": div,
}
```

## Anonymous functions

Anonymous functions can be declared right in the middle of you code.
You can declare and call the function directly.
Let's face an example:

```go linenums="1"
func main() {
    a := 1
    b := 3
    sum := func (a int, b int) int {
        return a + b
    }(a, b)
    fmt.Println(sum)
}
```

### Passing Functions as Parameters

Anonymous functions can be passed as parameters.
The interesting thing is here, that those `functions inside of a function` create a `closure`.
Which means, that the inner anonymous function can access and modify variables in the outer function.
Let's see an example:

```go linenums="1"
type Cat struct {
    Name   string
    Age    int
}

cats := []Cat{
    {"Mitsu", 2},
    {"Yuki", 1},
    {"Fred", 12},
    {"Bob", 8},
}

fmt.Println(cats)

sort.Slice(cats, func (i int, j int) bool {
    return cats[i].Age < cats[j].Age
})

fmt.Println(cats)
```

output:

```
[{Mitsu 2} {Yuki 1} {Fred 12} {Bob 8}]
[{Yuki 1} {Mitsu 2} {Bob 8} {Fred 12}]
```

## defer

Since Go has no try-catch-finally keywords, we need some kind of functionality, to "cleanup" things or to run commands, even when everything breaks.
In Go you use defer and pass a function **call**:

```go linenums="1"
import (
	"fmt"
)

func main() {
	defer func() {
		fmt.Println("Closing")
	}()

	a := 1
	b := 2
	fmt.Println("Sum is: ", a+b)
}
```

Most of the time, you will use defer cleanup open sockets, file handlers or similar.

Since defer can be a anonymous function, you can use it to read or set variables after the outer function has been executed.

```go linenums="1"
import (
	"fmt"
)

func outer(a int, b int) (result int) {
	defer func() {
		a = 10
		result = a + b
		fmt.Println("Closing function")
	}()
	return result
}

func main() {
	result := outer(1, 2)
	fmt.Println("Sum is: ", result)
}
```

output would be:

```
Closing function
Sum is:  12
```

There is a pattern in Go, which you will find quiet often.
A function that allocates a resource and returns a "cleanup" function, to free the resource again:

```go linenums="1"
func getFile(name string) (*os.File, func(), error) {
    file, err := os.Open(name)
    if err != nil {
        return nil, nil, err
    }

    return file, func() {
        file.Close()
    }, nil
}

f, closer, err := getFile(os.Args[1])
if err != nil {
    log.Fatal(err)
}
defer closer()
```

## Go is Call by Value

Go is call by value.
If you pass a variable into a function and modify it within the function it will modify a `copied` value and not the passed in value itself.
Let's check:

```go linenums="1"
type person struct {
	age  int
	name string
}

func modify(number int, value string, person person) {
	number = 123
	value = "Blah"
	person.name = "Test"
}

func main() {
	number := 321
	value := "Test"
	person := person{
		age:  28,
		name: "Michael",
	}
	fmt.Println(number, value, person)
	modify(number, value, person)
	fmt.Println(number, value, person)
}
```
