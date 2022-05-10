# Composite Types

## Slices and Arrays

```go linenums="1" title="main.go"
package main

import "fmt"


/*
    Task: Create an int array and a string slice.

    Int array is:
        - sizes[0] = 180
        - sizes[1] = 174
        - sizes[2] = 167
        - sizes[3] = 162

    String array is:
        - shirtSizes[0] = "XS"
        - shirtSizes[1] = "S"
        - shirtSizes[2] = "M"
        - shirtSizes[3] = "L"
        - shirtSizes[4] = "XL"

    Print out the the int array with index 2 and the string array with index 3

    Output:
        167 L
*/
func main() {
    // Your code goes here
}
```

## Maps

```go linenums="1" title="main.go"
package main

import "fmt"


/*
    Task: Create a map and save the following values:

        - The Batman: 2022
        - Dune: 2021
        - The Godfather: 1972
        - Harry Potter and the Philisopher's Stone: 2002

    Overwrite "Harry Potter and the Philisopher's Stone" with the correct year 2001
    Print out all values.

    Output:
        - The Batman: 2022
        - Dune: 2021
        - The Godfather: 1972
        - Harry Potter and the Philisopher's Stone: 2001

*/
func main() {
    // Your code goes here
}
```

```go linenums="1" title="main.go"
package main

import "fmt"


/*
    Task:
        Access the map with an existing and non existing key using the variable, ok := idiom
        Print out the variables.

    Output:
        29 true
        0 false
*/
func main() {
    ages := map[string]int{
		"Sarah": 29,
		"Tom":   24,
	}
    // Your code goes here
}
```

## Structs

```go linenums="1" title="main.go"
package main

import "fmt"


/*
    Task: Create a struct slice and save the following values:

        +------------------------------------------+------+-------+
        |                   name                   | year | score |
        +------------------------------------------+------+-------+
        | The Batman                               | 2022 |     8 |
        | Dune                                     | 2021 |   8.1 |
        | The Godfather                            | 1972 |   9.2 |
        | Harry Potter and the Philosopher's Stone | 2001 |   7.6 |
        +------------------------------------------+------+-------+

    Output:
        - The Batman(2022) Score: 8
        - Dune(2021) Score: 8.1
        - The Godfather(1972) Score: 9.2
        - Harry Potter and the Philisopher's Stone(2001) Score: 7.6

*/
func main() {
    // Your code goes here
}
```
