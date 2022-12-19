# Context

Take this example and build a CounterContext and a CounterContextProvider to use a context.

The context should have two functions `countUp` and `countDown` and a value called `counter`.
`countUp` should add 1 to the current `counter` and `countDown` should subtract 1 from it.

!!! example

    ```js
    import React from 'react';

    function CounterDisplay() {
        return <p>{counter}</p>
    }

    function Counter() {
        return (
            <>
                <button onClick={countUp}>+</button>
                <button onClick={countDown}>-</button>
            </>
        )
    }

    function App() {
        return (
            <>
                <CounterDisplay>
                <Counter>
            </>
        )
    }
    ```
