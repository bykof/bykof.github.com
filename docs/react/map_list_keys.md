# Mapping arrays

An array is the most frequently used data structure to handle many kinds of problems. In React, we use map to modify an array to list of JSX by adding a certain HTML elements to each element of an array.

## Mapping and rendering arrays

Most of the time data is in the form of an array or an array of objects. To render this array or array of objects most of the time we modify the data using `.map()`. In the previous section, we have rendered the techs list using a map method. In this section, we will see more examples.

In the following examples, you will see how we render an array of numbers, an array of strings, an array of countries and an array of skills on the browser.

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div>
      <h1>Numbers List</h1>
      {[1, 2, 3, 4, 5]}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

If you check the browser, you will see the numbers are attached together in one line. To avoid this, we modify the array and change the array elements to JSX element. See the example below, the array has been modified to a list of JSX elements.

### Mapping array of numbers

```js
import React from "react";
import ReactDOM from "react-dom/client";

function Numbers({ numbers }) {
  const list = numbers.map((number) => <li>{number}</li>);
  return list;
}

function App() {
  return (
    <div>
      <h1>Numbers List</h1>
      <Numbers numbers={[1, 2, 3, 4, 5]} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Mapping array of objects

Rendering array of objects

```js
import React from "react";
import ReactDOM from "react-dom/client";

function Country({ country: { name, city } }) {
  return (
    <div key={name}>
      <h1>{name}</h1>
      <small>{city}</small>
    </div>
  );
}

function Countries({ countries }) {
  return (
    <div>
      {countries.map((country) => (
        <Country country={country} />
      ))}
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Countries List</h1>
      <Countries
        countries={[
          { name: "Finland", city: "Helsinki" },
          { name: "Sweden", city: "Stockholm" },
          { name: "Denmark", city: "Copenhagen" },
          { name: "Norway", city: "Oslo" },
          { name: "Iceland", city: "Reykjavík" },
        ]}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Key in mapping arrays

Keys help React to identify items which have changed, added, or removed. Keys should be given to the elements inside the array to give the elements a stable identity. The key should be unique. Mostly data will come with as an id and we can use id as key. If we do not pass key to React during mapping it raises a warning on the browser. If the data does not have an id we have to find a way to create a unique identifier for each element when we map it. See the following example:

```js
import React from "react";
import ReactDOM from "react-dom/client";

function Country({ country: { name, city } }) {
  return (
    <div key={name}>
      <h1>{name}</h1>
      <small>{city}</small>
    </div>
  );
}

function Countries({ countries }) {
  return (
    <div>
      {countries.map((country) => (
        <Country key={country.name} country={country} />
      ))}
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Countries List</h1>
      <Countries
        countries={[
          { name: "Finland", city: "Helsinki" },
          { name: "Sweden", city: "Stockholm" },
          { name: "Denmark", city: "Copenhagen" },
          { name: "Norway", city: "Oslo" },
          { name: "Iceland", city: "Reykjavík" },
        ]}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
