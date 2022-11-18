# Components

A React component is a small, reusable code, which is responsible for one part of the application UI. A React application is an aggregation of components. React can help us to build reusable components. The following diagram shows different components. All the components have different border colors. In React we assemble different components together to create an application. We use JavaScript functions or classes to make components. If we use a function, the component will be a functional component, but if we use a class, the component will be a class-based component.

Components can be:

- Functional Component / Presentational Component / Stateless Component / Dumb Component
- Class Component / Container Component / Stateful Component / Smart Component

The classification of components above does not work for the latest version of React, but it is good to know the former definition and how the previous versions work.

So, let us change all the JSX to components. Components in React are JavaScript functions, that return a JSX. Component name must start with an uppercase, and if the name is two words, it should be CamelCase - a camel with two humps.

In general class components will fade away in the future, therefore use **only functional components**!

## Big picture of components

In the previous section we agreed, that a website or an application is made of buttons, forms, texts, media objects, header, section, article and footer. If we have a million-dollar button, we can use this button all the time, instead of recreating it all over again, whenever we need a button. The same goes for input fields, forms, header or footer. That is where the power of the component comes. In the following diagram, the header, main and footer are components. Inside the main there is also a user card component and a text section component. All the different colors represent different components. How many colors do you see? Each color represent a single component. We have four components in this diagram, but they are reused multiple times.

![Components](../images/components_example.jpg)

## Creating React Components

Using a JavaScript function, we can make a functional React component.

```js
function ComponentName() {
  return <p>Content</p>;
}
```

The following expressions are a JSX element.

```js
function Header() {
  const title = "Getting Started React";
  const author = {
    firstName: "Michael",
    lastName: "Bykovski",
  };

  const content = (
    <header>
      <div>
        <h1>Welcome to Webengineering</h1>
        <h2>{title}</h2>
        <p>
          Instructor: {author.firstName} {author.lastName}
        </p>
      </div>
    </header>
  );
  return content;
}
```

```js
function Header() {
  return (
    <header>
      <div>
        <h1>Welcome to Webengineering</h1>
        <h2>Getting Started React</h2>
        <p>Instructor: Michael Bykovski</p>
      </div>
    </header>
  );
}
```

### Rendering components

Now, lets change all the JSX elements we had to components. When we call JSX element we use curly brackets and when we call components we do as follows `<ComponentName />`. If we pass an attribute, when we call the component name, we call it props `<ComponentName propsName={'propsValue'} />`.

Let's render first the `Header` component.

```js title="index.js"
import React from "react";
import ReactDOM from "react-dom";

function Header() (
  <header>
    <div>
      <h1>Welcome to Web Engineering</h1>
    </div>
  </header>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><Header/></React.StrictMode>);
```

Now, let's create an App component, that will wrap the Header, Main and Footer. Then the App component will be render on the DOM.

```js title="index.js"
import React from "react";
import ReactDOM from "react-dom/client";

const author = {
  firstName: "Michael",
  lastName: "Bykovski",
};

function Header() {
  const welcome = "Welcome to Webengineering";
  const title = "Getting Started React";
  const subtitle = "JavaScript Library";
  const date = "18. August 2022";
  return (
    <header>
      <div>
        <h1>{welcome}</h1>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>
          Instructor: {author.firstName} {author.lastName}
        </p>
        <small>Date: {date}</small>
      </div>
    </header>
  );
}

function Main() {
  const numOne = 3;
  const numTwo = 2;

  const result = (
    <p>
      {numOne} + {numTwo} = {numOne + numTwo}
    </p>
  );

  const yearBorn = 1994;
  const currentYear = new Date().getFullYear();
  const age = currentYear - yearBorn;
  const personAge = (
    <p>
      {author.firstName} {author.lastName} is {age} years old
    </p>
  );
  const techs = ["HTML", "CSS", "JavaScript"];
  const techsFormatted = techs.map((tech) => <li>{tech}</li>);
  return (
    <main>
      <div>
        <p>
          Prerequisite to get started{" "}
          <strong>
            <em>react.js</em>
          </strong>
          :
        </p>
        <ul>{techsFormatted}</ul>
        {result}
        {personAge}
      </div>
    </main>
  );
}

function Footer() {
  const copyRight = "Copyright 2022";
  return (
    <footer>
      <div className="footer-wrapper">
        <p>{copyRight}</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
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

### Injecting data to JSX in React Component

So far, we used static data on the JSX elements. Now let's pass different data types as dynamic data. The dynamic data could be strings, numbers, booleans, arrays or objects. Let us see each of the data types step by step. To inject data to a JSX we use the {} bracket.

In this section we inject only strings

```js
import React from "react";
import ReactDOM from "react-dom";

const welcome = "Welcome to 30 Days Of React";
const title = "Getting Started React";
const subtitle = "JavaScript Library";
const firstName = "Asabeneh";
const lastName = "Yetayeh";
const date = "Oct 3, 2020";

// JSX element, header
const header = () => {
  return (
    <header>
      <div className="header-wrapper">
        <h1>{welcome}</h1>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>
          Instructor: {firstName} {lastName}
        </p>
        <small>Date: {date}</small>
      </div>
    </header>
  );
};
const rootElement = document.getElementById("root");
// we render the App component using the ReactDOM package
ReactDOM.render(<Header />, rootElement);
```

### Further on Functional components

Let's create more components. What is the smallest size of a component? A component that returns only a single HTML as JSX is considered as a small component. A button component or an alert box component, or just an input field component.

```js
const Button = () => <button>action</button>;
```

The `Button` component is made of a single HTML button element.
Let's style this button using JavaScript style object. All CSS properties should be camelCase to make a JavaScript CSS object. If we pass a number without unit as CSS value, it is considered as px. See the example below.

```js
const buttonStyles = {
  padding: "10px 20px",
  background: "rgb(0, 255, 0",
  border: "none",
  borderRadius: 5,
};
const Button = () => <button style={buttonStyles}> action </button>;
```

The Button component is a dumb component, because it does not take any parameters and we cannot change the action text dynamically. We need to pass props to the button, to change the value dynamically. We will see props in the next section. Before we close today's lesson let's make another, more functional component, which displays a random hexadecimal number.

```js
import React from "react";
import ReactDOM from "react-dom/client";

// Hexadecimal color generator
const hexaColor = () => {
  let str = "0123456789abcdef";
  let color = "";
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * str.length);
    color += str[index];
  }
  return "#" + color;
};

const HexaColor = () => <div>{hexaColor()}</div>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HexaColor />
  </React.StrictMode>
);
```
