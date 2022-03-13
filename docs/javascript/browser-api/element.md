# Element

When retrieving an element from the `document` you will get an object which is an instance of [`HTMLElement`](https://developer.mozilla.org/de/docs/Web/API/HTMLElement).

<figure>
  <img src="/img/htmlElement.png" width="500" />
  <figcaption>HTMLElement</figcaption>
</figure>

[`HTMLElement`](https://developer.mozilla.org/de/docs/Web/API/HTMLElement) inherits from [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element).

[`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) inherits from [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node).

[`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) inherits from [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).

Which means that you are able to use all the functionality and properties provided by [`HTMLElement`](https://developer.mozilla.org/de/docs/Web/API/HTMLElement), [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element), [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) and [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).

## Manipulation

HTMLElements are directly bound to the DOM, which means that if you manipulate the HTMLElement this will reflect instantly in the DOM.

<figure>
  <img src="/img/element_manipulation.gif" width="500" />
  <figcaption>Instant bind of HTMLElement to the DOM</figcaption>
</figure>

Code:

```javascript
const element = document.getElementById("title");
element.innerText = "123";
```

Note that you cannot manipulate `Read only` fields like: `offsetLeft`, `dataset` and many more...

## Creation

Surely there is the possibility to **create** a HTMLElement.
Creating an element means to create it in the `document` first and then append it to an element you like.

```javascript
const divElement = document.createElement("div");
```

After creation you can append it to an element:

```javascript
const h1Element = document.createElement("h1");
h1Element.innerText = "Hello World!";
document.body.append(h1Element);
```

## Events

Because deep in the inheritance, the HTMLElement inherits from an EventTarget, you can use `addEventListener` to attach an event listener to an element.

For example:

```javascript
const element = document.getElementById("title");

element.addEventListener("click", (event) => {
  console.log(`${event} was clicked!`);
});
```

Here are all events: [Link](https://developer.mozilla.org/de/docs/Web/Events)
