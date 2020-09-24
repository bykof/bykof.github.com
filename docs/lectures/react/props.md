# Props

React provides a way to pass attributes to a component.
It's called **props**.

When we pass HTML-attributes to a React component,
they will be forwarded to the parameters of the React component function.

## Example

```javascript
const SayLoud = (props) => {
  return (
    <h1>
      {props.text} {props.anotherText}
    </h1>
  );
};

function Root() {
  return <SayLoud text="Hello" anotherText="World" />;
  // don't forget the closing style "/>"
}
```

## Destructure props

We can [destructure](../javascript-fundamentals/complex-values.md#destructuring_1) the props variable easily:

```javascript
const SayLoud = ({ text }) => {
  return <h1>{text}</h1>;
};

function Root() {
  const helloWorld = "Hello World";
  return <SayLoud text={helloWorld} />;
}
```
