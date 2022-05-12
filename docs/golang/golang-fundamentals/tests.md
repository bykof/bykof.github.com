# Tests

Tests are important.
Tests check, if you application works as expected.
Tests in Go are so easy, it's easier to write tests than not to do it.

Normally you will not see any logs from tests, unles you set the `-v` (verbose) flag.

Tests are executed automatically when you name your files `*_test.go`.

Let's dive in with an easy example:

```go linenums="1" title="calculator.go"
func add(a, b int) int {
    return a + b
}
```

```go linenums="1" title="calculator_test.go"
func Test_add(t *testing.T) {
    result := add(1, 2)
    expected := 2
    if result != expected {
        t.Error("not correct, expected", expected, " got", result)
    }
}
```

If you run `go test ./...` the output is:

```
?       example   [no test files]
--- FAIL: Test_add (0.00s)
    calculator_test.go:9: not correct, expected 2 got 3
FAIL
FAIL    example/calculator        0.153s
FAIL
```

Let's fix the test:

```go linenums="1" title="calculator_test.go"
func Test_add(t *testing.T) {
    result := add(1, 2)
    expected := 3
    if result != expected {
        t.Error("not correct, expected", expected, " got", result)
    }
}
```

Now the tests are running properly:

```
?       example   [no test files]
ok      example/calculator        0.154s
```

## Setup and Teardown

To setup a test use a function called `TestMain`.
To teardown a tests files and data use `t.Cleanup(func() { ... })`.

```go linenums="1" title="calculator_test.go"
func TestMain(m *testing.M) {
	fmt.Println("Setting up...")
	fmt.Println("Running tests...")
	exitValue := m.Run()
	fmt.Println("Clean up all tests...")
	os.Exit(exitValue)
}

func Test_add(t *testing.T) {
    result := add(1, 2)
    expected := 3
    if result != expected {
        t.Error("not correct, expected", expected, " got", result)
    }

    t.Cleanup(func() {
        fmt.Println("Teardown test")
    })
}
```

By running the tests with:

```sh
go test ./... -v
```

the output is:

```
?       reader_writer   [no test files]
Setting up...
Running tests...
=== RUN   Test_add
Teardown add test
--- PASS: Test_add (0.00s)
PASS
Clean up all tests...
ok      reader_writer/calculator        0.152s
```

## Public API Testing

If you want to test your public exposed functions or methods you can create a "\*\_test" package.
This will, by definition, create a new package, which can only access exported functions and methods.

Let's check that:

```go linenums="1" title="calculator/calculator.go"
func Add(a int, b int) int {
    return a + b
}
```

```go linenums="1" title="calculator/calculator_test/calculator_test.go"
package calculator

import (
	"testing"

	"example/calculator"
)

func Test_Add(t *testing.T) {
	result := calculator.Add(1, 2)
	expected := 3
	if result != expected {
		t.Error("not correct, expected", expected, " got", result)
	}
}
```

## Testify

In a lot of projects you will see the package [`github.com/stretchr/testify/assert`](https://github.com/stretchr/testify/assert).
This is because it brings a more "convenient" way of testing with assertions, mocking, and suite.

Let's check some examples:

```go linenums="1" title="main.go"
import (
  "testing"
  "github.com/stretchr/testify/assert"
)

func Test_Add(t *testing.T) {
  assert.Equal(t, 3, calculator.Add(1, 2))
}
```
