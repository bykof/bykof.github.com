# Props

## What is props?

Props is a special keyword in React that stands for properties and is being used to pass data from one component to another and mostly from parent component to child component. We can say props is a data carrier or a means to transport data.

I hope you are familiar with the JavaScript function. Most of the time, functions with parameters are smart and they can take dynamic data likewise props is a way we pass data or parameter to a component. Let's see the difference between a function and a component.

```js
// function syntax
const getUserInfo = (firstName, lastName, country) => {
  return `${firstName} ${lastName}. Lives in ${country}.`;
};

// calling a functons
getUserInfo("Asabeneh", "Yeteyeh", "Finland");

//component syntax

// User component, component should start with an uppercase
function User(props) {
  return (
    <div>
      <h1>
        {props.firstName}
        {props.lastName}
      </h1>
      <small>{props.country}</small>
    </div>
  );
}
// calling or instantiating a component, this component has three properties and we call them props:firstName, lastName, country
<User firstName={"Asabeneh"} lastName={"Yetayeh"} country={"Finland"} />;
```

In the previous section, we injected data as follows and today we will change these data to props.

```js
const welcome = "Welcome to 30 Days Of React";
const title = "Getting Started React";
const subtitle = "JavaScript Library";
const author = {
  firstName: "Asabeneh",
  lastName: "Yetayeh",
};
const date = "Oct 4, 2020";

// Header Component
function Header() {
  return (
    <header>
      <div className="header-wrapper">
        <h1>{welcome}</h1>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>
          {author.firstName} {author.lastName}
        </p>
        <small>{date}</small>
      </div>
    </header>
  );
}
```

Instead of injecting data we can also pass the data as props. React props are similar to parameters in functions.

## Props object

React props is an object which you get instantly when you create a React component. Before we pass properties to the component, let's check what do we get in the props object.

```js
import React from "react";
import ReactDOM from "react-dom/client";

function Header(props) {
  console.log(props); // empty object, {}
  return (
    <header>
      <div>
        <h1>{}</h1>
        <h2>{}</h2>
        <h3>{}</h3>
        <p>
          {} {}
        </p>
        <small>{}</small>
      </div>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header />
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

In the above console.log(props), you would get an empty object({}). That means if you do not pass any attributes or properties when you instantiate the component, the props will be empty otherwise it will be populated with the data you passed as attributes and the proper name of these attributes are props.

Let's start with a simple example. In the example below, the welcome string has been passed as props in the Header components.

```js
import React from "react";
import ReactDOM from "react-dom/client";

function Header(props) {
  console.log(props); // empty object, {}
  return (
    <header>
      <div>
        <h1>{props.welcome}</h1>
        <p>
          {props.firstName} {props.lastName}
        </p>
      </div>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header
        welcome={"Welcome to Webengineering"}
        author={{ firstName: "Michael", lastName: "Bykovski" }}
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

Now, when you do console.log(props) you should get the following object, that means the welcome property we passed to the Header component can be found inside the props object.

```js
{
  "welcome": "Welcome to Webengineering",
  "author": {
    "firstName": "Michael",
    "lastName": "Bykovski"
  }
}
```

As you can see in the above code, we passed only single props to Header component, the welcome props. A component can have one or many props. Props could be different data types. It could be a string, number, boolean, array, object or a function. We will cover different kind of props in the next sections.

### Different data type props

### String props type

The data type of the props we pass an attribute to the component is a string.

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App(props) {
  return <div>{props.text}</div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App text={"Hello World!"} />
  </React.StrictMode>
);
```

Since you are a JavaScript ninja by now, you know what do do with this object.

As you can see from the above example, the value of the props are written statically. However, if we want to apply some logic it is hard to implement with statically written data, so it will be better to use a variable as props. Let's see the following example:

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App(props) {
  return <div>{props.text}</div>;
}

const text = "Hello World";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App text={text} />
  </React.StrictMode>
);
```

### Number props type

Let's use a number props to a component

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App(props) {
  return <div>{props.year}</div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App year={2022} />
  </React.StrictMode>
);
```

### Boolean props type

We can pass boolean data types to a React component.

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App(props) {
  return <div>{props.show ? "Is shown" : "Not shown"}</div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App show={true} />
  </React.StrictMode>
);
```

### Array props type

In programming arrays and objects are the most frequently used data structure to solve different problems and store data in a more structured way. Therefore, we encounter data in the form of an array quite often. Let's pass an array as props to a component

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App(props) {
  return <div>{props.skills}</div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App skills={["HTML", "CSS", "JavaScript"]} />
  </React.StrictMode>
);
```

If you see the result on the browser, the skills elements needs formatting. Therefore before we render, it should have some elements between each skill. To modify the array and to add a li element we can use map method. You should be very familiar with the functional programming map, filter and reduce to feel good at React if not please go back to day 1 JavaScript refresher. Let's apply map to modify the array.

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App(props) {
  return (
    <ul>
      {props.skills.map((skill) => (
        <li>{skill}</li>
      ))}
    </ul>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App skills={["HTML", "CSS", "JavaScript"]} />
  </React.StrictMode>
);
```

We will go in-depth about list and map in other sections. Now, let's see an object as a props.

### Object props type

We may pass an object as props to a React component. Let's see an example.
We can change the previous Header props to object. For the time being let's change a few properties for better understanding.

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App(props) {
  return (
    <div>
      {props.author.firstName} {props.author.age}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App author={{ firstName: "Michael", age: 28 }} />
  </React.StrictMode>
);
```

When we use an object as props we usually destructure the data to access the values. Destructuring makes our code easy to read. We will soon see the destructuring of props but before that let's see function as props for a React component.

### Function prop types

We can pass a function as props type to a React component. Let's see some examples

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App(props) {
  return <button onClick={props.onClick}>Click</button>;
}

const sayHi = (event) => {
  console.log(event);
  console.log("Hi");
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App onClick={sayHi} />
  </React.StrictMode>
);
```

Even we can write a function inside the curly bracket

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App(props) {
  return <button onClick={props.onClick}>Click</button>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App
      onClick={(event) => {
        console.log(event);
        console.log("Hi");
      }}
    />
  </React.StrictMode>
);
```

## Destructuring props

By now, I believe you are a JavaScript ninja and you know about destructing arrays and objects. Destructuring code to some extent makes easy to read. Let us destructure the props in Header component. Everything we passed as props is stored in props object. Therefore, props is an object and we can destructure the properties. Let's destructure some of the props we wrote in object props example. We can destructure in many ways:

1. Step by step destructuring

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App(props) {
  const {
    author: { firstName, age },
  } = props;
  return (
    <div>
      {firstName} {age}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App author={{ firstName: "Michael", age: 28 }} />
  </React.StrictMode>
);
```

2. Destructuring in one line

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App({ author: { firstName, age } }) {
  return (
    <div>
      {firstName} {age}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App author={{ firstName: "Michael", age: 28 }} />
  </React.StrictMode>
);
```

## Default Props

You can define default or optional props, by assigning values or defining undefined to them:

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App({ author: { firstName = "Default", age = null } }) {
  return (
    <div>
      {firstName} {age === null ? "No age defined" : age}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App author={{ firstName: "Michael" }} />
  </React.StrictMode>
);
```
