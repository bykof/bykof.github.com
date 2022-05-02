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
    MiddleName: &"Vladislavovitsch",
    LastName: "Bykovski",
}
```

output:

```
invalid operation: cannot take address of "Vladislavovitsch" (untyped string constant)
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

	middleName := "Vladislavovitsch"
	p := &person{
		FirstName:  "Michael",
		MiddleName: &middleName,
		LastName:   "Bykovski",
	}

	p2 := &person{
		FirstName:  "Michael",
		MiddleName: stringPointer("Vladislavovitsch"),
		LastName:   "Bykovski",
	}
	fmt.Println(p, p2)
}
```

output: 

```
&{Michael 0xc000010250 Bykovski} &{Michael 0xc000010260 Bykovski}
```


