# Hooks

## useState

Take your solution from the `Components / JSX` section and add following behaviour:

<iframe src="/exercises/react/hooks/useState/index.html" width="800px" height="950px"></iframe>

## useMemo

The calculate function runs on every click of the button and slows the application.
Can you improve the code by using useMemo?

!!! example

    ```javascript
    function Component() {
      const [state, setState] = React.useState(0);
      const calculate = () => {
        let a = 0;

        for (let i = 0; i < 10_000; i++) {
          for (let j = 0; j < 10_000; j++) {
            a += i + j;
          }
        }
        return a;
      };

      return (
        <div>
          <button onClick={() => setState(state + 1)}>Add +1</button>
          <pre>{state}</pre>
          {calculate()}
        </div>
      );
    }

    export default function App() {
      return <Component />;
    }
    ```

## useCallback

Woops, what is happening here?
If we click the first CustomButton component, the second CustomButton component gets rerendered.
Let's fix this by using `useCallback`.

!!! example

    ```js
    import React from "react";

    function CustomButton({ onClick, children }) {
      React.useEffect(() => {
        console.log(`button ${children} is rerendered!`);
      }, [onClick]);
      return <button onClick={onClick}>{children}</button>;
    }

    function Wrapper() {
      const [isCheckedFirst, setIsCheckedFirst] = React.useState(false);
      const [isCheckedSecond, setIsCheckedSecond] = React.useState(false);

      return (
        <>
          <CustomButton onClick={() => setIsCheckedFirst(!isCheckedFirst)}>
            First isChecked
          </CustomButton>
          <p>{isCheckedFirst ? "First is checked" : "First is not checked"}</p>

          <CustomButton onClick={() => setIsCheckedSecond(!isCheckedSecond)}>
            Second isChecked
          </CustomButton>
          <p>{isCheckedSecond ? "Second is checked" : "Second is not checked"}</p>
        </>
      );
    }
    ```
