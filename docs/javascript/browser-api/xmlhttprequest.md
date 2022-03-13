# XMLHttpRequest

"[XMLHttpRequest (XHR)](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) objects are used to interact with servers. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing. XMLHttpRequest is used heavily in AJAX (Asynchronous JavaScript and XML) programming."

```javascript
const request = new XMLHttpRequest();

request.onload = (event) => {
  const json = request.response;
  console.log(json);
};
request.open("GET", "http://echo.jsontest.com/key/value/one/two");
request.responseType = "json";
request.send();
```

`XMLHttpRequest` uses an **event-based** approach.
When the request is sent with `request.send()` the browser will send the prepared request and call the `onload` function of the `request` after the response was received.

Consider that after using the `request.send()` method the thread won't block!

<figure>
  <img src="/img/non_blocking_request.gif" width="500" />
  <figcaption>Non blocking request.send</figcaption>
</figure>
