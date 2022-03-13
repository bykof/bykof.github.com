# Asynchronicity

If you use JavaScript there are several parts, which help you to get all the necessary APIs and functionality to work:

<figure>
  <img src="/img/js_apis.png" width="300" />
  <figcaption>JS Engines and APIs</figcaption>
</figure>

- JavaScript Engine is the JavaScript interpreter which runs your code and handles variables, etc.
- Platform Core is the platform dependent functionality, e.g. to send requests or to read files from local storage
- JS Standard Library brings all standard functionality, for example for Arrays or Objects
- Platform API provides platform dependent APIs to execute code which reads files or sends requests.

If you execute code, which needs heavy computational time, then this code will block the process.
That's because **JavaScript is single-thread only**.
So keep in mind, everything that runs in your JavaScript engine is **always in a single thread**!

If everything in JavaScript is single-threaded, why then Web UIs doesn't block if they send a request to a server, to wait until they receive the belonging response?

<figure>
  <img src="/img/event_loop.png" width="600" />
  <figcaption>The event loop of JavaScript</figcaption>
</figure>

Check this [Visualization](http://latentflip.com/loupe/?code=dmFyIG9uSW50ZXJ2YWwgPSBmdW5jdGlvbiAoKSB7CiAgY29uc29sZS5sb2coJ0ludGVydmFsJyk7CiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7CiAgICBjb25zb2xlLmxvZygnaGVsbG8gZnJvbSB0aW1lb3V0JykKICB9LCA1MDApCn0KCnNldEludGVydmFsKG9uSW50ZXJ2YWwsIDEwMDApOw%3D%3D!!!) to see how the event loop works.

## Callbacks

```javascript
const onInterval = () => {
  console.log("Executed on interval");
};

setInterval(onInterval, 1000);

setInterval(() => {
  console.log("Shorter way");
}, 1000);

const onInterval = () => {
  console.log("Before sleep");
  sleep(1500);
  console.log("After sleep");
};

const sleep = (milliseconds) => {
  const start = Date.now();
  while (Date.now() - start < milliseconds);
};

setInterval(onInterval, 1000);
```

## Promises

Promises are the default solution to program asynchronous code though there exist 'old' APIs with callback mechanisms.
Nevertheless this is not a big deal since **we can just wrap callbacks in Promises**.

<figure>
  <img src="/img/promises_states.png" width="300" />
  <figcaption>The three states of Promises</figcaption>
</figure>

Promises have three different states:

1. Pending - the Promise still waits for a result
2. Fulfilled - the Promise has finished and got a result (no errors)
3. Rejected - the Promise hash finished and got an error (no results)

```javascript
const addAsync = (x, y) => {
  return new Promise((resolve, reject) => {
    if (x === undefined || y === undefined) {
      return reject(new Error("Must provide two parameters"));
    } else {
      return resolve(x + y);
    }
  });
};

const prom = addAsync(1, 2);
prom
  .then((result) => {
    console.log(`The result is: ${result}`);
  })
  .catch((error) => {
    console.error(`There was an error: ${error}`);
  })
  .finally(() => {
    console.log("Runs always, either its an error or a result");
  });
```

### Exceptions in Promises

```javascript
const myError = new Error("My error!");

const promise = new Promise((resolve, reject) => {
  resolve(123);
});

promise
  .then((result) => {
    console.log(`Result is ${result} but i will throw an error`);
    throw myError;
  })
  .catch((error) => {
    console.error(`Error is: ${error}`);
  });
```

### Returning in then()

```javascript
const addAsync = (x, y) => {
  return new Promise((resolve, reject) => {
    if (x === undefined || y === undefined) {
      reject(new Error("Must provide two parameters"));
    } else {
      resolve(x + y);
    }
  });
};

const multAsync = (x, y) => {
  return new Promise((resolve, reject) => {
    if (x === undefined || y === undefined) {
      reject(new Error("Must provide two parameters"));
    } else {
      resolve(x * y);
    }
  });
};

addAsync(1, 2)
  .then((result) => {
    console.log(`Add result is: ${result}`);
    return multAsync(result, 4);
  })
  .then((result) => {
    console.log(`Mult result is: ${result}`);
  })
  .catch((error) => {
    console.error(`There was an error: ${error}`);
  });
```

## Async

Async functions are just a syntactic wrapper for Promises.
**This means that you can use Promises and async/await interchangeable.**

But it's better to prefer the async/await syntax since it's more clear and most developers prefer the procedural style.

```javascript
const fetchJsonViaPromises = (url) => {
  return fetch(url)
    .then((request) => request.text())
    .then((text) => JSON.parse(text))
    .catch((error) => {
      console.error(error);
    });
};

const fetchJsonAsync = async (url) => {
  try {
    const request = await fetch(url);
    const text = await request.text();
    return JSON.parse(text);
  } catch (error) {
    console.error(error);
  }
};
```

## Interchangeability

```javascript
const addAsync = async (x, y) => {
  return x + y;
};

addAsync
  .then((result) => {
    console.log(`Result is: ${result}`);
  })
  .catch(console.error);
```
