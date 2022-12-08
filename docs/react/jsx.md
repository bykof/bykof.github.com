# JSX

JSX stands for **JavaScript XML**. JSX allows us to write HTML elements with JavaScript code. An HTML element has an opening and closing tags, content, and attribute in the opening tag. However, some HTML elements may not have content and a closing tag - they are self closing elements.

To create HTML elements in React we do not use the `createElement()` instead we just use JSX elements. Therefore, JSX makes it easier to write and add HTML elements in React. JSX will be converted to JavaScript on browser using a transpiler - [babel.js](https://babeljs.io/). Babel is a library which transpiles JSX to pure JavaScript and latest JavaScript to older version. See the JSX code below.

In conclusion with Babel this:

```js
const a = <h1 id="123">test</h1>
```

becomes this:

```js
'use strict'

const a = /*#__PURE__*/ React.createElement(
    'h1',
    {
        id: '123',
    },
    'test',
)
```

JSX is **stricter** than html.
If you write for example `<br>` in HTML this becomes valid.
If you write the same in JSX, it will throw an error.

Therefore you have to close every element properly:

```js
<br />
```

## Expressions in JSX

If you work with JSX, you can use expressions to inject values into jsx code:

!!! example

    ```js
    const value = 123
    const element = <p>{value}</p>
    ```

    ```html
    <p>123</p>
    ```

[Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) produce **values**.
According to MDN an expression is:

```
An expression is any valid unit of code that resolves to a value.
```

Do not confuse it with statements which produce code statements, assignments and expressions.

| Statements                                    | Expressions       |
| --------------------------------------------- | ----------------- |
| `let a = 1 + 2`                               | `1 + 2`           |
| `if (1 === 2) { return 3 } else { return 4 }` | `1 === 2 ? 3 : 4` |

For example, you can also use the result of a function inside of jsx:

!!! example

    ```js
    function formatName(user) {
        return `${user.firstName} ${user.lastName}`
    }

    const user = {
        firstName: 'Test',
        lastName: 'Tester',
    }

    const element = <h1>Hello, {formatName(user)}! </h1>
    ```

    ```html title="result"
    <h1>Hello, Test Tester</h1>
    ```

## Attributes in JSX

You can specify attributes in JSX:

```js
const h1Id = 'testId'
const element = <h1 id={h1Id}>Test</h1>
```

!!! warning

    Since JSX is closer to JavaScript than to HTML, React DOM uses camelCase property naming convention instead of HTML attribute names.

    For example, class becomes className in JSX, and tabindex becomes tabIndex.

## Children in JSX

We discussed simple elements for now.
But when HTML elements can have children, JSX elements can have them too:

```js
const container = (
    <div>
        <h1>Hello World</h1>
        <p>Some text</p>
    </div>
)
```

!!! warning

    Do not use nested elements without paranthesis.

    This is a **false** example:

    ```js
    const container =
        <div>
            <h1>Hello World</h1>
            <p>Some text</p>
        </div>

    ```

!!! warning

    Note that you cannot use multiple elements as JSX:

    ```js
    // this won't work!
    const container = (
        <h1>Hello World</h1>
        <p>Some text</p>
    )
    ```

You have to wrap multiple elements into an outer element.
This can be another html element or the 'empty' element `<>...</>`

For example:

!!! example

    ```js
    const container = (
        <div>
            <h1>Hello World</h1>
            <p>Some text</p>
        </div>
    )
    ```

    will result as HTML in the DOM as:

    ```html title="result"
    <div>
        <h1>Hello World</h1>
        <p>Some text</p>
    </div>
    ```

!!! example

    ```js
    const container = (
        <>
            <h1>Hello World</h1>
            <p>Some text</p>
        </>
    )
    ```

    will result als HTML in the DOM as:

    ```html title="result"
    <h1>Hello World</h1>
    <p>Some text</p>
    ```

## Adding styles

If you want to add a style to a JSX element, you can use `className` (instead of the html `class`) or `style`.
Please note, that `style` will be overwritten by Babel so that you cannot use just a string, but you use an object:

```js
const container = (
    <p style={{ color: 'red', fontSize: '' }} className={'bordered'}>
        abc
    </p>
)
```
