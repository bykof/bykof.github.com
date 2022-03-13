# HTML

This is a default HTML document.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Sample page</title>
    <script type="text/javascript" src="./index.js">
  </head>
  <body>
    <h1>Sample page</h1>
    <p>This is a <a href="demo.html">simple</a> sample.</p>
    <!-- this is a comment -->
  </body>
</html>
```

The `<!DOCTYPE html>` is actually not a HTML-element but it describes the document as a HTML-document for the browser.

Then it starts with the most outer element `<html>...</html>`. It holds the `<head></head>` and `<body></body>` elements together.

## `<head>`

Within the `<head>` element we define properties of the document "which we don't see" (except the title).

We also define here links to other documents like JavaScript and CSS files.

## `<body>`

Within the `<body>` element we define elements of the documents "which we will see".
