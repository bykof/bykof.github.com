# Concurrency

## When to use concurrency

> More Concurrency != More Speed

> Concurrency != Parallelism

> Concurrency is doing a lot of things at once, Parallelism is doing a lot of things at the same time.

Generalizing on that a bit, any producer-consumer problem is a natural fit for 2 goroutines using a channel to pass outputs from the producer to the consumer.

Another good use for concurrency is interacting with multiple input/output sources (disks, network, terminal, etc.). Your program should be able to wake up and do some work whenever a result comes from any of these sources. It is possible to do this with one thread and a system call like poll(2) or select(2). When your thread wakes up, it must figure out which result came in, find where it left off in the relevant task, and pick up from there. That's a lot of code you need to write.

Writing that code is much easier using one goroutine per task. Then the state of that task is captured implicitly in the goroutine, and picking up where it left off is as simple as waking up and running.

[Source](https://stackoverflow.com/a/19749371)

[Go Concurrency Guide](https://github.com/luk4z7/go-concurrency-guide)

## Scheduler

Every programm gets executed as a process and every process has one or many threads.
The scheduler of an operating system decides which process (and the threads within a process) gets a specific amount of time to calculate.

Go has it's own scheduler which creates some threads at the start of your Go application.
The `main` function is actually the first Goroutine running in your Go application.
Go schedules and assigns Goroutines to the created threads so that the system-overhead can be minimized.

There are some benefits by doing that:

-   Goroutines are created faster than usual system threads
-   Goroutines stack sizes are smaller than usual system threads
-   Switching between Goroutines is faster than switching betweens system threads because it happens within the Go programm (process), avoiding system calls
-   The Go scheduler can optimize goroutines by themselves, because it's part of the Go process. It can decide to pause and resume a goroutine because it could have a blocking go operation (channel, mutex) or a blocking system call (ntework, IO, garbage collection).

By implementing an own scheduler, this allows to spawn more than ten thousand of simultaneous goroutines.
Try so spawn ten thousand system threads, this would result in a mess.

## Goroutines

Goroutines are executed by the keyword `go` before a function invocation.
Don't see it as a async/await, it's more a "go and never come back" execution.
If you want to return values from your `goroutine` don't use return, use it with `Channels`.

```go linenums="1"
func Compute() {
	for i := 0; i < 10_000_000_000; i++ {}
	fmt.Println("Done")
}

func main() {
	fmt.Println("Starting")
	go Compute()
	fmt.Println("After Compute")
}
```

output: 

```
Starting
After Compute
```

### Channels

Channels are like slices and maps, they are a built-in type and can be created using the `make` function.

```go linenums="1"
ch := make(chan int)
```

Channels are referenced, this means that channels are actually pointers.
The zero value for channels are `nil`.

### Reading, Writing Channels

The `<-` operator is used to read or write from channels.
If you want to read from a channel, place the operator on the left side; writing on the right side.

```go linenums="1"
val := <- ch // reading
ch <- 3 // writing
```

Values written to a channel can be read only once.
If multiple goroutines try to read from a channel, only one will get the value.

If you pass a channel into a function, indicate if the function will read or write from the channel.
By doing this, you tell the compiler to check, if you only read or write to a channel.
Usually a function read from one channel and writes into another.

```go linenums="1"
func execute(in <-chan int, out chan<- int) {
    go func() {
        for val := range in {
            result := process(val)
            out <- result
        }
    }()
}
```

Go uses unbuffered channels by default.
Every write to an open, unbuffered channel causes the writing goroutine to pause until another goroutine reads from this channel.
Every read to an open, unbuffered channel causes the reading goroutine to pause until another goroutine writes from this channel.

```go linenums="1"
import (
	"fmt"
	"time"
)

func hello(done chan bool) {
	fmt.Println("Hello world goroutine")
	time.Sleep(5 * time.Second)
	done <- true
}
func main() {
	done := make(chan bool)
	go hello(done)
	fmt.Println("waiting...")
	<-done
	fmt.Println("main function")
}
```

will output:

```
waiting...
Hello world goroutine
main function
```

### Buffered Channels

Go has buffered channels.
This means, that those channels have a limited number of writes without blocking.
If the buffer fills before the channel was read from a goroutine, it will block until the channel is read.
Reading from an empty buffer blocks also.

Creating a buffered channel works the same way as creating an unbuffered channels, but you enter a capacity:

```go linenums="1"
ch := make(chan int, 10)
```

`len` can be used to check, how many values are currently in the channel.

`cap` ca be used to find out the maximum buffer size.

### Looping over a channel

You can use the for-range loop.
The loop loops until the channel is closed, until a break or return inside of the loop.

```go linenums="1"
for v := range ch {
    fmt.Println(v)
}
```

### Closing a channel

Close a channel if you are done writing to it:

```go linenums="1"
close(ch)
```

If you attempt to write or try to close the channel again, Go will panic.
Reading from a closed channel works, it will return the zero value of the channels type.

When we can always read from a channel, how we can tell if the channel is closed or open and we just read a zero value?
We can use the `comma ok idiom` to check if the channel is closed.
If the channel is closed, ok is false; true otherwise:

```go linenums="1"
v, ok := <-ch
```

The responsibility to close a channel lies with the goroutine that writes to a channel.
Closing is only required, if another goroutine waits for new inputs.

This example would result in a deadlock:

```go linenums="1"
import (
	"fmt"
	"time"
)

func hello(done chan bool) {
	fmt.Println("Hello world goroutine")
	fmt.Println("Waiting 1 seconds")
	time.Sleep(1 * time.Second)
	done <- true
	fmt.Println("Waiting 1 seconds")
	time.Sleep(1 * time.Second)
	done <- true
}
func main() {
	done := make(chan bool)
	go hello(done)

	for value := range done {
		fmt.Println(value)
	}
}
```

output:

```
Hello world goroutine
Waiting 1 seconds
true
Waiting 1 seconds
true
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan receive]:
main.main()
        /Users/michaelbykovski/workspace/daimler/golang_workshop/goroutines_sleep/main.go:21 +0xd0
exit status 2
```

Because the `main` function would wait for a new value which cannot be filled by any "active" goroutine.
To fix that you should close the channel, so that the for-range loop stops:

```go linenums="1"
import (
	"fmt"
	"time"
)

func hello(done chan bool) {
	fmt.Println("Hello world goroutine")
	fmt.Println("Waiting 1 seconds")
	time.Sleep(1 * time.Second)
	done <- true
	fmt.Println("Waiting 1 seconds")
	time.Sleep(1 * time.Second)
	done <- true
    close(done)
}
func main() {
	done := make(chan bool)
	go hello(done)

	for value := range done {
		fmt.Println(value)
	}
}
```

output:

```
Hello world goroutine
Waiting 1 seconds
Waiting 1 seconds
true
true
```

### Select

`Select` statements can be used, to wait for multiple channels simultaneously.
`Select` blocks until one of it's cases fulfills.
If multiple cases are ready, it chooses one randomly:

```go linenums="1"
import (
	"fmt"
	"time"
)

func main() {
	one := make(chan string)
	two := make(chan string)

	go func() {
		time.Sleep(time.Second * 1)
		one <- "One"
	}()

	go func() {
		time.Sleep(time.Second * 1)
		two <- "Two"
	}()

	select {
	case result := <-one:
		fmt.Println("Received:", result)
	case result := <-two:
		fmt.Println("Received:", result)
	}

	close(one)
	close(two)
}
```

This will output sometime `two` and sometimes `one`.
output:

```
Received: One
```

### The done channel pattern

Sometimes you have multiple goroutines started, but you wait for only one to resolve and then you need to stop all the others.
Then you need the done channel pattern:

```go linenums="1"
import (
	"fmt"
	"math/rand"
	"time"
)

type searcherFunc func(string) string

func searchData(s string, searchers []searcherFunc) string {
	done := make(chan bool)
	result := make(chan string)

	for _, searcher := range searchers {
		go func(searcher searcherFunc) {
			select {
			case result <- searcher(s):
			case <-done:
			}
		}(searcher)
	}
	r := <-result
	close(done)
	return r
}

func RandomBetween(min int, max int) int {
	return rand.Intn(max-min) + min
}

func main() {
	searchers := []searcherFunc{
		func(s string) string {
			sleepSeconds := time.Second * time.Duration(RandomBetween(1, 10))
			time.Sleep(sleepSeconds)
			return "First!"
		},
		func(s string) string {
			sleepSeconds := time.Second * time.Duration(RandomBetween(1, 10))
			time.Sleep(sleepSeconds)
			return "Second!"
		},
		func(s string) string {
			sleepSeconds := time.Second * time.Duration(RandomBetween(1, 10))
			time.Sleep(sleepSeconds)
			return "Third!"
		},
	}
	data := searchData("test", searchers)
	fmt.Println(data)
}
```

### WaitGroups

`WaitGroups` are handy if you have multiple goroutines and you want to wait for all to finish.
The `sync` package provides the `WaitGroup` struct.
It has the following functions:

-   `Add(int)`
-   `Done()`
-   `Wait()`

Let's see the `WaitGroup` in practice:

```go linenums="1"
import (
	"fmt"
	"sync"
)

func work(wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Println("working...")
}

func main() {
	var wg sync.WaitGroup

	wg.Add(4)

	go work(&wg)
	go work(&wg)
	go work(&wg)
	go work(&wg)
	fmt.Println("Now lets wait for all to finish")
	wg.Wait()
	fmt.Println("All finished")
}
```

output:

```
Now lets wait for all to finish
working...
working...
working...
working...
All finished
```

### Mutexes

Mutexes are also located in the `sync` library.
Mutexes help to `Lock` and `Unlock` critical sections, to prevent race conditions.

Let's check an example:

```go linenums="1"
package main

import (
	"fmt"
	"sync"
)

type Counter struct {
	value int
}

func (c *Counter) Update(n int, wg *sync.WaitGroup) {
	value := c.value
    defer wg.Done()
	fmt.Printf("Adding %d to %d\n", n, value)
	c.value = value + n
}

func main() {
	var wg sync.WaitGroup

	c := Counter{}

	wg.Add(4)

	go c.Update(10, &wg)
	go c.Update(-5, &wg)
	go c.Update(25, &wg)
	go c.Update(19, &wg)

	wg.Wait()
	fmt.Println(c.value)
}
```

`c.Update()` works on the `c.value` variable and since they are all running concurrent, you never now, which value is currently in `c.value`.
output:

```
Adding 19 to 0
Adding -5 to 0
Adding 10 to 0
Adding 25 to 0
25
```

You can fix that by using `Mutex`:

```go linenums="1"
type Counter struct {
	m     sync.Mutex
	value int
}

func (c *Counter) Update(n int, wg *sync.WaitGroup) {
	c.m.Lock()
	defer wg.Done()
	fmt.Printf("Adding %d to %d\n", n, c.value)
	c.value += n
	c.m.Unlock()
}

func main() {
	var wg sync.WaitGroup

	c := Counter{}

	wg.Add(4)

	go c.Update(10, &wg)
	go c.Update(-5, &wg)
	go c.Update(25, &wg)
	go c.Update(19, &wg)

	wg.Wait()
    fmt.Println(c.value)
}
```

Now the output is correct, because we Lock the critical section `c.value` and only one goroutine is allowed to work on it until it `Unlock` the `Mutex` again.

```
Adding 19 to 0
Adding 10 to 19
Adding -5 to 29
Adding 25 to 24
49
```

### Concurrency in Go

Concurrency can be very frustrating, because a lot of things happen at the same time in your application and it can be very hard to predict or even debug, what is happening.
For this there is a very good book by Katherine Cox-Buday it's called [`Concurrency in Go`](https://www.amazon.de/dp/1491941197/ref=cm_sw_em_r_mt_dp_CPPWPBXFH75CQVHQAT92).


