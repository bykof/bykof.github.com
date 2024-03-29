# Modules, Packages, and Imports

## Repositories, Modules, and Packages

There are three main concepts in Go: `repositories`, `modules`, and `packages`.

A `repository` is the location, where the source code of a project is stored.

A `module` is the root of a Go library or application, inside a `repository`.

`Modules` consist of one or more `packages`.

Before we use third-party libraries we need to declare that our project is a `module`.
Every module has it's own global unique identifier.
It's like in Java the `com.example.project.library` name.

In Go you usually use the location of your project, for example a Github repository.
It doesn't have to be the repository location, a unique name is also fine.

## go.mod

Create a module by using: `go mod init GLOBAL_UNIQUE_IDENTIFIER`
The `GLOBAL_UNIQUE_IDENTIFIER` is case-sensitive, therefore try to avoid uppercase letters.

Let's take a look a the `go.mod` if running the `go mod init` command.

```
module github.com/bykof/gostradamus

go 1.17

require github.com/stretchr/testify v1.7.0

require (
	github.com/davecgh/go-spew v1.1.0 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	gopkg.in/yaml.v3 v3.0.0-20200313102051-9f266ea9e77c // indirect
)
```

Beside the `require` section, there can be custom repositories like: `exclude` and `replace`.

## Cross Compiling

First we have to find available platforms, where we can compile to. ([Source](https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies))

To find all possible platforms use:

```sh
go tool dist list
```

output:

```
aix/ppc64
android/386
android/amd64
android/arm
android/arm64
darwin/amd64
darwin/arm64
dragonfly/amd64
freebsd/386
freebsd/amd64
freebsd/arm
freebsd/arm64
illumos/amd64
ios/amd64
ios/arm64
js/wasm
linux/386
linux/amd64
linux/arm
linux/arm64
linux/mips
linux/mips64
linux/mips64le
linux/mipsle
linux/ppc64
linux/ppc64le
linux/riscv64
linux/s390x
netbsd/386
netbsd/amd64
netbsd/arm
netbsd/arm64
openbsd/386
openbsd/amd64
openbsd/arm
openbsd/arm64
openbsd/mips64
plan9/386
plan9/amd64
plan9/arm
solaris/amd64
windows/386
windows/amd64
windows/arm
windows/arm64
```

This will print out all possible cross compilations, since Go 1.15 all possible platforms are built-in.
The format of the output is: `$GOOS/$GOARCH`.

Then you can use the following pattern for `$GOOS` and `$GOARCH` to cross compile your application:

```sh
GOOS=windows GOARCH=amd64 go build -o main.exe main.go
```

## Go generate

Go generate is a useful tool to run important project commands.

You can run it with:

```sh
go generate [-run regexp] [-n] [-v] [-x] [build flags] [file.go... | packages]
```

Go generate will not run automatically with go build, go test and go run.
It should be run manually and explicitly.

The command should be placed a go file at the top of the file:

For example we want to

```go linenums="1" title="main.go"
package main

//go:generate echo "Hello, Go Generate!"

func main() {}
```

If you run this file with following commands:

```
➜ go run main.go
➜ go generate
Hello, Go Generate!
```

You will see later why it's an important tool and how it can be used with [wire](../dependency_injection/wire.md).

## Go format

Go format is very important tool, to format your code upon Go conventions ([Source](https://go.dev/blog/gofmt)).

It make following standards possible:

-   easier to write: never worry about minor formatting concerns while hacking away,
-   easier to read: when all code looks the same you need not mentally convert others' formatting style into something you can understand.
-   easier to maintain: mechanical changes to the source don’t cause unrelated changes to the file’s formatting; diffs show only the real changes.
-   uncontroversial: never have a debate about spacing or brace position ever again!

To use it execute:

```sh
go fmt path/to/your/package
```

This will format your code automatically.

## Imports and Exports

In Go you can import exported:

-   constants
-   variables
-   functions
-   types

and you can export:

-   constants
-   variables
-   functions
-   types
-   methods in a struct
-   fields in a sruct

Exporting things in Go is managed by the **`capitalization`**.

This means, if you start the name of a function with an uppercase letter it gets `exported`, otherwise it's only visible inside a package.

```go linenums="1"
func Exported() {
    // this function can be accessed from other packages
}

func packageFunc() {
    // this function is only available in the package
}
```

## Packages

Creating and accessing packages very easy in Go.
Actually you just create a folder with the `package name`.
Then, every file inside the package should have a package clause.
The package clause can use the `package name` or another `custom package name`.

Let's look at an example:

```go linenums="1" title="math/math.go"
package math

func Double(a int) in {
    return a * 2
}
```

```go linenums="1" title="formatter/formatter.go"
package print

import "fmt"

func Format(num int) string {
    return fmt.Sprintf("The numer is %d", num)
}
```

```go linenums="1"
package main

import (
    "fmt"

    "example.com/formatter",
    "example.com/math",
)

func main() {
    num := math.Double(2)
    output := print.Format(num)
    fmt.Println(output)
}
```

The import path can be relative, but always use absolute paths with the repository name as root to the module name you want to import, separated by `/`.

In the example we imported `example.com/formatter` but we defined the packagein `formatter.go` to be `package print`.
This is because in Go the package declaration happens in the files itself **not** as directory name.
**BUT** the package name should be the same across a dirctory.
It won't work, if you mix package names in a directory.

## Overriding imports

It can happen, that you have to import two packages with the same name.
Therefore you can just overwrite the package name by using `import alias`.

Let's check an example:

```go linenums="1"
import (
    cryptoRand "crypto/rand"
    "math/rand"
)
```

## Documenting with godoc

With `godoc` you can document your repository and it's packages.
There are several rules, which you have to follow:

-   Place the comment directly before the item being documented with no blank lines between the comment and the declaration of the item
-   Start the comment with two forward slashes `//` followeg by the name of the item
-   Use a blank comment to break your comment into multiple paragraphs
-   Insert preformatted comment by indenting the lines

Comments before the package declaration create package level comments.

Generate comments by using the command: `go doc`.

## internal package

If you want to export constants or types between your packages in your module, but you don't want to export them outside of your repository, you can use internal packages.
Create a package called `internal`, everyting exported in the `internal` package will be accessable by the outer package or sibling package.

Here is an example:

```
├── bar
│   └── bar.go
├── foo
│   ├── foo.go
│   ├── internal
│   │   └── internal.go
│   └── sibling
│       └── sibling.go
├── go.mod
└── main.go
```

Only `foo` and `sibling` can access exported types from `internal`.
`bar` **cannot** access `internal`.

## Circular Dependency

Go doesn't allow you to have circular dependencies.

## Modules

Let's import now third party libraries by using the library: [decimal](https://pkg.go.dev/github.com/shopspring/decimal)

Here is an example:

```go linenums="1"
import (
    "fmt"
    "github.com/shopspring/decimal"
)

func main () {
    price, err := decimal.NewFromString("136.02")
	if err != nil {
		panic(err)
	}
    quantity := decimal.NewFromInt(3)
    total := price.Mul(quantity)
    fmt.Println("Total:", total)
}
```

If we run `go build` or `go run main.go` we get:

```
main.go:6:2: no required module provides package github.com/shopspring/decimal; to add it:
        go get github.com/shopspring/decimal
```

Here just run:

```
go get github.com/shopspring/decimal
```

We see that Go automatically added the required module to the `go.mod` it created a `go.sum` file
It took the latest version, since you did no specified one.
If the repository does not specify a version, Go will create a pseudo version, with a hash of the module:

```title="go.mod"
module decimal_example

go 1.18

require github.com/shopspring/decimal v1.3.1 // indirect
```

```title="go.sum"
github.com/shopspring/decimal v1.3.1 h1:2Usl1nmF/WZucqkFZhnfFYxxxu8LG21F6nPQBE5gKV8=
github.com/shopspring/decimal v1.3.1/go.mod h1:DKyhrW/HYNuLGql+MJL6WCR6knT2jwCFRcu2hWCYk4o=
```

## Versions

If you want a specific version of a module, just use `go get` with the `@vx.x.x` tag:

```
go get github.com/shopspring/decimal@v1.1.0
```

This will install decimal at version `v1.1.0`.

### Upgrade

If you want to upgrade a module to the latest version use:

```
go get -u github.com/shopspring/decimal
```

If you just want to upgrade the patch version use `-u=patch`.

```
go get -u=patch github.com/shopspring/decimal
```

### Vendoring

If you want to store the module inside the project folder without depending on the internet, you can use:

```
go mod vendor
```

This will create a `vendor` folder with downloaded module inside of it.
If you update the `go.mod` you have to rebuild the vendor folder again.

### Publishing

If you want to publish your module to the public, you can do it by upload it to a public repository like Github oder Gitlab.
Check my own repository for example: [https://github.com/bykof/gostradamus](https://github.com/bykof/gostradamus).

#### Versioning

Golang uses [`semantic versioning`](https://semver.org/) to create different versions of a module.

If you release a new version of your module just tag the main branch of you repository with `v1.0.0` or a preferred version.

### Proxying

If you run `go get` Go actually fetches the module from a Proxy Server ([https://proxy.golang.org]) where it holds copies of Go modules.
If module is not available Google's Proxy Server downloads and stores the module you requested.

If you do not want to use Google's Proxy Server but another one use:

```
GOPROXY=https://gocenter.io,direct go get ...
```

If you don't want to use Proxy Server at all and want to directly download the packages from the source use:

```
GOPROXY=direct go get ...
```

If you want to use your own proxy server in the company:

-   [Artifactory](https://jfrog.com/artifactory/)
-   [Sonatype](https://www.sonatype.com/)
-   [Athens](https://docs.gomods.io/)
-   [GOPROXY](https://goproxy.io)

Setup surch a service and point to the URL via `GOPROXY` env variable.

### Private Repositories

If you have private repositories but you are using a public proxy you can supress the call to a public proxy (by hiding the domain of your company for example):

```
GOPRIVATE=GOPRIVATE=*.corp.example.com,rsc.io/private
```
