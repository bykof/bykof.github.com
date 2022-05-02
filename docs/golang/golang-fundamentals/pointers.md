# Pointers

## Overview

Let's first check how variable are represented in the memory:

```go linenums="1"
var x int32 = 10
var y bool = true
```

| Value    | 0   | 0   | 0   | 10  | 1   |
| -------- | --- | --- | --- | --- | --- |
| Address  | 1   | 2   | 3   | 4   | 5   |
| Variable | x   |     |     |     | y   |

`x` is a 32bit integer, which needs 4 bytes (4\*8) to store the integer in the memory.
`y` is a boolean and needs just 1 byte to store it in the memory.
For every byte in the memory there is an address, so the programm can read or write the specific values into the memory.

A pointer "points" to a specific address of a variable.
Let's check that:

```go linenums="1"
var x int32 = 10
var y bool = true

pointerX := &x
pointerY := &y

var pointerZ *string
```

| Value    | 0   | 0   | 0   | 10  | 1   | 0         | 0   | 0   | 1   | 0        | 0   | 0   | 5   | 0        | 0   | 0   | 0   |
| -------- | --- | --- | --- | --- | --- | --------- | --- | --- | --- | -------- | --- | --- | --- | -------- | --- | --- | --- |
| Address  | 1   | 2   | 3   | 4   | 5   | 6         | 7   | 8   | 9   | 10       | 11  | 12  | 13  | 14       | 15  | 16  | 17  |
| Variable | x   |     |     |     | y   | pointer X |     |     |     | pointerY |     |     |     | pointerZ |     |     |     |

The `&` is the `address operator`.
It returns a the address of the memory location where the value is stored.

The `*` is the `indirection operator`. It returns the actual value of a pointer.
This is also called dereferencing.

If you dereference a pointer which is nil, you will get a panic:

```go linenums="1"
var x *int
fmt.Println(x == nil)
fmt.Println(*x)
```

outputs:

```
true
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x47dd2d]
```

There is a builtin function `new`, which creates a pointer type variable.
It returns a pointer to a zero value of given type.

```go linenums="1"
var x = new(int)
fmt.Println(x == nil)
fmt.Println(*x)

// is the same as
var a int
var b *int
b = &a
fmt.Println(*b)
```

For structs you can use just a `&` while initializing one:

```go linenums="1"
type person struct {
    FirstName string
    LastName string
}

person := &person{
    FirstName:  "Michael",
    LastName: "Bykovski",
}
```

Take care, that you cannot take the address of a constant.
Check here:

```go linenums="1"
type person struct {
    FirstName string
    MiddleName *string
    LastName string
}

p := &person{
    FirstName:  "Michael",
    MiddleName: &"Michau",
    LastName: "Bykovski",
}
```

output:

```
invalid operation: cannot take address of "Michau" (untyped string constant)
```

You can use two solutions here.
First introduce a variable of the constant and then take the address of it.
Or create a function that gets a type and returns the pointer to that type.

```go linenums="1"
func stringPointer(s string) *string {
	return &s
}

type person struct {
	FirstName  string
	MiddleName *string
	LastName   string
}

func main() {
	type person struct {
		FirstName  string
		MiddleName *string
		LastName   string
	}

	middleName := "Michau"
	p := &person{
		FirstName:  "Michael",
		MiddleName: &middleName,
		LastName:   "Bykovski",
	}

	p2 := &person{
		FirstName:  "Michael",
		MiddleName: stringPointer("Michau"),
		LastName:   "Bykovski",
	}
	fmt.Println(p, p2)
}
```

output:

```
&{Michael 0xc000010250 Bykovski} &{Michael 0xc000010260 Bykovski}
```

## Mutable Parameters or Call by Reference

Go is a call by value language, which means that if you pass a variable into a function as parameter, it will make a copy of that variable.
So if you try to manipulate the passed in variable you will only do changed on a copy of the actual passed in variable.
But what if you store an address of a variable and pass in the address into a function?
-> Then you will be able to manipulate the actual value of the outer variable.
Let's check an example:

```go linenums="1"
type Person struct {
	FirstName string
	LastName  string
	Age       int
}

func noBirthday(p Person) {
	p.Age = p.Age + 1
}

func birthday(p *Person) {
	p.Age = p.Age + 1
}

func main() {
	p := Person{
		FirstName: "Michael",
		LastName:  "Bykovski",
		Age:       28,
	}
	fmt.Println(p)
	noBirthday(p)
	fmt.Println(p)
	birthday(&p)
	fmt.Println(p)
}
```

output:

```
{Michael Bykovski 28}
{Michael Bykovski 28}
{Michael Bykovski 29}
```

But it has some implications, which could be not self explanatory.
For example, if you have a nil pointer and you want to assign a variable to this pointer.
**You still work on a "copy" of that pointer.**

```go linenums="1"
func failedUpdate(g *int) {
	x := 10
	g = &x // g is still a copied pointer and will be vanished after function returns
}

func main() {
	var f *int
	failedUpdate(f)
	fmt.Println(f) // f is still nil
}
```

This can be fixed by derefencing the value and setting it.
By dereferencing we access the actual value in the memory and overwrite it within a function.

```go linenums="1"
func failedUpdate(g *int) {
	x := 10
	g = &x // g is still a copied pointer and will be vanished after function returns
}

func update(g *int) {
	*g = 10
}

func main() {
	f := 1
	failedUpdate(&f)
	fmt.Println(f) // f is still 1

	update(&f)
	fmt.Println(f) // 10
}
```

!!! danger

    Please be carefull with dereferencing, because they can panic.
    Therefore **always** check for nil pointer!

    ```go linenums="1"
    func update(g *int) {
    	*g = 10
    }

    func main() {
    	var f *int

    	update(f)
    	fmt.Println(f) // error: invalid memory address or nil pointer dereference
    }
    ```

    Fixed:

    ```go linenums="1"
    func update(g *int) {
    	if g != nil {
    		*g = 10
    	}
    }

    func main() {
    	var f *int

    	update(f)
    	fmt.Println(f) // prints nil
    }
    ```

## Passing Pointers rather than Values

Surely passing pointers and modifying their values is easy.
But it's actually an "anti-pattern" to make functions, which receive a pointer and modifying the value of your variable.
Modern Software Engineering teaches us to work with immutable values rather than mutable ones [Source](https://web.mit.edu/6.031/www/fa20/classes/08-immutability/).

Therefore it's better to make functions which receive a copy of a value, mutate it and returns the mutated value:

```go linenums="1"
type Person struct {
	FirstName string
	Age       int
}

func badBirthday(p *Person) {
	p.Age++
}

func birthday(p Person) Person {
	p.Age++
	return p
}

func main() {
	person := Person{
		FirstName: "Michael",
		Age:       28,
	}
	fmt.Println(person)
	badBirthday(person)
	fmt.Println(person)
	person = birthday(person)
	fmt.Println(person)
}
```

## Performance

If you pass a variable into a function, the whole variable gets copied to work on it.
So if you pass in a variable which is around 10megabytes big, it can take up to 1 millisecond to copy the variable.
Beside that it takes only about 1 nanosecond to load a pointer into a function.

But returning a pointer can take more time than returning a variable.
But only in one case, if you variable is smaller than 1 megabyte.
For example for a 100 byte pointer it takes 30 nanoseconds and to return a value, it takes 10 nanoseconds.
Once your data is bigger than 1 megabyte, this rule inverts.

So for the vast majority of cases you should use call by value, only in a few cases a pointer makes sense.

## Zero Value vs. No Value

A common usage for pointers is to set a variable either to it's zero value or to set it to nil.
If you need to explicitly say, that a variable is not set, use a nil pointer.

For example if you need optional parameters:

```go linenums="1"

type Parameters struct {
	a int
	b *int
}

func sum(parameters Parameters) int {
	if parameters.b != nil {
		return parameters.a + *parameters.b
	}
	return parameters.a
}

func main() {
	b := 2
	p1 := Parameters{
		a: 1,
		b: &b,
	}
	p2 := Parameters{
		a: 5,
	}
	fmt.Println(sum(p1))
	fmt.Println(sum(p2))
}
```

## Maps and Pointers

If you pass a map into a function you can manipulate the actual value of the map.
This is because Go doesn't copy the value of the map but passes a reference (a pointer to struct) into the function.

Therefore you should avoid using maps, unless you are working with really dynamic JSON data for example.
Especially if you design your code to work in a team, it is better to define a concrete struct for your data structure than to use a dynamic map.

## When to use Methods over Functions

Any time your logic depends on values that are configured at startup of changed while your program is running, those values should be stored in a struct and that logic should be implemented as a method.

Follow this three rules and you'll be fine:

1. when implementing methods of an interface for your struct (we will do interfaces in the next chapter)
2. when the function needs to use a private variable within your struct
3. when the function is completely related to the struct


