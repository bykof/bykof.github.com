# Starter

## Print Names

```go title="main.go"
package main

/*
    Task:

    1. Print Your Name

    Output:

    Your Name

*/

func main() {
}
```

## Print Hexadecimal

```go linenums="1" title="main.go"
package main

import "fmt"
/*
    Task:

    1. Print 0 to 15 as hexadecimal integer
    2. Print 19, 54, 99 as hexadecimal integer

    Output:

    0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
    19 54 99

*/
func main() {
}
```

## Zero Values

```go linenums="1" title="main.go"
package main

import "fmt"

/*
    Task:
        Print out the given variables and guess the zero values

    Output:
        Zero Values of the variables
*/
func main() {
	var i int
	var f float64
	var b bool
	var s string

    // Your code goes here
}
```

## Multiple Declarations

```go linenums="1" title="main.go"
package main
/*
    Task:
        Swap the values of the variables in one line

    Output:
        Die Hard Harry Potter
*/
func main() {
    movie := "Harry Potter"
    movie2 := "Die Hard"
    // Your code goes here
    fmt.Println(movie, movie2)
}
```

## Variable and Constant Declarations

```go linenums="1" title="main.go"
package main
/*
    Task:
        Declare and Initialize all possible variable and constant formats

    Output:
        Harry Potter Die Hard The Batman Dune The Godfather
*/
func main() {

    // Your code goes here
    fmt.Println(movie, movie2, movie3, movie4, movie5)
}
```

## Explicit Type Conversion

```go linenums="1" title="main.go"
package main

import "fmt"

/*
	Task:
		Take the first letter of text and save it as a rune into letter variable
		Take the letter and save it as an int into number variable
		Take the number variable and save it as a float64 into floatingPoint variable

	Output:
		abc 97 97 97
*/

func main() {
	text := "abc"
	// Your code goes here
	fmt.Println(text, letter, number, floatingPoint)

}
```

```go linenums="1" title="main.go"
package main

import "fmt"

/*
	Task:
        Type Convert the byte slice into a string and print it out

*/

func main() {
	bytes := []byte{
		0x47,
		0x6F,
		0x20,
		0x69,
		0x73,
		0x20,
		0x63,
		0x6F,
		0x6F,
		0x6C,
	}
}
```
