# Wire

Google's own compile time dependency injection framework is called: [Wire](https://github.com/google/wire).
Wire works a little bit different from guice for example.
Wire generates code from a file called `wire.go` to a file called `wire_gen.go`, which can be used in the `main.go` file to initialize and start the application.

Install wire first:

```shell
go install github.com/google/wire/cmd/wire@latest
```

Let's take our example from the chapter before.
We first just create a file called `wire.go`:

```go linenums="1" title="wire.go"
//go:build wireinject
// +build wireinject

package main

import (
	"dependency_injection/core/ports"
	"dependency_injection/infrastructure/services"
	"dependency_injection/interface/controllers"
	"github.com/google/wire"
	"os"
)

func NewTTSService() ports.TTSServicePort {
	if os.Getenv("ENV") == "prod" {
		return services.NewRealTTSService()
	} else {
		return services.NewFakeTTSService()
	}
}

func InitializeMainController() *controllers.MainController {
	wire.Build(NewTTSService, controllers.NewMainController)
	return &controllers.MainController{}
}
```

After that we can run wire to generate a `wire_gen.go` file:

```shell title="Run in project root"
wire
```

```go linenums="1" title="wire_gen.go"
// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package main

import (
	"dependency_injection/core/ports"
	"dependency_injection/infrastructure/services"
	"dependency_injection/interface/controllers"
	"os"
)

// Injectors from wire.go:

func InitializeMainController() *controllers.MainController {
	ttsServicePort := NewTTSService()
	mainController := controllers.NewMainController(ttsServicePort)
	return mainController
}

// wire.go:

func NewTTSService() ports.TTSServicePort {
	if os.Getenv("ENV") == "prod" {
		return services.NewRealTTSService()
	} else {
		return services.NewFakeTTSService()
	}
}
```

And now we can adapt the `main.go` file:

```go linenums="1" title="main.go"
func main() {
	mainController := InitializeMainController()
	http.HandleFunc("/say", mainController.Say)
	log.Println("Running server on http://localhost:8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
```

Since we have now two files for the main package, we need to adapt our start line.
This is important because otherwise it won't compile properly:

```shell
go run main.go wire_gen.go
```
