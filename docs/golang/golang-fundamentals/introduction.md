# Introduction

## History

> The Go programming language was conceived in late 2007 as an answer to some of the problems we were seeing developing software infrastructure at Google. The computing landscape today is almost unrelated to the environment in which the languages being used, mostly C++, Java, and Python, had been created. The problems introduced by multicore processors, networked systems, massive computation clusters, and the web programming model were being worked around rather than addressed head-on. Moreover, the scale has changed: today's server programs comprise tens of millions of lines of code, are worked on by hundreds or even thousands of programmers, and are updated literally every day. To make matters worse, build times, even on large compilation clusters, have stretched to many minutes, even hours.

> Go was designed and developed to make working in this environment more productive. Besides its better-known aspects such as built-in concurrency and garbage collection, Go's design considerations include rigorous dependency management, the adaptability of software architecture as systems grow, and robustness across the boundaries between components.

[Source](https://talks.golang.org/2012/splash.article#TOC_1)

Pain points at Google:

-   slow builds
-   uncontrolled dependencies
-   each programmer using a different subset of the language
-   poor program understanding (code hard to read, poorly documented, and so on)
-   duplication of effort
-   cost of updates
-   version skew
-   difficulty of writing automatic tools
-   cross-language builds

## Gopher

<figure>
  <img src="/img/golang/gophers/gopher.jpg" width="250" />
  <figcaption>Original Gopher</figcaption>
</figure>

<figure style="display: flex; flex-wrap: wrap;">
  <img src="/img/golang/gophers/gopher_fun_0.jpg" style="object-fit: contain; width: 200px; height: 200px;"/>
  <img src="/img/golang/gophers/gopher_fun_1.jpg" style="object-fit: contain; width: 200px; height: 200px;" />
  <img src="/img/golang/gophers/gopher_fun_2.jpg" style="object-fit: contain; width: 200px; height: 200px;" />
  <img src="/img/golang/gophers/gopher_fun_3.png" style="object-fit: contain; width: 200px; height: 200px;" />
  <img src="/img/golang/gophers/gopher_fun_4.png" style="object-fit: contain; width: 200px; height: 200px;" />
  <figcaption style="flex-grow: 1;">Funny Gophers from different projects</figcaption>
</figure>

## Projects using Golang

-   Docker
-   Kubernetes
-   Gogs
-   InfluxDB
-   Snappy
-   Minio
-   Mattermost
-   OpenShift
-   [Pocketbase](https://pocketbase.io/)

## Key Benefits

Deploy across platforms in record speed

For enterprises, Go is preferred for providing rapid cross-platform deployment. With its goroutines, native compilation, and the URI-based package namespacing, Go code compiles to a single, small binary—with zero dependencies—making it very fast.
Leverage Go’s out-of-the-box performance to scale with ease

Tigran Bayburtsyan, Co-Founder and CTO at Hexact Inc., summarizes five key reasons his company switched to Go:

-   Compiles into a single binary — “Using static linking, Go actually combining all dependency libraries and modules into one single binary file based on OS type and architecture.”
-   Static type system — “Type system is really important for large scale applications.”
-   Performance — “Go performed better because of its concurrency model and CPU scalability. Whenever we need to process some internal request, we are doing it with separate Goroutines which are 10x cheaper in resources than Python Threads.”
-   No need for a web framework — “In most of the cases you really don’t need any third-party library.”
-   Great IDE support and debugging — “After rewriting all projects to Go, we got 64 percent less code than we had earlier.”

## The good

-   Simplicity
-   Fast
-   Built-in Build and Package Management
-   Type Switch
-   Concurrency
-   Values vs Pointers

### Simplicity

Go aims to be a simple programming language.
It has a minimal set of language constructs.
It makes simple project and package module structures possible.
The visibility control only relies on public or private exports.
Data Structures can be easily defined by just a few possibilities: Structs, Maps, Arrays.
Testing is very easy in Golang, thanks to built-in commands and libraries.

### Fast

Go programs being compiled down to machine code, and having a static type system, makes it really fast during the execution.
Also, the startup time is much less than to something like Java or any JVM language.

### Built-in Build and Package Management

Golang has a built-in build and package management what makes it easy to maintain packages.
This eliminates the requirement for a third-party package and build management systems like Gradle, Maven, make, etc., and makes life so much easier for developers.

### Type Switch

In Golang it's possible to do easy type switches instead of doing expensive operations like `instanceof` (Java).

### Visibility Control

Visibility Control can be managed by using public or private variables, constants, and methods.

### Concurrency

Golangs concurrency model is really simple.
Goroutines make it possible to start a managed concurrency model.

### Values vs. Pointers

Go supports pass-by-value and pass-by-reference.

## The bad

-   No Constructors
-   Error Checking
-   Confusing Design
-   <s>No Generics</s>
-   (No Inheritance)

### No constructors

In Golang there are no constructors, you have to write constructors for structs by yourself.

### Error Checking

Each and every error has to be checked.

### Confusing Design

There are some patterns, like the public/private concept and error handling and many more, which can confuse the first time.

### No Generics

This isn't true anymore :)

### No Inheritance

There is a lot of rumor about Golang, that it does not support inheritance.
This is not really correct, it actually has a concept for that, which is called embedding.
But it just differs from known concepts about inheritance.

### Which IDE to choose?

-   [Jetbrains Goland](https://www.jetbrains.com/go/) - paid, preferred
-   [VSCode](https://code.visualstudio.com/) - free
    -   [Go Extension](https://code.visualstudio.com/docs/languages/go) - free
-   [LiteIDE](http://liteide.org/en/liteide/) - free, untested

## Installation

To install Golang simply see: [go.dev / Download and install](https://go.dev/doc/install)

Mac users can install golang with brew: `brew install go`

Windows users can install golang with Chocolatey: `choco install golang`

## Hello World!

```go linenums="1" title="main.go"
package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}
```

To build and run it, simply run: `go run main.go`

## Playground

You can always use [Go Playground](https://go.dev/play/) to play around with go or just use it as "REPL" editor.

## Is it "Go" or "Golang"?

Usually you say: "Go".

This is the official name of the programming language.

The only reason why some people say "Golang" is, because it helps to identify the term more as programming language and to use it as google query.
Also the first domain was reserved for [golang.com](https://golang.com) but now it became [go.dev](https://go.dev).

## Books and Sources

-   [Effective Go](https://go.dev/doc/effective_go)
-   [Learning Go](https://www.amazon.de/Learning-Go-Idiomatic-Real-World-Programming/dp/1492077216/ref=sr_1_1?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=E0M6HCWVJ1O&keywords=learning+go&qid=1651558957&sprefix=learning+go%2Caps%2C87&sr=8-1)
-   [The Go Programming Language](https://www.amazon.de/Programming-Language-Addison-Wesley-Professional-Computing/dp/0134190440/ref=sr_1_1?keywords=go+programming&qid=1651558990&sprefix=go+progr%2Caps%2C78&sr=8-1)
-   [Go by Example](https://gobyexample.com/)
-   [Go Cookbook](https://golangcookbook.com/)
