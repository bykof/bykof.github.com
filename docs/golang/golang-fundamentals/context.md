# Context

Context is the idea to have a `request scoped value storage` ([Source](https://go.dev/blog/context)).

Let's start by taking a look at the context interface:

```go linenums="1"
// A Context carries a deadline, cancellation signal, and request-scoped values
// across API boundaries. Its methods are safe for simultaneous use by multiple
// goroutines.
type Context interface {
    // Done returns a channel that is closed when this Context is canceled
    // or times out.
    Done() <-chan struct{}

    // Err indicates why this context was canceled, after the Done channel
    // is closed.
    Err() error

    // Deadline returns the time when this Context will be canceled, if any.
    Deadline() (deadline time.Time, ok bool)

    // Value returns the value associated with key or nil if none.
    Value(key interface{}) interface{}
}
```

Mostly `Context` is used to set values within a request and to cancel long running requests.

Let's first take a look a simple example:

```go linenums="1" title="main.go"
func process(ctx context.Context) {
	fmt.Println("Processing user id: ", ctx.Value("user_id"))
	select {
	case <-time.After(10 * time.Second):
		fmt.Println("Processing finished")
	case <-ctx.Done():
		fmt.Println("Processing cancelled")
	}
}

func hello(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()
	_, cancelFunc := context.WithCancel(ctx)
	ctx = context.WithValue(ctx, "user_id", 123)
	go process(ctx)

	select {
	case <-time.After(3 * time.Second):
		cancelFunc()
		fmt.Fprint(w, "Cancelled")
	case <-ctx.Done():
		err := ctx.Err()
		fmt.Println("server:", err)
		internalError := http.StatusInternalServerError
		http.Error(w, err.Error(), internalError)
	}
}

func main() {
	http.HandleFunc("/hello", hello)
	http.ListenAndServe(":8080", nil)
}
```

If you are not in a request-response loop, you can use the built-in functions to create a context for other purposes:

```go linenums="1" title="main.go"
import (
	"context"
	"fmt"
	"time"
)

func fastRequest(ctx context.Context, result chan<- string) {
	select {
	case <-ctx.Done():
		return
	case <-time.After(5 * time.Second):
		result <- "fast"
		return
	}
}

func slowRequest(ctx context.Context, result chan<- string) {
	select {
	case <-ctx.Done():
		return
	case <-time.After(30 * time.Second):
		result <- "slow"
		return
	}
}

func main() {
	ctx := context.Background()
	ctx, _ = context.WithDeadline(ctx, time.Now().Add(7*time.Second))
	data := make(chan string)
	fmt.Println("Startig fast request")
	go fastRequest(ctx, data)
	fmt.Println("Startig slow request")
	go slowRequest(ctx, data)

	for {
		select {
		case <-ctx.Done():
			fmt.Println("Canceled context, quiting")
			return
		case result := <-data:
			fmt.Println(result)
			return
		}
	}

}
```

output is: 

```
Startig fast request
Startig slow request
fast
```