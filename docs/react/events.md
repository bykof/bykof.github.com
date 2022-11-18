# Events

## What is an event?

An event is an action or occurrence recognized by a software. To make an event more clear let's use the daily activities we do when we use a computer such as clicking on a button, hover on an image, pressing a keyboard, scrolling the mouse wheel and etc. The react documentation has already a detail note about [events](https://reactjs.org/docs/events.html).

Handling events in React is very similar to handling elements on DOM elements using pure JavaScript. Some of the syntax difference between handling event in React and pure JavaScript:

- React events are named using camelCase, rather than lowercase.
- With JSX you pass a function as the event handler, rather than a string.

Let's see some examples to understand event handling.

Event handling in HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <button>onclick="greetPeople()">Greet People</button>
    <script>
      const greetPeople = () => {
        alert("Welcome");
      };
    </script>
  </body>
</html>
```

In React, it is slightly different

```js
import React from "react";
// if it is functional components
const App = () => {
  const greetPeople = (event) => {
    alert("Welcome");
  };
  return <button onClick={greetPeople}>Welcome</button>;
};
```

Another difference between HTML and React event is that you cannot return false to prevent default behavior in React.
You must call preventDefault explicitly. For example, with plain HTML, to prevent the default link behavior of opening a new page, you can write:

Plain HTML

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

However, in React it could be as follows:

<iframe src="https://codesandbox.io/embed/divine-fast-6egdo2?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="divine-fast-6egdo2"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
