# Conditional Rendering

As we can understand from the term, conditional rendering is a way to render different JSX or component at different condition. We can implement conditional rendering using regular if and else statement, ternary operator and &&. Let's implement a different conditional rendering.

## Conditional Rendering using If and Else statement

The problem with using if and else statements is that you are not allowed to use hooks afterwards.

```js
const Component = ({ isAllowed }) => {
  if (isAllowed) {
    return <p>You are allowed</p>;
  }
  return <p>You are not allowed!</p>;
};
```

An if- and else statement inside a React component is done mostly at the bottom of the component.
See an example here:

```js
const Component = () => {
  const { isLoggedIn, isLoading } = React.useContext(AuthenticationContext);
  const [someState, setSomeState] = React.useState(false);

  if (!isLoggedIn) {
    return <p>You are not allowed to see this</p>;
  }

  if (!isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <p
      onClick={() => {
        setSomeState(!someState);
      }}
    >
      Currently its: {someState}
    </p>
  );
};
```

## Ternary operator

In most cases you want to switch inside your component between different views.
Therefore you will use the [conditional operator](https://javascript.info/ifelse#conditional-operator) the [OR operator](https://javascript.info/ifelse#conditional-operator) or the [AND Operator](https://javascript.info/ifelse#conditional-operator).

Here are some examples:

```js
const Component = ({ isAllowed }) => {
  return (
    <div>
      <h1>Here is a title</h1>
      <p>You are {isAllowed ? "allowed" : "not allowed"} to enter</p>
    </div>
  );
};
```

```js
const Component = ({ isAllowed }) => {
  return (
    <div>
      <h1>Here is a title</h1>
      <p>You are {!isAllowed && "not"} allowed to enter</p>
    </div>
  );
};
```

```js
const Component = ({ value, defaultValue }) => {
  return (
    <div>
      <h1>Here is a title</h1>
      <p>{value || defaultValue}</p>
    </div>
  );
};
```
