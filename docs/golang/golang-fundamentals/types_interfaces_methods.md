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

## Nested Typing is not Inheritance

One could believe that if you nest different types, you get a similar behaviour like inheratance.
But this is not correct.
Inheritance would enable the possibility to use the underlying defined methods for the inherited type, but this is not the case.
Every type builds it's own "environment" with methods.
You can't even assign a child type to a parent type, because in Go those type are two different one and don't belong together.

!!! danger

    This won't work:

    ```go linenums="1"
    type Score int
    type TeamScore Score

    func (s Score) Good() bool {
    	return s > 10
    }

    func main() {
    	var score Score
    	teamScore := TeamScore(10)
    	fmt.Println("Team Score is: ", teamScore.Good())
    	score = teamScore
    }
    ```

!!! success

    This works:

    ```go linenums="1"
    type Score int
    type TeamScore Score

    func (s Score) Good() bool {
    	return s > 10
    }

    func main() {
    	var score Score
    	teamScore := TeamScore(10)
    	fmt.Println("Team Score is: ", Score(teamScore).Good())
    	score = Score(teamScore)
    }
    ```

## iotas are Enums

Go doesn't have the concept of enumerations.
But it has `iota`, which somehow has the same concepts, but different.

If you start with `iota` define an integer type:

```go linenums="1"
type PurchasingCategory int
```

then start with a `const` block and define a some iotas:

```go linenums="1"
const (
	NoCategory PurchasingCategory = iota
	Shirts
	Pants
	Watches
	Hats
)
```

If the Go compiler sees `iota` at the end of a line and succeeding lines of constants it will increment each line by one.
The first constant `NoCategory` receives the value `0`.
If you define a new const block with another variable, iota will start again from `0`.

!!! danger
This will not work

    ```go linenums="1"
    type Test int

    const (
    	one Test = 1
    	two
    	three
    )

    func main() {
    	fmt.Println(one, two, three)
    }
    ```

    output:

    ```
    1 1 1
    ```

!!! success

    This is the correct usage:

    ```go linenums="1"
    type Test int

    const (
    	one Test = iota
    	two
    	three
    )

    func main() {
    	fmt.Println(one, two, three)
    }
    ```

Use iota only if you are not relying on the value of the constants.
Because the values can be changed, if you insert a new constant in the middle of the definition block.
Use commond constants with a value assigned if you use it for database entries or outgoing messages.
Use `iotas` only for "internal" computation, where you need some kind of named constant where the value doesn't matter.

## Embedding is Composition

There is some kind of inheritance in Go what is called "Composition".
Let's check an example:

```go linenums="1"
package main

import (
	"fmt"
	"strings"
)

type Employee struct {
	Name	string
	ID 	string
}

func (e Employee) Description() string {
	return fmt.Sprintf("%s: %s", e.ID, e.Name)
}

type Project struct {
	Name	string
}

type Projects []Project

func (ps Projects) ProjectNames() []string {
	var names []string
	for _, project := range ps {
		names = append(names, project.Name)
	}
	return names
}


type SoftwareDeveloper struct {
	Employee
	Projects Projects
}

func (sd SoftwareDeveloper) String() string {
	return fmt.Sprintf(
		"%s\nProjects: \n%s",
		sd.Description(),
		strings.Join(
			sd.Projects.ProjectNames(),
			"\n",
		),
	)
}

func main () {
	developer := SoftwareDeveloper{
		Employee: Employee{
		  Name: "Michael Bykovski",
		  ID: "1",
		},
		Projects: Projects{
			{Name: "Daimler"},
			{Name: "Deutsche Börse"},
		},
	}
	fmt.Println(developer)
}
```

It is important to leave the name of the variable of the embedding struct (line 33).
If you want to overwrite the embedded function or some field, just do it. They will be still accessable:

```go linenums="1"
type Inner struct {
	Y int
}

func (i Inner) String() string {
	return fmt.Sprintf("%d", i.Y)
}

type Outer struct {
	Inner
	Y int
}

func (o Outer) String() string {
	return fmt.Sprintf("%d", o.Y)
}

func main () {
	outer := Outer{
		Inner: Inner{
			Y: 5,
		},
		Y: 10,
	}

	fmt.Println(outer.String(), outer.Inner.String())
}
```

output:

```
10 5
```

### Embedding is not Inheritance

Do not treat embedding as inheritance.

1. You cannot assign an inherited member to the parent type

```go linenums="1"
type Inner struct {
	Y int
}

type Outer struct {
	Inner
	Y int
}

func main() {
	var inner Inner
	outer := Outer{
		Inner: Inner{
			Y: 1,
		},
		Y: 2,
	}
	inner = outer
}
```

output would be:

```
cannot use outer (variable of type Outer) as type Inner in assignment
```

this would fix it:

```go linenums="1"
func main() {
	var inner Inner
	outer := Outer{
		Inner: Inner{
			Y: 1,
		},
		Y: 2,
	}
	inner = outer.Inner
}
```

2. Go does not dynamically dispatch the Methods

```go linenums="1"
type Inner struct {
	Y int
}

func (i Inner) IntPrinter(value int) string {
	return fmt.Sprintf("Inner: %d", value)
}

func (i Inner) Double() string {
	return i.IntPrinter(i.Y * 2)
}

type Outer struct {
	Inner
	Y int
}

func (o Outer) IntPrinter(value int) string {
	return fmt.Sprintf("Outer: %d", value)
}

func main() {
	outer := Outer{
		Inner: Inner{
			Y: 2,
		},
		Y: 4,
	}
	fmt.Println(outer.Double())
}
```

If you have a struct, which embeds another struct and you can an embedded function, it will resolve other functions of the struct in the "embedded scope".

## Interfaces

The only abstract type in Go are `interfaces`.
So let's check them out:

```go linenums="1"
type Stringer interface {
	String() string
}
```

Usually Interfaces end with "er", there are several Go built-in interfaces like `io.Reader`, `io.Closer`, `io.ReadCloser`, `json.Marshaler`.

### Implicit Interfaces

Go Interfaces work in a different way compared to other programming languages.
Types implement interfaces by implementing their function signatures.
Let's check it out:

```go linenums="1"
type ConsoleWriter struct {
	Prefix string
}

func (cw ConsoleWriter) Write(data string) {
	fmt.Println(cw.Prefix, ":", data)
}

type Writer interface {
	Write(data string)
}

type Application struct {
	W Writer
}

func (a Application) Run() {
	a.W.Write("Hello World")
}

func main() {
	application := Application{
		W: ConsoleWriter{
			Prefix: "ConsoleWriter",
		},
	}
	application.Run()
}
```

`Application` wants a type that fulfills the `Writer` interface.
Since `ConsoleWriter` implements the defined function signatures of the `Writer` interface, it implements automatically the `Writer` interface.

Interfaces are a type and therefore they can be shared like functions, variables and structs.
Let's check this example:

```go linenums="1"
type ConsoleWriter struct {
	Prefix string
}

func (cw ConsoleWriter) Write(data string) {
	fmt.Println(cw.Prefix, ":", data)
}

type Writer interface {
	Write(data string)
}

type Application struct {
	W Writer
}

func NewApplication(w Writer) Application {
	return Application{
		W: w,
	}
}

func (a Application) Run() {
	a.W.Write("Hello World")
}

func main() {
	consoleWriter := ConsoleWriter{
		Prefix: "ConsoleWriter",
	}
	application := NewApplication(consoleWriter)
	application.Run()
}
```

You can also append new methods to structs which implement interfaces.
As long as the signature fulfills the interface, it implements the interface, all other methods belong to the struct.
Multiple interface implementations are also possible:

```go linenums="1"
type ConsoleWriter struct {
	Prefix string
	Cache  string
}

func (cw ConsoleWriter) Write(data string) {
	fmt.Printf("%s: %s (cached: %s)", cw.Prefix, data, cw.Cache)
	cw.Cache = ""
}

func (cw *ConsoleWriter) Read(data string) {
	cw.Cache = data
}

func (cw *ConsoleWriter) PurgeCache() {
	cw.Cache = ""
}

type Writer interface {
	Write(data string)
}

type Reader interface {
	Read(data string)
}

type Application struct {
	W Writer
	R Reader
}

func NewApplication(w Writer, r Reader) Application {
	return Application{
		W: w,
		R: r,
	}
}

func (a Application) Run() {
	a.R.Read("Hello World")
	a.W.Write("Hello Go")
}

func main() {
	consoleWriter := ConsoleWriter{
		Prefix: "ConsoleWriter",
	}
	application := NewApplication(&consoleWriter, &consoleWriter)
	application.Run()
	consoleWriter.PurgeCache()
}
```

### Embedding Interfaces

The same way you can embed structs, you can embed interfaces too.

Here is an example:

```go linenums="1"
type ConsoleWriter struct {
	Prefix string
	Cache  string
}

func (cw ConsoleWriter) Write(data string) {
	fmt.Printf("%s: %s (cached: %s)", cw.Prefix, data, cw.Cache)
	cw.Cache = ""
}

func (cw *ConsoleWriter) Read(data string) {
	cw.Cache = data
}

func (cw *ConsoleWriter) PurgeCache() {
	cw.Cache = ""
}

type Writer interface {
	Write(data string)
}

type Reader interface {
	Read(data string)
}

type ReaderWriter interface {
	Reader
	Writer
}

type Application struct {
	RW ReaderWriter
}

func NewApplication(readerWriter ReaderWriter) Application {
	return Application{
		RW: readerWriter,
	}
}

func (a Application) Run() {
	a.RW.Read("Hello World")
	a.RW.Write("Hello Go")
}

func main() {
	consoleWriter := ConsoleWriter{
		Prefix: "ConsoleWriter",
	}
	application := NewApplication(&consoleWriter)
	application.Run()
	consoleWriter.PurgeCache()
}
```

### Accept Interfaces, Return Concrete Types

As we want to decouple our code but make it easy to adapt we should build functions that accept interfaces and return concrete types.
Because interfaces define a specific functionality our code should accept functionality, run it and return a concrete behaviour or value.

Let's take for example:

```go linenums="1"
type UserData struct {
	// ...
}

type Authentication struct {
	// ...
}

func (a Authentication) Auth() (UserData, error) {
	// ...
	return UserData{}, nil
}

func DoAuthentication(a Authentication) (UserData, error) {
	// ...
	return a.Auth()
}

```

If we want now to support multiple Auth methods for example, we can open the DoAuthentication for an interface, which defines the Method `Auth` but we should still a concrete struct, for further implementations:

```go linenums="1" title="userdata.go"
type AppleUserData struct {
	// ...
}

type GoogleUserData struct {
	// ...
}

type UserData struct {
	AppleUserData  *AppleUserData
	GoogleUserData *GoogleUserData
}

func (ud UserData) IsApple() {
	// ...
}
func (ud UserData) IsGoogle() {
	// ...
}

type Authenticator interface {
	Auth() (UserData, error)
}

type GoogleAuthentication struct {
	// ...
}

func (ga GoogleAuthentication) Auth() (UserData, error) {
	// ...
	return UserData{
		GoogleUserData: &GoogleUserData{
			// ...
		},
	}, nil
}

type AppleAuthentication struct {
	// ...
}

func (aa AppleAuthentication) Auth() (UserData, error) {
	return UserData{
		AppleUserData: &AppleUserData{
			// ...
		},
	}, nil
}

func DoAuthentication(a Authenticator) (UserData, error) {
	return a.Auth()
}
```

!!! danger

	Do **NOT** do this:

    ```go linenums="1"
    type UserData struct {
    	// ...
    }

    type UserDataGetter interface {
    	UserData() UserData
    }

    type AppleUserData struct {
    	// ...
    }

    func (aud AppleUserData) UserData() {

    }

    type GoogleUserData struct {
    	// ...
    }

    // ...

    func DoAuthentication(a Authenticator) UserDataGetter {
    	return a.Auth()
    }
    ```

If you want to read more about "accept interfaces, return concrete types" follow [this](https://medium.com/@cep21/what-accept-interfaces-return-structs-means-in-go-2fe879e25ee8) and [this](https://medium.com/@cep21/preemptive-interface-anti-pattern-in-go-54c18ac0668a)

The rule is:

> Unnecessary abstraction creates unnecessary complication. Don’t over complicate code until it’s needed.

### Interfaces and nil

Interfaces are nil as long as they:

1. don't have a type
2. don't have a value

This example should make it clear:

```go linenums="1"
var s *string
fmt.Println(s == nil) // true

var i interface{}
fmt.Println(i == nil) // true

i = s
fmt.Println(i == nil) // false
```

This tells us, that if an interface has a struct which is nil, it can still run methods of the nil-struct:

```go linenums="1"
type Dog struct {}

func (d *Dog) BarkGhost() {
	fmt.Println("Woof!")
}

func main() {
	var ghostDog interface{}
	var dog *Dog

	ghostDog = dog
	ghostDog.(*Dog).BarkGhost()
}
```

### Empty Interface All The Way

Sometimes you need to define a variable, where you will not know which type it is going to have.
Take `interface` for that:

```go linenums="1"
var i interface{}
i = 10
fmt.Println(i)
i = "Hello"
fmt.Println(i)
i = func(word string) string {
	return word
}
fmt.Println(i)
```

output:

```
10
Hello
0x47dcc0
```

Mostly you won't need an empty interface.
Sometimes you will need it to store some really unknown data structure, which comes from an unknown json schema:

```go linenums="1"
func main() {

	data := map[string]interface{}{}
	contents, err := ioutil.ReadFile("data.json")
	if err != nil {
		return err
	}
	defer contents.Close()
	json.Unmarshal(contents, &data)
}
```

## Type Assertions and Type Switches

### Type Assertions

Let's make first a type assertions, so we assert a specific type to an interface variable:

```go linenums="1"
type Score int

func main() {
	var i interface{}
	var score Score = 20
	i = score
	i2 := i.(Score)
	fmt.Println(i2 + score)
}
```

If you try to assert a type, which could not work, Go will panic:

```go linenums="1"
type Score int

func main() {
	var i interface{}
	var score Score = 20
	i = score
	i2 := i.(string)
	fmt.Println(i2)
}
```

output:

```
interface conversion: interface {} is main.Score, not string
```

The type has to match the exact underlying type, **not embedded or type inferenced**.

```go linenums="1"
type Score int

func main() {
	var i interface{}
	var score Score = 20
	i = score
	i2 := i.(int)
	fmt.Println(i2 + score)
}
```

output:

```
interface conversion: interface {} is main.Score, not int
```

If you want to test in your code and don't want to panic, use the [`variable, ok := idiom`](./composite_types.md#variable-ok--idiom)

```go linenums="1"
type Score int

func main() {
	var i interface{}
	var score Score = 1
	i = score
	i2, ok := i.(int)
	if !ok {
		fmt.Printf("i is not an int: %v", i)
		return
	}

	fmt.Println(i2 + 1)
}
```

### Type Switches

If your `interface` variable can have multiple types, use a type switch:

```go linenums="1"
func checkType(i interface{}) {
	switch j := i.(type) {
		case nil:
			fmt.Println("i is nil")
			return
		case int:
			fmt.Println("i is an int")
			return
		case string
			fmt.Println("i is a string")
			return
		default:
			fmt.Println("the type is not defined as case")
			return
	}
}
```
