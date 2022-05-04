# Docker Images for Go
Surprisingly Docker was built with the programming language Go.


## Go Application 

Let's start with a simple Go webserver and init a go application:

```shell
go mod init go-webserver
```

Now we write the `main.go` file.

```go linenums="1" title="main.go"
package main

import (
    "fmt"
    "html"
    "log"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
    })

    http.HandleFunc("/hi", func(w http.ResponseWriter, r *http.Request){
        fmt.Fprintf(w, "Hi")
    })

    log.Fatal(http.ListenAndServe(":8081", nil))

}
```

If we run it with `go run main.go` and access the URL with `http://localhost:8081/go` we get `Hello, "/go"` as response.

## Writing the Dockerfile

We have a working Go application, now let's start to build it as a Docker image.
For that we need first a Dockerfile in the same location, where the `main.go` file is located.

Let's create a `Dockerfile` for that to build images:

```dockerfile title="Dockerfile"
FROM golang:1.18.1-alpine

RUN mkdir /app

WORKDIR /app

COPY . .

RUN go build -o main .

CMD ["/app/main"]
```

## Build the image

Now we have a `Dockerfile` and can build the image:

```shell
docker build . -t go-webserver:latest
```

## Start or push the image

From that point we can start the image or push it onto an image repository.

Here is a demonstration, how to start the image:

```shell
docker run --rm -it -p 8081:8081 go-webserver
```

Now we can access again the browser: `http://localhost:8081/go` and the response should be `Hello, "/go"`.

## Smaller images

Since we compile the go application, we actually don't need the Go files anymore in the image.
To save some space we can build the image in two stages (multistage).

Here is an example to do that:

```dockerfile title="Dockerfile"
FROM golang:1.18.1-alpine AS BUILDER
WORKDIR /app
COPY . .                                    
RUN go build -o app main.go

FROM alpine:latest
WORKDIR /app
COPY --from=BUILDER /app ./
CMD ["./app"]
```

Since we built the Go application on an alpine, we can use instead of `golang:alpine` just `alpine`, which is a smaller image.\

We built and start the image:

```shell
docker build . -t go-webserver-alpine
docker run --rm -it -p 8081:8081 go-webserver-alpine
```

If we compare those two images, there is a significant difference:

```
go-webserver-alpine            latest        4fe92b6799b2   38 seconds ago   11.4MB
go-webserver                   latest        c67bfbfc1bba   7 minutes ago    332MB
```