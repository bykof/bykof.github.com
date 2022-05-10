# Control Structures

## Search for a string

```go linenums="1" title="main.go"
package main

import "fmt"


/*
    Task:
        Pass an argument into your application and search for a movie (case insensitive, substring):

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
    Task:
        Use strings.ToLower and string.ToUpper with a switch and arguments

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
   Task:
    Display a endless rotating tick

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

## Sorting

```go linenums="1" title="main.go"
package main

import (
	"fmt"
	"sort"
)

/*
    Task:
        Sort Authors by different values

    Output:
        [{Cina 634 102} {Mina 304 1098} {Mohit 300 104} {Rina 10 108} {Riya 4 101} {Rohit 56 107} {Sina 234 103} {Sohit 20 110} {Tina 104 105} {Vina 237 106}]
        [{Riya 4 101} {Cina 634 102} {Sina 234 103} {Mohit 300 104} {Tina 104 105} {Vina 237 106} {Rohit 56 107} {Rina 10 108} {Sohit 20 110} {Mina 304 1098}]
        [{Riya 4 101} {Rina 10 108} {Sohit 20 110} {Rohit 56 107} {Tina 104 105} {Sina 234 103} {Vina 237 106} {Mohit 300 104} {Mina 304 1098} {Cina 634 102}]



*/
func main() {
	authors := []struct {
        name    string
        articles int
        id      int
    }{
        {"Mina", 304, 1098},
        {"Cina", 634, 102},
        {"Tina", 104, 105},
        {"Rina", 10, 108},
        {"Sina", 234, 103},
        {"Vina", 237, 106},
        {"Rohit", 56, 107},
        {"Mohit", 300, 104},
        {"Riya", 4, 101},
        {"Sohit", 20, 110},
    }
	// Your code goes here
}
```

## Endless Input

```go linenums="1" title="main.go"
package main

import (
	"bufio"
	"fmt"
	"os"
)

/*
    Task:
        Make a program where you input a line and the line gets printed inverted

    Hint:
        https://pkg.go.dev/bufio#example-Scanner-Lines

    Output:
        > Test
        tseT
        > Hello World
        dlroW olleH



*/
func main() {
	// Your code goes here
}
```
