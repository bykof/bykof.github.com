# JSX

*JSX is the solution to avoid separation of technologies, but rather support separation of concerns*

## Example

This is an easy JSX example, where we create a simple React component:

```javascript
const HelloWorld = () => {
  return <h1>Hello World</h1>;
};
```

Transpiling JSX into JavaScript with [Babel](https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBAEgUwDZJAdRAJyQExgXhgAoBKAgPhgG8AoGGTBKAV0zBgB4ALARnMRQgYGbDg4B6XuQDcNAL7SgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.11.6&externalPlugins=) will look like this:

```javascript
"use strict";

var HelloWorld = function HelloWorld() {
  return /*#__PURE__*/ React.createElement("h1", null, "Hello World");
};
```

## Scopes

When writing JSX inside of a component, one cannot just code JavaScript again:

```javascript
const HelloWorld = () => {
  const helloWorld = "Hello World";
  return <h1>helloWorld</h1>; // ← this will not work!
};
```

Instead of the example above we have to use curly braces to enter into a javascript context again.
Note: Curly braces evaluate only a javascript expression [Link]!

```javascript
const HelloWorld = () => {
  const helloWorld = "Hello World";
  return <h1>{helloWorld}</h1>;
};
```

In conclusion, JSX follows two concepts:

<pre>
- JS Scope
  |
  +-+ HTML Scope
  |
  +-+ JS expression Scope
</pre>

If you are in the JS Scope you can program JavaScript without restrictions. If you switch to the HTML scope with an HTML element, you can only proceed with HTML:

```html
<div>[ here is the HTML Scope ]</div>
```

Switching from HTML scope to JS expression scope with curly braces `{}` allow only to use JS expressions, these are only JS statements which return a value like:

```jsx
<p>{1+2}</p>
<p>
  {
    [1, 2, 3].map(
      (val) => val + 1
    ).reduce(
      (acc, val) => acc + val, 0
    )
  }
</p>
<p>`Result is ${1+2}`</p>
```

When using JSX in multi lines then wrap it in round brackets:

```javascript
const HelloWorld = () => {
  return (
    <h1>
      <u>Hello World underlined</u>
    </h1>
  );
};
```

You can also store JSX in a variable:

```javascript
const HelloWorld = () => {
  const underlinedHelloWorld = <u>Hello World underlined</u>;
  return underlinedHelloWorld;
};
```

Or store it in a variable and reuse it inside JSX:

```javascript
const HelloWorld = () => {
  const i = 2;
  let text;
  if (i % 2 === 0) {
    text = <p>i is divisible by two</p>;
  } else {
    text = <p>i is not divisible by two</p>;
  }

  return <div>{text}</div>;
};
```
