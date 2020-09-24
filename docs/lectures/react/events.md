# Events

When we build rich web applications, we have to manage user interaction.

In JavaScript, we manage user interactions with events.

Normally, we would add an event listener to an html element and propose a callback to it when the event happens.

Here an example:

```html
<html>
  <body>
    <h1 id="hello">Test</h1>
    <script>
      document
        .getElementById("hello")
        .addEventListener("click", () => console.log("you clicked Test!"));
    </script>
  </body>
</html>
```

In React it's far simpler to attach an event listener to an element.
Here is a full list of [Supported React Events](https://reactjs.org/docs/events.html#supported-events).

And here is an example, how to use them:

```javascript
const HelloClick = () => {
  const onClick = (event) => {
    console.log("You clicked the button with: ", event);
  };
  return (
    <button type="button" onClick={onClick}>
      Click me
    </button>
  );
};
```
