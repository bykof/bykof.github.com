# DOM (Document Object Model)

The Javascript DOM (Document Object Model) is an interface that allows developers to manipulate the content, structure and style of a website.

<figure>
  <img src="/img/dom.png" width="500" />
  <figcaption>Document Object Model</figcaption>
</figure>

The DOM `document` is the owner of all other objects in your webpage.
That means if you want to access any object on your webpage you always have to start with the document.
It also contains many important properties and methods that enable us to access and modify our website.

The document is attached to the `window` object.

Therefore you could use both:

```javascript
window.document;
// or
document;
```

## `<document>`

### Finding elements

To find an element there are functions starting with `getElementBy...`:

`index.html`:

```html
<p id="title">This is my title</p>
<p class="text">A text</p>
<p class="text">Another text</p>
```

`index.js`:

```javascript
const title = document.getElementById("title");
const texts = document.getElementsByClassName("text");
const pElements = document.getElementsByTagName("p");
```

### Queryselector

With a queryselector it's possible to retrieve the elements via [CSS-selectors](https://developer.mozilla.org/de/docs/Web/CSS/CSS_Selectors)

`index.html`:

```html
<p id="title">This is my title</p>
<p class="text">A text</p>
<p class="text">Another text</p>
```

`index.js`:

```javascript
const title = document.querySelector("#title");
const texts = document.querySelectorAll(".text");
const pElements = document.querySelectorAll("p");
```
