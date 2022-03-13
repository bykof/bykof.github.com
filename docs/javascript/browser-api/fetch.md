# Fetch

`Fetch` is a new approach to send HTTP requests to servers.

Fetch uses a **promise-based** approach.

```javascript
fetch("http://echo.jsontest.com/key/value/one/two")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
  });
```

Surely you can use the **promise-based** approach with **async/await**:

```javascript
const receiveOneTwo = async () => {
  try {
    const response = await fetch("http://echo.jsontest.com/key/value/one/two");
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};

receiveOneTwo().catch(console.error);
```
