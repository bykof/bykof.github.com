# The standard library

There are a lot of "batteries included" in Go.
The standard library is really huge, let's check some of those packages to see, how they were implemented.

## io

Input and Output Data into files is probably one of the main things, what a programm should can.
The package `io` provide this functionality and two most used interfaces from this package are:

```go linenums="1"
type Reader interface {
	Read(p []byte) (n int, err error)
}

type Writer interface {
	Write(p []byte) (n int, err error)
}
```

[`Reader`](https://pkg.go.dev/io#Reader) and [`Writer`](https://pkg.go.dev/io#Writer) are very simple and practical interfaces.
They allow to read or write `len(p)` byte to a specific destination.

This allows also to read buffered data, lets check an example here:

```go linenums="1"
func countLetters(r io.Reader) (map[string]int, error) {
    buf := make([]byte, 2048)
    out := map[string]int{}

    for {
        n, err := r.Read(buf)

        for _, r  range bug[:n] {
            if (r >= 'A' && r <= 'Z') || (r >= 'a' && r <= 'z') {
                out[string(r)]++
            }
        }

        if err == io.EOF {
            return out, nil
        }

        if err != nil {
            return nil, nil
        }
    }
}
```

Let's see, how we can read a simple file:

```go linenums="1"
import (
	"fmt"
	"io"
	"log"
	"os"
)

func main() {
	f, err := os.OpenFile("notes.txt", os.O_RDWR|os.O_CREATE, 0755)
	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		if err := f.Close(); err != nil {
			log.Fatal(err)
		}
	}()

	data, err := io.ReadAll(f)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string(data))
}
```

The [`ioutil.ReadAll`](https://pkg.go.dev/io#ReadAll) reads a `Reader` interface until an error or `io.EOF` is read.

## time

The `time` package is for working with dates, times and datetimes.
The package contains two main types: `time.Duration` and `time.Time`.

A period of time is represented as an `int64`.
The smallest amount of time is one nanosecond.
But there are some constants, which can be used to calculate a minute, two seconds and so on:

```go linenums="1"
h := 2 * time.Hour // 2 hours
m := 3 * time.Minute // 3 minutes
hm := h + m // 2 hours and 3 minutes
```

[`time.ParseDuration`](https://pkg.go.dev/time#ParseDuration) can parse strings like `300ms` or `2.3h`:

```go linenums="1"
import (
	"fmt"
	"time"
)

func main() {
	hours, _ := time.ParseDuration("10h")
	complex, _ := time.ParseDuration("1h10m10s")
	micro, _ := time.ParseDuration("1µs")
	// The package also accepts the incorrect but common prefix u for micro.
	micro2, _ := time.ParseDuration("1us")

	fmt.Println(hours)
	fmt.Println(complex)
	fmt.Printf("There are %.0f seconds in %v.\n", complex.Seconds(), complex)
	fmt.Printf("There are %d nanoseconds in %v.\n", micro.Nanoseconds(), micro)
	fmt.Printf("There are %6.2e seconds in %v.\n", micro2.Seconds(), micro)
}
```

Now we come to a really unusual thing... parsing and formatting datetimes.
Go follows the idea to use a format depending on the position in the string: `01/02 03:04:05PM 06 -0700`.

So for example:

```go linenums="1"
func main () {
    t, err := time.Parse("2006-01-02 15:04:05 -0700", "2016-01-13 00:12:43 +0000")
    if err != nil {
        fmt.Println(err)
    }
    fmt.Println(t.Format("January 2, 2006 at 03:04:05PM MST"))
}
```

output would be:

```
January 13, 2016 at 12:12:43AM UTC
```

There are a lot of more functions to manipulate `time.Time`.
Jus see some of the [documentation](https://pkg.go.dev/time)

### gostradamus

If you want to work with datetimes and to have a in-replacement for time you can use my Go package: [gostradamus](https://github.com/bykof/gostradamus).
It's a more "convenient" way to work with `time.Time` variables:

```go linenums="1"
import (
    "fmt"
    "github.com/bykof/gostradamus"
)
func main() {
    dateTime, err := gostradamus.Parse("14.07.2017 02:40:00", "DD.MM.YYYY HH:mm:ss")
    if err != nil {
        panic(err)
    }

    // Easy manipulation
    dateTime = dateTime.ShiftMonths(-5).ShiftDays(2)

    // Easy formatting
    fmt.Println(dateTime.Format("DD.MM.YYYY HH:mm:ss"))
    // 16.02.2017 02:40:00

    // Easy helper functions
    start, end := dateTime.SpanWeek()

    fmt.Println(start.String(), end.String())
}
```

output:

```
16.02.2017 02:40:00
2017-02-13T00:00:00.000000Z 2017-02-19T23:59:59.999999Z
```

## encoding/json

Go has a builtin json parser.
It uses the word `Marshal` (`Parse`) and `Unmarshal` (`Format`) for this library.

Also Go uses structs or types to represent JSON object, arrays and so on.
You can "map" json object fields onto your struct, even when the field names are different.

Let's check an example:

```json linenums="1"
{
    "id": 123,
    "first_name": "Test",
    "last_name": "Tester",
    "birthday": "1994-01-19T00:00:00Z",
    "skills": [
        { "id": 1, "name": "Running" },
        { "id": 1, "name": "Jumping" }
    ]
}
```

now we define a struct to map the data:

```go linenums="1"

import (
	"encoding/json"
	"fmt"
	"time"
)

type Skill struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Skills []Skill

type Person struct {
	ID        int       `json:"id"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Birthday  time.Time `json:"birthday"`
	Skills    Skills    `json:"skills"`
}

func main() {
	s := `
    {
        "id": 123,
        "first_name": "Test",
        "last_name": "Tester",
        "birthday": "1994-01-19T00:00:00Z",
        "skills": [
            {"id": 1, "name": "Running"},
            {"id": 1, "name": "Jumping"}
        ]
    }`
	var person Person
	err := json.Unmarshal([]byte(s), &person)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%#v", person)
}
```

output:

```
main.Person{ID:123, FirstName:"Test", LastName:"Tester", Birthday:time.Date(1994, time.January, 19, 0, 0, 0, 0, time.UTC), Skills:main.Skills{main.Skill{ID:1, Name:"Running"}, main.Skill{ID:1, Name:"Jumping"}}}
```

## net/http

The [`net/http`](https://pkg.go.dev/net/http) library has a `client` and a `server`.
So you can send and receive http requests.

### client

You can create a `http.Client` instance with a default timeout:

```go linenums="1"
import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func main() {
	client := &http.Client{
		Timeout: 30 * time.Second,
	}

	request, err := http.NewRequestWithContext(
		context.Background(),
		http.MethodGet,
		"https://jsonplaceholder.typicode.com/todos/1",
		nil,
	)

	if err != nil {
		panic(err)
	}

	response, err := client.Do(request)
	if err != nil {
		panic(err)
	}

	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		panic(fmt.Sprintf("got unexpected status: %v", response.StatusCode))
	}

	var data struct {
		ID        int    `json:"id"`
		UserID    int    `json:"userId"`
		Title     string `json:"title"`
		Completed bool   `json:"completed"`
	}

	err = json.NewDecoder(response.Body).Decode(&data)
	if err != nil {
		panic(err)
	}

	fmt.Printf("%+v", data)
}
```

output would be:

```
{ID:1 UserID:1 Title:delectus aut autem Completed:false}%
```

### server

The server `http.ServeMux` handles multiple paths.
You can combine multiple ServeMux Handlers, but be aware, that you have to strip the path before the request will be given to any underlying handler.
Every incoming request will be handled by it's own goroutine.

```go linenums="1"
import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	apiMux := http.NewServeMux()
	apiMux.HandleFunc("/todo/", func(w http.ResponseWriter, req *http.Request) {
		w.Write([]byte("todo"))
	})
	apiMux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		w.Write([]byte("api"))
	})

	mux := http.NewServeMux()
	mux.Handle("/api/", http.StripPrefix("/api", apiMux))
	mux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		// The "/" pattern matches everything, so we need to check
		// that we're at the root here.
		if req.URL.Path != "/" {
			http.NotFound(w, req)
			return
		}
		fmt.Fprintf(w, "Welcome to the home page!")
	})

	server := http.Server{
		Addr:         ":8000",
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 60 * time.Second,
		IdleTimeout:  120 * time.Second,
		Handler:      mux,
	}
	err := server.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		panic(err)
	}
}
```

Sometimes you need a middleware to check if the user is allowed to access an endpoint:

```go linenums="1" title="main.go"

const Password = "notsecurepassword"

func securityMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		if req.Header.Get("Authorization") != Password {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("no access"))
			return
		}
		h.ServeHTTP(w, req)
	})
}

func requestTimer(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		start := time.Now()
		h.ServeHTTP(w, req)
		end := time.Now()
		log.Printf("request took: %s", end.Sub(start))
	})
}

// ...

mux.Handle(
	"/",
	requestTimer(
		securityMiddleware(
			http.HandlerFunc(
				func(w http.ResponseWriter, req *http.Request) {
					// The "/" pattern matches everything, so we need to check
					// that we're at the root here.
					if req.URL.Path != "/" {
						http.NotFound(w, req)
						return
					}
					fmt.Fprintf(w, "Welcome to the home page!")
				},
			),
		),
	),
)
```
