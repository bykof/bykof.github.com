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
Please mark, that you always return `error` type and do not specifiy a specific type `StatusError` because this would minimize abstraction.

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

func Login(username string, password string) User, error {
	loginService := LoginService{}
	userService := UserService{}
	id, err := loginService.login(username, password)
	if err != nil {
		return User{}, StatusError{
			Status: InvalidLogin,
			Message: err.Error(),
		}
	}

	user, err := userService.User(id)
	if err != nil {
		return User{}, StatusError{
			Status: NotFound,
			Message: err.Error(),
		}
	}

	return user, nil
}
```

## Wrapping Errors

Sometimes you want to add additional information to an error, for example the location where the error happened.
There is a builtin function called `fmt.Errorf` with the special verb `%w` to add an error into an error string.

With another built-in library you can 'unwrap' the error from another one.
It's called `errors.Unwrap`.
It will return an `error` if it unwraps an error, otherwise `nil`.

Let's see an example:

```go linenums="1"
package main

import (
	"errors"
	"fmt"
	"os"
)

func fileChecker(name string) error {
	f, err := os.Open(name)
	if err != nil {
		return fmt.Errorf("in fileChecker: %w", err)
	}
	f.Close()
	return nil
}

func main() {
	err := fileChecker("doesNotExist.txt")
	if err != nil {
		fmt.Println(err)
		if wrappedErr := errors.Unwrap(err); wrappedErr != nil {
			fmt.Println(wrappedErr)
		}
	}
}
```

output:

```
in fileChecker: open doesNotExist.txt: no such file or directory
open doesNotExist.txt: no such file or directory
```

## Error Is, Error As

Multiple Wrapped Errors "hide" the errors they wrapped.
There is a solution to check, if an error variable wrapped another error.

Let's use our fileChecker example again:

```go linenums="1"
package main

import (
	"errors"
	"fmt"
	"os"
)

func fileChecker(name string) error {
	f, err := os.Open(name)
	if err != nil {
		return fmt.Errorf("in fileChecker: %w", err)
	}
	f.Close()
	return nil
}

func main() {
	err := fileChecker("doesNotExist.txt")
	if err != nil {
		fmt.Println(err)
		if errors.Is(err, os.ErrNotExist) {
			fmt.Println("The file does not exist")
		}
	}
}
```

With `errors.As` you can check, if an `error` has a custom error type:

```go linenums="1"
package main

import (
	"errors"
	"fmt"
	"os"
)

type FileCheckerError struct {
	name string
	err  error
}

func (fce FileCheckerError) Error() string {
	return fmt.Sprintf("FileCheckerError %s: %s", fce.name, fce.err)
}

func fileChecker(name string) error {
	f, err := os.Open(name)
	if err != nil {
		return FileCheckerError{
			name: name,
			err:  err,
		}
	}
	f.Close()
	return nil
}

func main() {
	err := fileChecker("doesNotExist.txt")
	if err != nil {
		var fileCheckerError FileCheckerError
		if errors.As(err, &fileCheckerError) {
			fmt.Println(fileCheckerError)
		} else {
			fmt.Println(err)
		}
	}
}
```

output:

```
FileCheckerError doesNotExist.txt: open doesNotExist.txt: no such file or directory
```

## panic and recover

Go programms run into panic when there is a state, where the Go programm does not know how to handle it.
For example if the programm runs out of memory or if you accessed a slice past it's index.

Let's check an example:

```go linenums="1"
func doPanic(msg string) {
	panic(msg)
}

func main() {
	doPanic("What is happening?")
}
```

output:

```
panic: What is happening?

goroutine 1 [running]:
main.doPanic(...)
	/tmp/sandbox1809318792/prog.go:4
main.main()
	/tmp/sandbox1809318792/prog.go:8 +0x34

Program exited.
```

You can `recover` from a panic.
Call `recover` in a defer function, if recover returns the value of the given panic value, then you can handle the panic and the programm proceeds normaly:

```go linenums="1"

func div60(i int) {
	defer func() {
		if v := recover(); v != nil {
			fmt.Println(v)
		}
	}()
	fmt.Println(60 / i)
}

func main() {
	for _, val := range []int{1, 2, 0, 6} {
		div60(val)
	}
}
```

output is:

```
60
30
runtime error: integer divide by zero
10
```

Panic and Recover look like exception handling, but they are not.
A panic indicates a really problematical state and should'nt be abused.
Therefore use panic and especially recover if you really know what you are doing!

## Stacktrace from Errors

Sometimes you want to see, where your error happened.
For that you can just print out the error with the verb `%+v`.

Here is an example:

```go linenums="1"
func divide(dividend float64, divisor float64) (float64, error) {
	if divisor == 0 {
		return 0, fmt.Errorf("divisor is %d", divisor)
	}
	return dividend / divisor, nil
}

func main() {
	err := divide(10, 0)
	if err != nil {
		fmt.Printf("%+v", err)
	}
}
```

the output would be:

```
./prog.go:13:9: assignment mismatch: 1 variable but divide returns 2 values
```
