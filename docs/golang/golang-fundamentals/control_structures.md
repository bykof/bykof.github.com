# Control Structures

We studied the grammar, primitive types and composite types.
Now we are able to work with variables, but they are nothing without "algorithms" (without control structures).
Let's dive in and see how we do what in Go.

## Blocks

Blocks define the scope of constants, variables, functions and types.
Therefore there are several blocks, where one of these can exist.

There is a `package`, `file`, `function`, and `{}` block.

-   All constants, variables, functions and types declared outside of a function are in a `package block`.
-   All `imported` constants, variables, functions and types are called `file block`.
-   All constants, variables, functions and types (parameters included) declared in a function are in a `function block`.
-   All constants, variables, functions and types declared in curly braces **in** a function are in a `{} block`.

## Shadowing variables

Shadowing variables is setting the variable value shortly in a `{}`block inside of a function block.
It only works if you use the same name of the "shadow" variable.

Here is an example:

```go linenums="1"
func main() {
    x := 20
    if x > 0 {
        fmt.Println(x)
        x := 5
        fmt.Println(x)
    }
    fmt.Println(x)
}
```

the output is:

```
20
5
20
```

That's why it is so problematic to use `:=`, we can shadow variables in inner scopes of a function, which makes it harder to really define, which value a variable has.

!!! danger

    You can shadow imported package names.
    This can break your scope and you should never ever do this:

    ```go linenums="1"
    package main

    import (
        "fmt"
    )

    func main() {
        x := "Hello World"
        fmt := 20
        fmt.Println(x)
    }
    ```

    will output:

    ```
    ./prog.go:10:6: fmt.Println undefined (type int has no field or method Println)
    ```

### Universe Block

Golang has only 25 keywords (var, for, switch).
Types (int, string), Constants (true, false) and Functions(make, close) are not included in the keyword list.

They were defined in a `universe block`. This is the most outside block.
Because they are defined in the most outside block, they can be shadowed.

!!! danger

    ```go linenums="1"
    package main

    import (
        "fmt"
    )

    func main() {
        fmt.Println(true)
        true := 12
        fmt.Println(true)
    }
    ```

    `true` will be shadowed and can result in big misbehaviour of the code.

## If

If is actually pretty easy and works in the same way as in other programming languages.

```go linenums="1"
n := 12
if n == 0 {
    fmt.Println("N is 0")
} else if n > 0 {
    fmt.Println("N is bigger than 0")
} else {
    fmt.Println("N is lower than 0")
}
```

### Scoping variables in if statements

If you want to declare a variable while checking for it's value you can declare a variable directly in an if statement.
Variables defined as a scoped variable only exist in the defined scope.

```go linenums="1"
if n := 12; n == 0 {
    fmt.Println("N is 0")
} else if n > 0 {
    fmt.Println("N is bigger than 0")
} else {
    fmt.Println("N is lower than 0")
}
```

## For

There is only one looping keywod called `for`.
With for you can define 4 different formats in Go:

-   C-style for
-   Condition for
-   Infinite for
-   for-range

### C-style for

This is probably known to you.
The only thing to mention is that you can't use `var` keyword to define i.

```go linenumes="1"
for i := 0; i < 10; i++ {
    fmt.Println(i)
}
```

### Condition for

Go has the ability to run a go loop forever until a certain variable because `false`.
This pattern is known as `while` loops in other programming languages:

```go linenumes="1"
i := 1
for i < 10 {
    i++
    fmt.Println(i)
}
```

### Infinite for

The infinite for works the same way as for the condition for, you just have to leave the condition.
This would force the for loop to run forever.

```go linenums="1"
for {
    fmt.Println("Run forever")
}
```

### break and continue

`break` helps you to stop a for loop.
`continue` helps you to skip the rest of the scope and start a new loop

```go linenums="1"
for {
    ...
    if !condition {
        break
    }
}
```

```go linenums="1"
for {
    ...
    if !condition {
        ...
        continue
    }

    fmt.Println("This is skipped when condition is false")
}
```

### for-range

`for-range` loops are designed to make a foreach loop in Go.
You can use strings, arrays, slices and maps with foreach loops.
Later on we will talk about `Channels` wher for-range loops can be handy too.

```go linenums="1"
values := []int{1, 3, 5, 7, 9}
for i, v := range values {
    fmt.Println(i, v)
}
```

output:

```
0 1
1 3
2 5
3 7
4 9
```

In a for-range loop you always get two variables.
The first one is the index (strings, arrays, slices) or key (maps).
The second one is the actual value.

If you don't need the key or value in a for-range loop, you can use `_` to let Go know, that it should ignore this variable.

```go linenums="1"
values := []int{1, 3, 5, 7, 9}
for _, v := range values {
    fmt.Println(v)
}
```

output:

```
1
3
5
7
9
```

If you just want the key, you can use the first variable and leave the second not declared.

```go linenums="1"
values := []int{1, 3, 5, 7, 9}
for i := range values {
    fmt.Println(i)
}
```

### for-range variables are copies

Go iterates over copies of your variable.
Therefore modifying the for-range variables directly is useless.
You have to overwrite outer scopes variables:

```go linenums="1"
values := []int{1, 3, 5, 7, 9}
	for _, v := range values {
		v++
		fmt.Println(v)
	}
	fmt.Println(values)

	for i := range values {
		values[i]++
		fmt.Println(values[i])
	}
	fmt.Println(values)
```

output:

```
2
4
6
8
10
[1 3 5 7 9]
2
4
6
8
10
[2 4 6 8 10]
```

### Labeling for statements

You can `break` or `continue` in for loops by using `labels`.
This example continues the outer for loop.
You will find labeled for loops very rare in the Go ecosystem.

```go linenumes="1"
func main() {
    values := []string{"hello", "world"}

outer:
    for _, value := range values {
        for i, r := range value {
            fmt.Println(i, r, string(r))

            if r == 'l' {
                continue outer
            }
        }

        fmt.Println("\n")
    }
}
```

output:

```
0 104 h
1 101 e
2 108 l
0 119 w
1 111 o
2 114 r
3 108 l
```

## switch

Switch statements in Go are veryuseful though in other languages they are more avoided.

Let's see an example:

```go linenums="1"
words := []string{"a", "hello", "gopher", "go", "github", "javascript"}

for _, word := range words {
    switch size := len(word); size {
    case 1, 2, 3, 4:
        fmt.Println(word, "is less than 5 characters long")
    case 5:
        fmt.Println(word, "is 5 characters long")
    case 6, 7, 8, 9:
    default:
        fmt.Println(word, "is more than 5 characters long")
    }
}
```

output:

```
a is less than 5 characters long
hello is 5 characters long
go is less than 5 characters long
javascript is more than 5 characters long
```

### Duplicate cases

You cannot define multiple cases:

```go linenums="1"
for _, word := range words {
		switch size := len(word); size {
		case 1, 2, 3, 4:
			fmt.Println(word, "is less than 5 characters long")
		case 1:
			fmt.Println(word, "")
        }
}
```

### Break switch in for loop

Something you have to break a for loop.
But `break` inside a switch would result in breaking the switch scope and not the for loop.
In that case you can use labels to break explicitly the loop.

```go linenums="1"
func main () {
    for i := 0; i < 10; i++ {
        switch {
            case i%2 == 0:
                fmt.Println(i, "is even")
            case i%3 == 0:
                fmt.Println(i, "is divisible by 3")
            case i%7 == 0:
                fmt.Println("exit")
                break
            default:
                fmt.Println("don't know what to do")
        }
    }
}
```

output:

```
0 is even
don't know what to do
2 is even
3 is divisible by 3
4 is even
don't know what to do
6 is even
exit
8 is even
9 is divisible by 3
```

We can fix that by using labeled for loops:

```go linenums="1"
func main () {
outer:
    for i := 0; i < 10; i++ {
        switch {
            case i%2 == 0:
                fmt.Println(i, "is even")
            case i%3 == 0:
                fmt.Println(i, "is divisible by 3")
            case i%7 == 0:
                fmt.Println("exit")
                break outer
            default:
                fmt.Println("don't know what to do")
        }
    }
}
```

output:

```
0 is even
don't know what to do
2 is even
3 is divisible by 3
4 is even
don't know what to do
6 is even
exit
```

## Blank Switches

You can use a variable to switch on the value of it or use a blank switch to switch for boolean expression:

```go linenums="1"
n := 2

switch n {
    case 2:
        fmt.Println("n is two")
    default:
        fmt.Println("n is not two")
}
```

```go linenums="1"
n := 2

switch {
    case n == 2:
        fmt.Println("n is two")
    default:
        fmt.Println("n is not two")
}
```

Surely the first one is more explicit.

## goto

Go has the support to use `goto` statements.
You will probably never use goto, but I will show an example here anyway:

```go linenums="1"
func main() {
    a := 10
    goto skip
    b := 20 

skip:
    c := 30 
    fmt.Println(a, b, c)

    if c > a {
        goto inner
    }

    if a < b {
    inner:
        fmt.Println("a is less than b")
    }
}
```

output:

```
./prog.go:9:10: goto skip jumps over declaration of b at ./prog.go:10:7
./prog.go:18:14: goto inner jumps into block starting at ./prog.go:21:14
```

