# Numbers and Strings

## Area of sphere

```go linenums="1" title="main.go"
package main

import (
	"fmt"
)

/*
    Task:
        Calculate the area of a sphere.
        Hint: The area of a sphere is: 4πr²

    Output:
        radius: 10 = area: 1256.64
*/
func main() {
    pi := 3.14159
	radius := 10
    var area float64


    // Your code goes here
	fmt.Printf("radius: %d = area: %.2f\n", radius, area)
}
```

## Read Arguments

```go linenums="1" title="main.go"
package main

import (
	"fmt"
    "os"
)

/*
    Task:
        Read first two arguments and print them
        Check: https://pkg.go.dev/os#pkg-variables
        
        os.Args[1] is the first argument

        Hint:
        Try first "go run" and then "go build"


    Output:
        one two
*/
func main() {
    // Your code goes here
}
```

## Slicing

```go linenums="1" title="main.go"
package main

/*
    Task:
        Take "hello" and "programming" and print out just the 
        half (round to floor) of the word length by using slicing

    Output:
       he
	   wo
*/

func main() {
	hello := "hello"
	programming := "programming"

	// Your code goes here
}
```
