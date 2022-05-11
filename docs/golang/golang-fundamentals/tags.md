# Tags

Some libraries like `encoding/json` use tags for more information in a struct.

Tags can be fetched by using reflect.

Let's check an example:

```go linenums="1"
type Person struct {
	FirstName string `json:"first_name,omitempty" other:"hello"`
}

func main() {
	person := Person{
		FirstName: "Michael",
	}

	personType := reflect.TypeOf(person)
	if firstNameField, ok := personType.FieldByName("FirstName"); ok {
		fmt.Println(firstNameField.Tag.Get("json"))
		fmt.Println(firstNameField.Tag.Get("other"))
	}
}
```

output:

```
first_name,omitempty
hello
```

## JSON Tags

If you use, for example `encoding/json`, you influence how your fields get `Marshaled` or `Unmarshaled` [Source](https://pkg.go.dev/encoding/json#Marshal).

We can set the key name of the json object, by using tags.
Let's check an example:

```go linenums="1"
type Person struct {
	FirstName string `json:"first_name,omitempty"`
}

func main() {
	person := Person{
		FirstName: "Michael",
	}

	data, err := json.Marshal(person)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(string(data))
}
```

output:

```
{"first_name":"Michael"}
```

If we use `omitempty` on a field and the field value is set to a zero value, then the field will be truncated:

```go linenums="1"
person := Person{}

data, err := json.Marshal(person)
if err != nil {
    fmt.Println(err)
}

fmt.Println(string(data))
```

output:

```
{}
```

If we do not use `omitempty` the field will be included always:

```go linenums="1"
type Person struct {
	FirstName string `json:"first_name"`
}

func main() {
	person := Person{}

	data, err := json.Marshal(person)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(string(data))
}
```

output:

```
{"first_name":""}
```
