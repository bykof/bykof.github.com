# Control Structures

## Search for a string

```go linenums="1" title="main.go"
package main

import "fmt"


/*
    Task: Pass an argument into your application and search for a movie (case insensitive, substring):

        +------------------------------------------+------+-------+
        |                   name                   | year | score |
        +------------------------------------------+------+-------+
        | The Batman                               | 2022 |     8 |
        | Dune                                     | 2021 |   8.1 |
        | The Godfather                            | 1972 |   9.2 |
        | Harry Potter and the Philosopher's Stone | 2001 |   7.6 |
        +------------------------------------------+------+-------+

    Hint:
        Use the "strings" library: https://pkg.go.dev/strings

    Output:
        ./main ba
        will output:
            - The Batman(2022) Score: 8

        ./main a
        will output:
            - The Batman(2022) Score: 8
            - The Godfather(1972) Score: 9.2
            - Harry Potter and the Philosopher's Stone(2001) Score: 7.6

*/
func main() {
    // Your code goes here
}
```

## Programm Flow

```go linenums="1" title="main.go"
package main

import "fmt"


/*
    Task: Use strings.ToLower and string.ToUpper with a switch and arguments

    Output:
        go build main.go

        ./main [command] [input]

        ./main upper hello
        -> HELLO

        ./main lower HellO
        -> hello
*/
func main() {

    // Your code goes here
}
```

## Random Counts

```go linenums="1" title="main.go"
package main

import (
	"fmt"
	"time"
)

/*
   Task: Display a endless rotating tick

   Hint:
   Use the same line of console by printing "\r" at the start of a line
   Use time.Sleep(100 * time.Millisecond) to sleep to 100 milliseconds

   Output:
   \
   |
   /
   -
   \
   ...

*/
func main() {
	chars := "\\|/-"
	// Your code goes here
}
```
