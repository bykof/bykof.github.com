# Hooks

## State

If we use a variable inside of a component and it changes, React won't automatically update the DOM.
If you execute this code, you will see, that the variable increases but the DOM stays as it is.

```javascript
const UpdateYourself = () => {
  let myVariable = 1;
  setInterval(() => {
    myVariable += 1;
    console.log(myVariable);
  }, 500);
  return <p>{myVariable}</p>;
};
```

To let React update the DOM properly on changes and rerender only changed elements you have to use State… use State… useState().

Let's look at an example:

```javascript
import React, { useState } from 'react';

const UpdateYourself = () => {
  const [myVariable, setMyVariable] = useState(1);
  setInterval(() => {
    setMyVariable(myVariable + 1);
  }, 1000);
  return <p>{myVariable}</p>;
};
```

In the 1st line we import `useState`. In 4th line we call `useState` with the start value `1`.
`useState` returns a list `[state-variable, set-function]`.
The state-variable contains the value and the set-function to sets a new value.

Note: setting the state-variable like a common variable **won't work**, because it's a state variable (and for shure, also a const).

### Difference object - primitive value

If we have following component:

```javascript
import React, { useState } from 'react';

const Component = () => {
  const [primitive, setPrimitive] = useState(1);
  const [complex, setComplex] = useState({ firstName: 'Michael' });

  const onClick = () => {
    setPrimitive(primitive + 1);
    setComplex({ ...complex, firstName: 'Test' });
  };

  return (
    <button type='click' onClick={onClick}>
      {primitive} - {complex.firstName}
    </button>
  );
};
```

`setPrimitive` can be called easily with a "new" value, because the value of the variable `primitive` is a `primitive value`.
`setComplex` cannot be called by changing `firstName` in the variable `complex` like this:

This is wrong ❌
```
complex.firstName = 'Test'';
setComplex(complex);
```

It is bad, because this would not rerender the state.

Here is why:

If you compare two primitive values with the strict equality operator, surely two different values are different from each other:

```javascript
const a = 2;
const b = a + 1;

a === b // returns false
```

But if you compare the same object, even by changing it, it will be still the same object:

```javascript
const a = {firstName: 'Test'};
const b = a;

b.firstName = 'Michael';

a === b // returns true
```

Therefore React does not recognize, that your object has changed and it won't rerender.

## Lifecycle

<figure>
  <img src="/img/react_lifecycle.png"/>
  <figcaption>The react lifecycle</figcaption>
</figure>

When you build React components, sometimes it's needed to retrieve some values from
a server on the mount state of a component and unload data when a component unmounts.
Also sometimes some operations should recalculate values when a state variable changes.
For that `useEffect` was invented.

So imagine `useEffect` will be called every time something changes.
When the component `mounts`, `updates`, and `unmounts`, thus on every render cycle.

Let's start with an example:

```javascript
const App = () => {
  const [myVar, setMyVar] = useState(1);

  useEffect(() => {
    console.log('update on every change');
  });

  return (
    <div>
      <p>MyVar: {myVar}</p>
      <button type='button' onClick={() => setMyVar(myVar + 1)}>
        Increment MyVar
      </button>
    </div>
  );
};
```

On every rerender cycle, the passed function into useEffect will be called.
In the example above `useEffect` will be called on every button click.

### Dependencies

`useEffect` has a second parameter which should be a list of state-variables, which can change over time.
If we pass in the variables, `useEffect` is only called, when the passed variables inside the list change.

Example:

```javascript
const App = () => {
  const [myVar, setMyVar] = useState(1);
  const [anotherVar, setAnotherVar] = useState(1);

  useEffect(() => {
    console.log('update on myvar');
  }, [myVar]);

  useEffect(() => {
    console.log('update on anothervar');
  }, [anotherVar]);

  return (
    <div>
      <p>MyVar: {myVar}</p>
      <p>AnotherVar: {anotherVar}</p>
      <button type='button' onClick={() => setMyVar(myVar + 1)}>
        Increment MyVar
      </button>
      <button type='button' onClick={() => setAnotherVar(anotherVar + 1)}>
        Increment AnotherVar
      </button>
    </div>
  );
};
```

So if we click on the "Increment MyVar" button only "update on myvar" will be printed to the console. If we click "Increment AnotherVar" button only "update on anothervar" will be printed.

### Call it only once (only on mount)

But what if you want to call `useEffect` once - only on mount time of your component?

For this behaviour just pass an empty list as second argument. This will trigger useEffect once and stop it from watching any state-variables. Let's call this an "untracked" useEffect.

Here is an example:

```javascript
const App = () => {
  const [myVar, setMyVar] = useState(1);

  useEffect(() => {
    console.log('called on mount');
  }, []);

  return (
    <div>
      <p>MyVar: {myVar}</p>
      <button type='button' onClick={() => setMyVar(myVar + 1)}>
        Increment MyVar
      </button>
    </div>
  );
};
```

But what about the unmount time of a component?
If you want to execute code on unmount time of a component just return a function in an untracked useEffect:

```javascript
const MyButton = ({ unmount }) => {
  useEffect(() => {
    return () => {
      console.log('unmount mybutton');
    };
  }, []);
  return (
    <button type='button' onClick={unmount}>
      Unmount
    </button>
  );
};

const App = () => {
  const [showMyButton, setShowMyButton] = useState(true);
  const unmount = () => setShowMyButton(false);
  let myButtonContainer = null;
  if (showMyButton) {
    myButtonContainer = <MyButton unmount={unmount} />;
  }
  return { myButtonContainer };
};
```

## Reducer

Let's say you have to handle complex logic inside your component.
For example you want to have your logic based on an event or on a previous state.
Than reducer are your solution!

In a nutshell one can say: "If your state has a **workflow**, use reducers"

React provides us a hook for reducers. It's called `useReducer`.

It takes a `function` the "reducer" as first argument and an `initialState` as second argument.

InitialState is easy to comprehend, let's face reducer.

Reducer takes a state and an action. The state parameter is always the current state when the reducer is dispatched. Action is the action which you will provide when you dispatch.

`useReducer` returns, like useState, two variables in a list: `[state, dispatch]`.
The state of your reducer and a dispatch method.
Instead of setting a state like in `useState`, we now call the `dispatch` method and provide an `action` (which can be a string, a number, list or object).
Then the reducer function gets called.
Inside the reducer function the action gets evaluated.
Then a new state is returned.
And this is crucial: **It has to be a completely new object, not a modified old one.**

Why? -> [https://daveceddia.com/why-not-modify-react-state-directly/](https://daveceddia.com/why-not-modify-react-state-directly/)

```javascript
const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
};
```

## Custom Hooks

Custom Hooks are a really special topic.
It's loved by them who use it and hated by them who don't understand it.

Let's become the ones who use it :)

Let's image, we want to write a function, which attaches an event listener to the DOM's scroll event and saves the current position of the body to a variable.

We would write code like this:

`hooks/useBodyScrollPosition.js`

```javascript
import { useState, useEffect } from 'react';

const useBodyScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollPosition;
};
```

`components/One.js`

```javscript
import React from "react";
import useBodyScrollPosition from "./useBodyScrollPosition";

const One = () => {
 const scrollPosition = useBodyScrollPosition();
 return <div>{scrollPosition}</div>;
};

export default One;
```

`components/Two.js`

```javascript
import React from 'react';
import useBodyScrollPosition from './useBodyScrollPosition';

const Two = () => {
  const scrollPosition = useBodyScrollPosition();
  return <div>{scrollPosition}</div>;
};

export default Two;
```
