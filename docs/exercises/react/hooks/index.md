# Hooks

## `useState`

Take your solution from the `Components / JSX` section and add following behaviour:

<iframe src="/exercises/react/hooks/useState/index.html" width="800px" height="400px"></iframe>

## `useMemo`

!!! example "Improve the code"

    ```js
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
