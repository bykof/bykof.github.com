# Context

When we implement components, we want sometimes to have a shared and common state.
Especially when it comes to store and manipulate data from the server in one place, but to have it used in two deep nested components.

Let's start by defining a state in a variable:

```javascript
import { useContext } from "react";

const ClickContext = createContext();
```

`createContext` creates a `Context` object which provides a `Provider` object via `ClickContext.Provider`.
This `Provider` object is a React `component`, which passes its value prop to all child components, that subscribes to the `Context`.

```javascript
<ClickContext.Provider value={/* some value */}>
```

If the value of a `Provider` changes, all subscribed React components will be rerendered.

This `Provider` should wrap the top-level component, which then passes the value to its child components.

Let's first build a custom Provider with useState in a file called

`clickContext.js`

```javascript
import { useState } from "react";

export const ClickContext = createContext();
export const ClickContextProvider = ({ children }) => {
  const [clicks, setClicks] = useState(0);
  const value = { clicks, setClicks };
  return (
    <ClickContext.Provider value={value}>{children}</ClickContext.Provider>
  );
};
```

Note that we create a `ClickContext.Provider` component and pass in the value as object,
also we just render the children of our `ClickContextProvider` component
but wrapped in the `ClickContext.Provider` to pass the value to the child components.

Now we create some nested components to demonstrate the "magic hidden" passing of value to the child components.

Our structure will look like this:

<pre>
- ClickContextProvider
  |
  +--+ App
     |
     +--+ ClickContainer
        |
        +--+ Click
</pre>

```javascript
import { useContext } from "react";
import { ClickContext, ClickContextProvider } from "./clickContext";

const Click = () => {
  const { clicks, setClicks } = useContext(ClickContext);
  const onClick = () => setClicks(clicks + 1);
  return (
    <div>
      <button type="button" onClick={onClick}>
        Clicks {clicks}
      </button>
    </div>
  );
};

const ClickContainer = () => {
  return (
    <div>
      <p>ClickContainer</p>
      <Click />
    </div>
  );
};

const App = () => {
  return (
    <ClickContextProvider>
      <div className="App">
        <ClickContainer />
      </div>
    </ClickContextProvider>
  );
};

export default { Click, ClickContainer, App };
```

We import `ClickContext` and `ClickContextProvider` from our created file `clickContext.js`.

Then we create three components: `Click`, `ClickContainer`, and `App`.

We use the `ClickContextProvider` to wrap the top-level component and pass the value to all of its children in the `App` component.

The `ClickContainer` is just an empty container which does not passes any props or receives any props.
It's there for demonstration purpose.

The `Click` component now "grabs" the context with `useContext(ClickContext)`.

Please consider that it has to be exactly the imported `ClickContext`, otherwise it won't work.

With `useContext` we receive the data which has been passed to the value `ClickContext.Provider` in the `ClickContextProvider` componen.
So we receive an object with `clicks` and `setClicks` as keys and use it.
