# Browser vs. Node

<figure>
  <img src="/img/browser_vs_node.png" width="500" />
  <figcaption>The difference between node and browser environment</figcaption>
</figure>

The red blocks are displaying the different environments, where the JavaScript engine (V8, the blue block) can be embedded.

On the left side in the image there is the browser environment, which provides a `Browser API`.
On the right side in the image ther is the node (system) environment, which provides a `Node API`.

So `V8` is the interpreter that understands all JavaScript Code and just executes it, beside that we also need ways to access the browser or system.
Accessing the browser's DOM (document object model) or a specific directory in the system's file-system is not given by "just" running V8.
Therefore the environments (browser, node) attach specific APIs to your JavaScript environment.

## Browser API

The Browser API is able to deliver functionality to run specific tasks in the browser, like showing an alert box, fetching and modifying a DOM-element or sending a HTTP-request.

The most important Browser API object is: [window](https://developer.mozilla.org/en-US/docs/Web/API/Window)

All properties and methods of the Window object are exposed to the global environment.

```javascript
const element = window.document.getElementById("main");
// is the same as
const element2 = document.getElementById("main");
```

There are also more APIs: [Web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)

## Node API

The Node API is able to deliver functionality to run specific tasks on the system, like reading a file in a directory, get system information, creating a TCP-socket.

There is no "global object", which holds all important functionality.

There are a lot of different objects like `crypto`, `child_process` or `timers`.
