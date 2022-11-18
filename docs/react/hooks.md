# React Hooks

Hooks are a new addition in React 16.8. They allow you use state, life cycle methods and other React features without writing a class component. If we are using hooks we can have only a functional component in the entire application. For more detail explanation you check [React documentation](https://reactjs.org/docs/hooks-reference.html).

Different hooks have been introduced to React: Basic hooks and additional hooks

## Basic Hooks

The basic hooks are:

- useState
- useEffect
- useContext

### State Hook

Using hooks we can access state.

To use hooks, first we should import the `useState` hooks from react. The useState is a function which takes one argument (the initial value) and returns an array of the current state and a function that lets you update it.

<iframe src="https://codesandbox.io/embed/billowing-thunder-ikc99t?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="billowing-thunder-ikc99t"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### State with Data Types

If you use `useState` with primitive data types, there is no problem by using operators to set the state with the current value, like in our example above.

But if you use non-primitive data types you can't just change the value and set it, you have to create a "new" object or copy the old one and set it:

Here is a bad example, which won't work:

<iframe src="https://codesandbox.io/embed/fervent-euclid-kz7p7w?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="fervent-euclid-kz7p7w"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Here is the fixed example:

<iframe src="https://codesandbox.io/embed/flamboyant-sutherland-vhh539?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="flamboyant-sutherland-vhh539"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

The same happens to arrays:

<iframe src="https://codesandbox.io/embed/bold-brook-xo80sl?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="bold-brook-xo80sl"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Here is the fixed examle:

<iframe src="https://codesandbox.io/embed/strange-lovelace-jxcq5o?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="strange-lovelace-jxcq5o"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

When a state changes, React will check if the state is used somewhere and update the **element**.

### Effect Hook

Effects happen, when a state or a prop changes.
To watch for changes and do a sideeffect (not computing a value or not preparing a callback) you can use `useEffect`.

<iframe src="https://codesandbox.io/embed/distracted-shamir-0loh0g?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="distracted-shamir-0loh0g"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Context

`useContext` will be discussed later in the Context chapter.

## Additional Hooks

Additional Hooks can be used to express specific statements or to speed up your code.

- useReducer
- useCallback
- useMemo
- useRef
- useImperativeHandle
- useLayoutEffect
- useDebugValue
- useDeferredValue
- useTransition
- useId

#### Reducer

Reducer are handy if you have multiple actions for the same state.
For example, if you work on the same state with different functions, then a reducer can be used to define the actions on a state in one place:

<iframe src="https://codesandbox.io/embed/gifted-euler-c8ev6g?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="gifted-euler-c8ev6g"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Callbacks

Callbacks are important to pass a behaviour into a component from an outer scope.
Let's check this example first:

<iframe src="https://codesandbox.io/embed/sleepy-leavitt-prjj37?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="sleepy-leavitt-prjj37"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

You see that an update of our states results in an update for our buttons.
Let's improve the code by using `useCallback` to listen for specific changes:

<iframe src="https://codesandbox.io/embed/eager-rui-gimoud?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="eager-rui-gimoud"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Now the buttons does not update if the other button gets clicked.
This can lead to massive performance improvements.

#### Memo

If you have some operations, which take a lot of computing time, `useMemo`.
Actually I would say, use always `useMemo` if you calculate something depending on a state or prop.

Here is a bad example:

<iframe src="https://codesandbox.io/embed/eager-rui-gimoud?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="eager-rui-gimoud"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Here we use `useMemo`, additionally we define the dependency:

<iframe src="https://codesandbox.io/embed/loving-sunset-vpplqo?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="loving-sunset-vpplqo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Ref

What if you need to access to the actual html element in the dom, to call a function on the element?
You can `useRef` for that:

<iframe src="https://codesandbox.io/embed/silly-sanderson-4bwvc3?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="silly-sanderson-4bwvc3"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Imperative Handle

<iframe src="https://codesandbox.io/embed/interesting-nightingale-bs3rf6?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="interesting-nightingale-bs3rf6"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Layout Effect

`useLayoutEffect` works the same way `useEffect` works.
The signature is identical to useEffect, but it fires synchronously after all DOM mutations.
Use this to read layout from the DOM and synchronously re-render.
Updates scheduled inside useLayoutEffect will be flushed synchronously, before the browser has a chance to paint.

#### Debug Value

`useDebugValue` shows a value in React DevTools.

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // Show a label in DevTools next to this Hook  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? "Online" : "Offline");
  return isOnline;
}
```

#### Deferred Value

`useDeferredValue` receives a state variable and returns a new state variable, which will wait until all rendering finishes for the given state variable and then rerenders the deferred value.

```js
function Typeahead() {
  const query = useSearchQuery("");
  const deferredQuery = useDeferredValue(query);

  // Memoizing tells React to only re-render when deferredQuery changes,
  // not when query changes.
  const suggestions = useMemo(
    () => <SearchSuggestions query={deferredQuery} />,
    [deferredQuery]
  );

  return (
    <>
      <SearchInput query={query} />
      <Suspense fallback="Loading results...">{suggestions}</Suspense>
    </>
  );
}
```

#### Transition

`useTransition` can handle loading states.

<iframe src="https://codesandbox.io/embed/naughty-chandrasekhar-23n0ry?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="naughty-chandrasekhar-23n0ry"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### ID

`useId` is a hook for generating unique IDs that are stable across the server and client, while avoiding hydration mismatches.

!!! Warning

    `useId` is not for generating keys in a list. Keys should be generated from your data.

```js
function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type="checkbox" name="react" />
    </>
  );
}
```
