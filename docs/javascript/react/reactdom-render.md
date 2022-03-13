# ReactDOM.render

To render a React component into the DOM, react-dom exports a render function.

The function will render your React components instead of the provided HTML element.

```javascript
import { useState } from "react";
import ReactDOM from "react-dom";

const HelloWorld = () => {
  return <h1>Hello World</h1>;
};

ReactDOM.render(<HelloWorld />, document.getElementById("root"));
```

Note: We use the `HelloWorld` constant as an HTML-Element.

---

The example above would render like following:

from this:

```html
<html>
  <body>
    <div id="root"></div>
  </body>
</html>
```

to this:

```html
<html>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```
