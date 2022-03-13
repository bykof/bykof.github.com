# Render Engine

Image we want to build a render engine in JavaScript.

So for example we want to build a todo list with plain JavaScript.

We would maybe start with this:

`index.html`

```html
<html>
  <head>
    <script type="text/javascript" src="./index.js"></script>
  </head>
  <body>
    <div id="main"></div>
  </body>
</html>
```

`index.js`

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main");

  const input = document.createElement("input");
  input.type = "text";
  main.appendChild(input);

  const button = document.createElement("button");

  button.type = "button";
  button.innerText = "Click!";
  main.appendChild(button);

  const list = document.createElement("ul");
  list.id = "list";
  main.appendChild(list);

  button.addEventListener("click", (event) => {
    const inputValue = input.value;
    if (inputValue === "") return;

    const listItem = document.createElement("li");
    listItem.innerText = inputValue;
    const list = document.getElementById("list");
    list.appendChild(listItem);
  });
});
```

---

Now let's proceed and abstract the creation of the elements,
so that we build the first steps of a rendering engine.

`index.js`

```javascript
const createElement = (name, attributes = {}, children = []) => {
  const element = document.createElement(name);

  for (const attribute of Object.keys(attributes)) {
    element.setAttribute(attribute, attributes[attribute]);
  }

  for (const child of children) {
    if (typeof child === "string") {
      const textNode = document.createTextNode(child);
      element.appendChild(textNode);
    } else {
      element.appendChild(child);
    }
  }
  return element;
};

document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main");
  const input = createElement("input", { type: "text" });
  const button = createElement("button", { type: "button" }, ["Add"]);
  const list = createElement("ul");

  main.appendChild(input);
  main.appendChild(button);
  main.appendChild(list);

  button.addEventListener("click", (event) => {
    const inputValue = input.value;
    if (inputValue === "") return;

    const listItem = createElement("li", {}, [inputValue]);
    list.appendChild(listItem);
  });
});
```

With `createElement` we build a small rendering engine,
which is, in an abstract way, exactly how react works.
