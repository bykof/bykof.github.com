# Component Structure

This site shows you some best practices for components and the structure inside of them.

Let's first see an example:

!!! example

    ```js

    export default function App({isLoggedIn, firstProp, children}) {

        const { value, setValue, isLoading, error } = React.useContext(SomeContext);

        // use states
        const [ state, setState ] = React.useState(false);

        // use memos
        const memo = React.useMemo(() => {
            ...
        }, [state]);

        // use or define callbacks

        // First define useCallbacks, which will be passed into child components
        const callback = React.useCallback(() => {
            ...
        }, [firstProp])

        // Second define local callbacks for html events
        const onClick = () => {

        }

        // use effects
        React.useEffect(() => {
            ...
        }, [firstProp])

        // make hard conditions
        if (!isLoggedIn) {
            return <p>Not allowed</p>
        }

        // return the actual component
        return (
            <>
                <p>You are logged in</p>
                <button onClick={() => setState(!state)}>Click</button>
                <button onClick={onClick}>Another Click</button>

                {/* if render child react components, use useCallback always! */}
                <AnotherComponent callback={callback}/>
            </>
        );
    }
    ```
