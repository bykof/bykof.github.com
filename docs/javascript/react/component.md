# Component

## Definition

_What is a component?_

Maybe you already heard about React and that it works component-based.

But from a scientific perspective - what makes a component a component?

Components consist of three main principles:

- Data
- Function
- Design

**Data** defines the data of your interface.

**Function** is the functionality, which a component provides.

**Design** adds a look to the component.

## Example

We already worked with distributed component-fragments: HTML, CSS and JS.

- **HTML** is our data
- **CSS** is our design
- **JS** is our function

The problem, that exists before react was invented, was that those **component-fragments were distributed**.

We had an `index.html`, `index.js`, and `index.css`.
We glued everything in the `index.html` together but all parts were lossless in their
own files which made it very hard to connect everything together in the head.

With React we have one file per component and we see on the first sight, what belongs together.
