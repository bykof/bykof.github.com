# Errors

Handling errors in Go can lead to a strange feeling, the concepts in Go are pretty well-thought.
A lot of programmers might

## Handling Errors

If a programm calculates an error or comes in an error state, the specific function should return an error.
It is absolute convention to return the error as last return value and let it nil, if there is no error.
Use the package `errors` to create new errors or wrap them.

```go linenums="1"
import (
	"errors"
	"fmt"
)

func divide(dividend float64, divisor float64) (float64, error) {
	if divisor == 0 {
		return 0, errors.New("divisor is 0")
	}
	return dividend / divisor, nil
}

func main() {
	result, err := divide(12, 0)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(result)
}
```

### The error interface

`error` is a built-in interface which is quiet simple ([link](https://pkg.go.dev/builtin#error)):

```go linenums="1"
type error interface {
    Error() string
}
```

That's why we can return `nil` for an error, because it's an interface type.

## Simple Errors: Strings

In Go you can create errors with two built-in libraries: `error` and `fmt`.

Here is an example:

```go linenums="1"
import "errors"

func divide(dividend float64, divisor float64) (float64, error) {
	if divisor == 0 {
		return 0, errors.New("divisor is 0")
	}
	return dividend / divisor, nil
}
```

or if you need some data in the error string:

```go linenums="1"
import "fmt"

func divide(dividend float64, divisor float64) (float64, error) {
	if divisor == 0 {
		return 0, fmt.Errorf("divisor is %d", divisor)
	}
	return dividend / divisor, nil
}
```

## Sentinel Errors

Sentinel Errors are constants defined for a whole package (we will talk about packages later).
It's convention to start the name with `Err`.

Let's see an example:

```go linenums="1"
type CustomError string

func (ce CustomerError) Error() string {
    return string(ce)
}

const (
    ErrFileNotFound CustomError("File was not found")
    ErrFileCorrupted CustomError("File is corrupted")
)
```

## Errors with data

Since `error` is an interface, you can create your own struct to hold more data than just a string.

Let's look at following example:

```go linenums="1"
type Status int

const (
    InvalidLogin Status = iota + 1
    NotFound
)

type StatusError struct {
    Status  Status
    Message string
}

func (se StatusError) Error() string {
    return se.Message
}

func 
```
