# Architecture and Best Practices in Go

For best practices written by the Go team check out [`Effective Go`](https://go.dev/doc/effective_go)

Currently the best architecture for Go applications, in my opinion, is the domain driven hexagonal architecture: [Link](https://github.com/Sairyss/domain-driven-hexagon).

It's so suitable because Go provides loosely coupled interface implementation to use dependency injection and packaging makes it clear, which struct belongs to which "layer".

<div>
    <img src="https://github.com/Sairyss/domain-driven-hexagon/raw/master/assets/images/DomainDrivenHexagon.png"/>
</div>