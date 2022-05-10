# Types, Interfaces and Methods

## Implement the Interface

```go linenums="1" title="main.go"
package main

/*
    Task:
        Implement two structs which implement the Shaper interface: Rectangle and Circle
        Print out some examples.

    Hint:
        Area of a circle:
            PI * radius * radius
        Perimeter of a circle:
            2 * PI * radius

        Area of a rectangle:
            a * b
        Perimeter of an Area:
            2 * (a + b)
*/

type Shaper interface {
    Area() float64
    Perimeter() float64
}

func main() {
	// Your code goes here
}
```

## Modify the Values

```go linenums="1" title="main.go"
package main

/*
    Task:
        Create a method for the struct Person, which changes the LastName of it's current struct.
        Create another method for the struct Person, to change the LastName of a copy of the struct and return the changed value
        Create another method for the struct Person, to print out FullName() string

*/

type Person struct {
    FirstName string
    LastName  string
}

func main() {
	// Your code goes here
}
```

## Embedding

```go linenums="1" title="main.go"
package main

/*
    Task:
        Create three structs:
            1. Employee
            2. Developer
            3. Manager

        An Employee has the following fields:
            - ID                int64
            - FirstName         string
            - LastName          string
            - Birthday          time.Time
            - StartedAtCompany  time.Time

        A Developer embeds an employee struct and has the following fields:
            - DeveloperType     string (frontend, backend, full stack)

        A Manager embeds an employee struct and has the following fields:
            - Department        string (IT, HR)

        Output:
            Michael Bykovski
            Michael Bykovski Full Stack
            Peter Lustig
            Peter Lustig IT
*/

type DetailStringer interface {
    fmt.Stringer
    DetailedString() string
}

// Your code goes here

func main() {
	// Your code goes here
    var _ DetailStringer = &Developer{}
	var _ DetailStringer = &Manager{}

	fmt.Println(developer.String())
	fmt.Println(developer.DetailedString())

	fmt.Println(manager.String())
	fmt.Println(manager.DetailedString())
}
```
