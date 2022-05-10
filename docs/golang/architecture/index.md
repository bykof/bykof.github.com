# Architecture and Best Practices in Go

For best practices written by the Go team check out [`Effective Go`](https://go.dev/doc/effective_go)

Currently the best architecture for Go applications, in my opinion, is the domain driven hexagonal architecture: [Link](https://github.com/Sairyss/domain-driven-hexagon).

It's so suitable because Go provides loosely coupled interface implementation to use dependency injection and packaging makes it clear, which struct belongs to which "layer".

<div>
    <img src="https://github.com/Sairyss/domain-driven-hexagon/raw/master/assets/images/DomainDrivenHexagon.png"/>
</div>

## Two Known Architecture Principles

There are two known architecture principles in Go.
The "flat" architecture and the "domain driven" architecture.

Let's take a look at two examples:

1. [Cobra](https://github.com/spf13/cobra)
2. [Go Cache](https://github.com/eko/gocache)

Cobra uses the flat architecture.
Go Cache uses the domain driven approach, at least it utilizes packages.

Mostly the flat architecture is used, when the Go programm is small and does just one thing.
If the Go program becomes more complicated and does several things, I would suggest to use the domain driven hexagonal approach.
