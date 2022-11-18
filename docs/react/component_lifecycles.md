# Component Lifecycles

Here are the component lifecycles listed.

<iframe src="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/"
     style="width:100%; height:700px; border:0; border-radius: 4px; overflow:hidden;"
   ></iframe>

Let's talk about that a little bit deeper:

```js
import * as ReactDOM from "react-dom/client";

function Component({ prop }) {
  const [state, setState] = useState();
  React.useEffect(() => {
    console.log("this runs only on component mount");
    return () => {
      console.log("this run when the component unmounts");
    };
  }, []);

  React.useEffect(() => {
    console.log("this runs on every update of prop or state");
  }, [prop, state]);

  return <div></div>;
}

const root = createRoot(<Component />);
root.render(document.getElementById("app")); // <-- first time render
```
