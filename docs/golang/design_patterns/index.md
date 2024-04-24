# Design Patterns in Go

In this chapter we will look at some design patterns in Go.
All code example are taken from here: [https://refactoring.guru/design-patterns/go](https://refactoring.guru/design-patterns/go)

## Singleton

Just hold a package variable, which is a pointer to your preferred struct.
Then expose a function `SingleInstance` to retrieve the singleton.
Note to use sync.Mutex to lock the creation for the singleInstance, otherwise you could create multiple instances within several goroutines.

```go linenums="1" title="single.go"
import (
    "fmt"
    "sync"
)

var lock = &sync.Mutex{}

type single struct {
}

var singleInstance *single

func SingleInstance() *single {
    if singleInstance == nil {
        lock.Lock()
        defer lock.Unlock()

        if singleInstance == nil {
            fmt.Println("Creating single instance now.")
            singleInstance = &single{}
        } else {
            fmt.Println("Single instance already created.")
        }
    } else {
        fmt.Println("Single instance already created.")
    }

    return singleInstance
}
```

## Decorator

The decorator pattern allows adding new behaviours to objects dynamically.
Let's see how we can do that by creating a pizza decorator pattern:

First we create the decorator functionality

```go linenums="1" title="pizza.go"
type Pricer interface {
    getPrice() int
}
```

then we create create a concrete component:

```go linenums="1" title=""
type Pizza struct{}

func (p Pizza) getPrice() int {
	return 3
}
```

now we create some decorators:

```go linenums="1" title="toppings.go"
type Cheese struct {
	pricer Pricer
}

func (c Cheese) getPrice() int {
	return c.pricer.getPrice() + 2
}

type Tomato struct {
	pricer Pricer
}

func (t Tomato) getPrice() int {
	return t.pricer.getPrice() + 1
}
```

and now we stack the decorators:

```go linenums="1" title="main.go"
func main() {
	price := Cheese{
		pricer: Tomato{
			pricer: Pizza{},
		},
	}.getPrice()
	fmt.Println(price)
}
```
