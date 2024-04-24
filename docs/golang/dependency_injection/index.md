# Dependency Injection in Go

Dependency Injection in Go is a really important topic, because the programming language has a perfect basis to do dependency injection.
Interfaces and Structs can decouple your application perfectly.

Let's say we have a service which just redirects a call from a client to another service.

First we define our core logic and values:

```go linenums="1" title="core/value_objects/ttl_say_body.go"
package valueobjects

type TTSVoiceType string

const (
	TTSMaleVoice  TTSVoiceType = "male"
	TTSFemaleVoid TTSVoiceType = "female"
)

type TTSSayBody struct {
	Message      string       `json:"message"`
	TTSVoiceType TTSVoiceType `json:"ttsVoiceType"`
}
```

```go linenums="1" title="core/value_objects/ttl_say_response.go"
package valueobjects

type TTSSayResponse struct {
	Message string
	Status  int
}
```

```go linenums="1" title="core/ports/ttl_service_port.go"
package ports

import valueobjects "dependency_injection/core/value_objects"

type TTSServicePort interface {
	Say(ttsRequestBody valueobjects.TTSSayBody) (valueobjects.TTSSayResponse, error)
}
```

Then we implement the ports:

```go linenums="1" title="infrastructure/services/real_ttl_service.go"
package services

import (
	"bytes"
	"dependency_injection/core/ports"
	valueobjects "dependency_injection/core/value_objects"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type RealTTSService struct {
	url string
}

var _ ports.TTSServicePort = RealTTSService{}

func (r RealTTSService) formatEndpoint(endpoint string) string {
	return fmt.Sprintf("%s/%s", r.url, endpoint)
}

func (r RealTTSService) Say(ttsRequestBody valueobjects.TTSSayBody) (valueobjects.TTSSayResponse, error) {
	var ttsSayResponse valueobjects.TTSSayResponse

	postBody, _ := json.Marshal(ttsRequestBody)
	resp, err := http.Post(r.formatEndpoint("say"), "application/json", bytes.NewBuffer(postBody))
	defer resp.Body.Close()
	if err != nil {
		return valueobjects.TTSSayResponse{}, err
	}

	responseBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return valueobjects.TTSSayResponse{}, err
	}

	err = json.Unmarshal(responseBody, &ttsSayResponse)
	if err != nil {
		return valueobjects.TTSSayResponse{}, err
	}

	return ttsSayResponse, nil
}

func NewRealTTSService() *RealTTSService {
	fmt.Println("Init RealTTSService")
	return &RealTTSService{}
}
```

```go linenums="1" title="infrastructure/services/fake_ttl_service.go"
package services

import (
	"dependency_injection/core/ports"
	valueobjects "dependency_injection/core/value_objects"
	"errors"
	"fmt"
)

type FakeTTSService struct {
}

var _ ports.TTSServicePort = RealTTSService{}

func (f FakeTTSService) Say(ttsRequestBody valueobjects.TTSSayBody) (valueobjects.TTSSayResponse, error) {
	if ttsRequestBody.Message == "_Error!" {
		return valueobjects.TTSSayResponse{}, errors.New("custom error")
	}

	return valueobjects.TTSSayResponse{
		Message: fmt.Sprintf("Said: \"%s\" with voice %s", ttsRequestBody.Message, ttsRequestBody.TTSVoiceType),
		Status:  200,
	}, nil
}

func NewFakeTTSService() *FakeTTSService {
	fmt.Println("Init FakeTTSService")
	return &FakeTTSService{}
}
```

Now we can implement the interfaces for the application.
Here we inject the `TTSServicePort` into the MainController.
We execute a specific application functionality and receive a defined struct `TTSSayResponse`

```go linenums="1" title="interface/controllers/main_controller.go"
package controllers

import (
	"dependency_injection/core/ports"
	valueobjects "dependency_injection/core/value_objects"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type MainController struct {
	ttsService ports.TTSServicePort
}

func NewMainController(ttsService ports.TTSServicePort) *MainController {
	return &MainController{
		ttsService: ttsService,
	}
}

func (mc *MainController) Say(w http.ResponseWriter, r *http.Request) {
	var ttsSayBody valueobjects.TTSSayBody
	body, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		_, _ = w.Write([]byte(err.Error()))
		return
	}

	err = json.Unmarshal(body, &ttsSayBody)
	if err != nil {
		_, _ = w.Write([]byte(err.Error()))
		return
	}
	ttsSayResponse, err := mc.ttsService.Say(ttsSayBody)
	if err != nil {
		_, _ = w.Write([]byte(err.Error()))
		return
	}

	jsonResponse, err := json.Marshal(ttsSayResponse)
	if err != nil {
		_, _ = w.Write([]byte(err.Error()))
		return
	}
	_, _ = w.Write(jsonResponse)
	return
}
```

Now we wrap everything up in our `main.go` file and inject the dependencies now.
Here we inject a specific `TTSServicePort` depending on the environment variable:

```go linenums="1" title="main.go"
package main

import (
	"dependency_injection/core/ports"
	"dependency_injection/infrastructure/services"
	"dependency_injection/interface/controllers"
	"log"
	"net/http"
	"os"
)

func main() {
	var ttsService ports.TTSServicePort
	if os.Getenv("ENV") == "prod" {
		ttsService = services.NewRealTTSService()
	} else {
		ttsService = services.NewFakeTTSService()
	}
	mainController := controllers.NewMainController(ttsService)
	http.HandleFunc("/say", mainController.Say)
	log.Println("Running server on http://localhost:8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
```

We have the following structure now:

```
|-- core
|   |-- ports
|   |   `-- ttl_service_port.go
|   `-- value_objects
|       |-- tts_say_body.go
|       `-- tts_say_response.go
|-- go.mod
|-- infrastructure
|   `-- services
|       |-- fake_tts_service.go
|       `-- real_tts_service.go
|-- interface
|   `-- controllers
|       `-- main_controller.go
`-- main.go
```

There are teams who use this kind of dependency injection.
But if it becomes more complex, its easier to use a tooling like wire.
Let's check in the next chapter, how to do this.
