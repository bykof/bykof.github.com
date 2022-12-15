# Props

## What is props?

Props is a special keyword in React that stands for properties and is being used to pass data from one component to another and mostly from parent component to child component. We can say props is a data carrier or a means to transport data.

I hope you are familiar with the JavaScript function. Most of the time, functions with parameters are smart and they can take dynamic data likewise props is a way we pass data or parameter to a component. Let's see the difference between a function and a component.

In a React component function you will always get the first parameter as an object, which represents your

!!! example

    ```js

    // JavaScript
    const getUserInfo = (firstName, lastName, country) => {
        return `${firstName} ${lastName}. Lives in ${country}.`
    }
    const userInfo = getUserInfo('Test', 'Tester', 'Finland')

    // JSX
    function User(props) {
        return (
            <div>
                <h1>
                    {props.firstName}
                    {props.lastName}
                </h1>
                <small>{props.country}</small>
            </div>
        )
    }

    const renderedUser = (
        <User firstName={'Test'} lastName={'Tester'} country={'Finland'} />
    )
    ```

<figure markdown>
  ![React passing props into JSX Element](../images/props.svg)
  <figcaption>React passing `props` into JSX Element</figcaption>
</figure>

## Children

If you nest JSX Elements you can decide how to wrap the child elements of your component.
The word `children` is a **reserved keyword** to pass in the child elements into your component.

You can pick elements and render them separately or render them all at one (which is the most common case)

!!! example

    ```js
    function User(props) {
        return (
            <div>
            {props.children}
            </div>
        )
    }

    const renderedUser = (
        <User>
            <p>Test</p>
            <p>Tester</p>
        </User>
    )
    ```

    the result is:

    ```html
    <div>
        <p>Test</p>
        <p>Tester</p>
    </div>
    ```

## Different data type props

### String props type

Strings are easy to pass into components

!!! example

    ```js
    function Component(props) {
        return <div>{props.text}</div>
    }

    const component = <Component text={'Hello World!'} />
    ```

    the result is:

    ```html
    <div>Hello World!</div>
    ```

### Number props type

Let's use a number props to a component

!!! example

    ```js
    function Component(props) {
        return <div>{props.year}</div>
    }

    const component = <Component year={2022} />
    ```

    the result is:

    ```html
    <div>2022</div>
    ```

### Boolean props type

We can pass boolean data types to a React component but **they do not get rendered**.

!!! example

    ```js
    function Component(props) {
        return <div>{props.isChecked}</div>
    }

    const component = <Component isChecked={true} />
    ```

    the result is:

    ```html
    <div></div>
    ```

Boolean types do not get rendered with their `.toString()` method.
Therefore you have to set the value, which should be rendered.

!!! example

    ```js
    function Component(props) {
        return <div>{props.isChecked ? 'is checked' : 'not checked'}</div>
    }

    const component = <Component isChecked={true} />
    ```

    the result is:

    ```html
    <div>is checked</div>
    ```

### Array props type

In programming arrays and objects are the most frequently used data structure to solve different problems and store data in a more structured way. Therefore, we encounter data in the form of an array quite often. Let's pass an array as props to a component

!!! example

    ```js
    function Component(props) {
        return <div>{props.skills}</div>
    }

    const component = <Component skills={['HTML', 'CSS', 'JavaScript']} />
    ```

    the result is:

    ```html
    <div>HTMLCSSJavaScript</div>
    ```

In this case, react tries to iterate over the array and render each element.
In the example above we are lucky, because we have only strings. If we would use something not renderable like a boolean, React wouldn't show anything.

!!! example

    ```js
    function Component(props) {
        return <div>{props.skills}</div>
    }

    const component = <Component skills={[true, false, true]} />
    ```

    the result is:

    ```html
    <div></div>
    ```

In the most cases you would wrap each element in a HTML element or prerender the given array elements:

!!! example "Wrap each array element in a HTML element"

    ```js
    function Component(props) {
        return <ul>{props.skills.map((skill) => <li>{skill}</li>)}</ul>
    }

    const component = <Component skills={['HTML', 'CSS', 'JavaScrip']} />
    ```

    the result is:

    ```html
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
    ```

!!! example "Render prerendered JSX element"

    ```js
    function Component(props) {
        return <ul>{props.skills}</ul>
    }

    const component = <Component skills={[<li>HTML</li>, <li>CSS</li>, <li>JavaScript</li>]} />
    ```

    the result is:

    ```html
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
    ```

### Object props type

We may pass an object as props to a React component. Let's see an example.

!!! example

    ```js
    function Component(props) {
        return <p>{props.user.firstName} {props.user.lastName}</p>
    }

    const component = <Component user={{firstName: 'Test', lastName: 'Tester'}} />
    ```

    the result is:

    ```html
    <p>Test Tester</p>
    ```

When we use an object as props we usually destructure the data to access the values. Destructuring makes our code easy to read.

!!! example

    ```js
    function Component(props) {
        const {firstName, lastName} = props.user
        return <p>{firstName} {lastName}</p>
    }

    const component = <Component user={{firstName: 'Test', lastName: 'Tester'}} />
    ```

    the result is:

    ```html
    <p>Test Tester</p>
    ```

### Function prop types

We can pass a function as props type to a React component. Functions passed in React Compoents are often used as callbacks

Let's see some examples

!!! example

    ```js
    function Component(props) {
        return <p>{props.callback()}</p>
    }

    const component = <Component callback={() => 'Hello World'} />
    ```

    the result is:

    ```html
    <p>Hello World</p>
    ```

## Default Props

You can define default or optional props, by assigning values or defining undefined to them:

!!! example

    ```js
    function Component({firstName = 'Default', lastName='Default'}) {
      return (
        <p>
          {firstName} {lastName}
        </p>
      );
    }

    const component = (
      <Component firstName={'Test'} lastName={'Tester'} />
    );

    const defaultComponent = <Component />;
    ```

    the result is:

    ```html
    <p>Test Tester</p>
    <p>Default Default</p>
    ```
