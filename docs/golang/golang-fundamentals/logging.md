# Logging

To use logging the `log` package provides a standard logger, which prints to the systems `Standard out`. [Source](https://pkg.go.dev/log#pkg-overview)

The documentation says:

> Package log implements a simple logging package. It defines a type, Logger, with methods for formatting output. It also has a predefined 'standard' Logger accessible through helper functions Print[f|ln], Fatal[f|ln], and Panic[f|ln], which are easier to use than creating a Logger manually. That logger writes to standard error and prints the date and time of each logged message. Every log message is output on a separate line: if the message being printed does not end in a newline, the logger will add one. The Fatal functions call os.Exit(1) after writing the log message. The Panic functions call panic after writing the log message.

So if you want to use the default logger, here is an example:

```go linenums="1"
func main () {
    a := 2
    logger := log.Default()
    logger.Print("Just print a string ", a)
    logger.Printf("print a digit: %d", a)
    logger.Fatal("print and os.Exit(1)")
    logger.Panic("print and panic")
}
```

output:

```
2009/11/10 23:00:00 Just print a string 2
2009/11/10 23:00:00 print a digit: 2
2009/11/10 23:00:00 print and os.Exit(1)
```

## JSON Logger

If you want to have a JSON logger, you can write one on your own.
Here you could use embedding, to support the log.Logger struct:

```go linenums="1"
type JSONLogger struct {
	log.Logger
}

func (l JSONLogger) Print(value interface{}) {
	bytes, err := json.Marshal(map[string]interface{}{
		"value": value,
		"time":  time.Now().Format("2006-01-02T15:04:05Z07:00"),
	})
	if err != nil {
		panic(err)
	}
	l.Logger.Print(string(bytes))
}

func NewJSONLogger(logger log.Logger) JSONLogger {
	return JSONLogger{
		Logger: logger,
	}
}

func main() {
	jsonLogger := NewJSONLogger(*log.New(os.Stdout, "", 0))
	jsonLogger.Print(struct {
		Name     string `json:"name"`
		LastName string `json:"lastName"`
	}{
		Name:     "hello",
		LastName: "world",
	})
}
```

## Zap Logger

The [Zap Logger](https://github.com/uber-go/zap) is faster than the default logger with the `encoding/json` package.

Let's check an example:

Add zap logger to your dependencies:

```
go get go.uber.org/zap
```

Then use the zap logger:

```go linenums="1"
import (
	"go.uber.org/zap"
)

func main() {
	developmentLogger, err := zap.NewDevelopment()
	if err != nil {
		panic(err)
	}
	productionLogger, err := zap.NewProduction()
	if err != nil {
		panic(err)
	}
	developmentLogger.Info("failed to fetch URL",
		zap.String("url", "url"),
	)
	productionLogger.Info("failed to fetch URL",
		zap.String("url", "url"),
	)
}
```

output:

```
2022-05-12T14:27:26.733+0200    INFO    bruh/main.go:16 failed to fetch URL     {"url": "url"}
{"level":"info","ts":1652358446.733641,"caller":"bruh/main.go:19","msg":"failed to fetch URL","url":"url"}
```

The Development Logger produces a tab separated string as log.
The Production Logger produces a json string as log.
