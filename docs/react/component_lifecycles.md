# Component Lifecycles

Here are the component lifecycles listed.

<iframe src="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/"
     style="width:100%; height:700px; border:0; border-radius: 4px; overflow:hidden;"
   ></iframe>

Let's talk about that a little bit deeper:

!!! example

    ```js
    import React from "react";
    import * as ReactDOM from "react-dom/client";

    function Reactive({ prop }) {
      const [state, setState] = React.useState();

      // Runs on mount
      React.useEffect(() => {
        console.log("this runs only on component mount");

        // Runs on unmount
        return () => {
          console.log("this run when the component unmounts");
        };
      }, []);

      // Runs on every change of prop and state
      React.useEffect(() => {
        console.log("this runs on every update of prop or state");
      }, [prop, state]);

      // Returns on every state and prop change
      return <button onClick={() => setState("test")}>Click</button>;
    }

    function Component() {
      const [isShowReactive, setIsShowReactive] = React.useState(false);
      const [outerState, setOuterState] = React.useState("");
      return (
        <>
          {isShowReactive && <Reactive prop={outerState} />}
          <input
            value={outerState}
            onChange={(event) => setOuterState(event.target.value)}
          />
          <button onClick={() => setIsShowReactive(!isShowReactive)}>Toggle</button>
        </>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<Component />);
    ```
