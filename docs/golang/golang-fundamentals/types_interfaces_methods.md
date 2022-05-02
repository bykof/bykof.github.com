# Types, Interfaces and Methods

## Types

Go allows you to declare a user-defined type.
It can be a struct literal or primitive type.
Let's see an example:

```go linenums="1"
type Person {
    FirstName   string
    LastName    string
}

type Score int
type Converter func(string)Score
type TeamScores map[string]Score
```

## Methods

Like many programming languages, Go supports Methods on user-defined types.

```go linenums="1"
type Person struct {
	FirstName string
	LastName  string
	Age       int
}

func (p Person) String() string {
	return fmt.Sprintf("%s %s: age %d", p.FirstName, p.LastName, p.Age)
}
func main() {
	p := Person{
		FirstName: "Michael",
		LastName:  "Bykovski",
		Age:       28,
	}
	fmt.Println(p.String())
}
```

The `receiver` declares to which type a function belongs to.
The receiver is between the `func` keyword and the method's name and it's usually a short abbreviation of the receiver type and **not** conventional names like `self` or `this`.

Method overloading is prohibited.
You can use the same name for different user-defined types, but not two methods with the same name for one specific user-defined types.

## Pointer Receivers

As with usual functions the parameters (or receivers) of function are passed by value.
This means, that the method will work on a copy of the receiver variable.
If you want to modify the receiver variable, you can use pointer receivers:

```go linenums="1"
type Counter struct {
    total       int
    lastUpdated time.Time
}

func (c *Counter) Increment() {
    c.total++
    c.lastUpdated = time.Now()
}

func (c Counter) String() string {
    return fmt.Sprintf("counts: %d, last updated %v", c.total, c.lastUpdated)
}

func main() {
    counter := Counter{}
    fmt.Println(counter.String())
    counter.Increment()
    fmt.Println(counter.String())
}
```

output will be:

```
counts: 0, last updated 0001-01-01 00:00:00 +0000 UTC
counts: 1, last updated 2009-11-10 23:00:00 +0000 UTC m=+0.000000001
```

If you use counter you dont have to convert it to a pointer type, because you use the method of the specific type.
So therefore `counter.Increment()` is converted to `(&counter).Increment()`

Be aware if you pass in a copy of a variable and work with the pointer type of it.
For example: 


```go linenums="1"
type Counter struct {
	total       int
	lastUpdated time.Time
}

func (c *Counter) Increment() {
	c.total++
	c.lastUpdated = time.Now()
}

func (c Counter) String() string {
	return fmt.Sprintf("counts: %d, last updated %v", c.total, c.lastUpdated)
}

func update(counter Counter) {
	counter.Increment()
}

func main() {
	counter := Counter{}
	fmt.Println(counter.String())
	update(counter)
	fmt.Println(counter.String())
}
```

will output:

```
counts: 0, last updated 0001-01-01 00:00:00 +0000 UTC
counts: 0, last updated 0001-01-01 00:00:00 +0000 UTC
```

## Nil and Methods

If a struct poiner gets declared but not initialized it becomes nil.
Implementing pointer receivers on structs can produce a problem.
But Go handles it quiet easily:

-   If you create a nil struct pointer and call a value receiver, it will panic
-   If you create a nil struct pointer and call a pointer receiver, it will try to execute the function

Here are some examples:

```go linenums="1"
type Person struct {
	FirstName string
	LastName  string
}

func (p *Person) ChangeName(newName string) *Person {
	if p == nil {
		return &Person{
			LastName: newName,
		}
	}
	p.LastName = newName
	return p
}

func (p Person) String() string {
	return fmt.Sprintf("%s %s", p.FirstName, p.LastName)
}

func main() {
	var person *Person
	newPerson := person.ChangeName("Test")
	fmt.Println(newPerson.String())
	fmt.Println(person.String())
}
```

output: 

```
Test
panic: runtime error: invalid memory address or nil pointer dereference
```