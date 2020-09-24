# Children

When opening an html element and closing it `<h1><u>Children</u></h1>`,
one can enter text or additional html elements inside the `h1` element as `u` and `Children` for example.

React solved this by passing **a children key into props**.

**Note:** The children entry in props is created automatically.

For example:

```javascript
const SayLoud = ({ children }) => {
  return <h1>{children}</h1>;
};

function Root() {
  return (
    <SayLoud>
      <u>Hello World</u>
    </SayLoud>
  );
}
```

And a combined example:

```javascript
const SayLoud = ({ isLoud, children }) => {
  if (isLoud) {
    return <h1>{children}</h1>;
  } else {
    return <h2>{children}</h2>;
  }
};

const Root = () => {
  return <SayLoud isLoud={false}>Hello World</SayLoud>;
};
```
