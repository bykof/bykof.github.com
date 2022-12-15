# Context

Context is a very important tool to pass states and props to underlying components.

<iframe src="https://codesandbox.io/embed/dank-cookies-e0zybe?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="dank-cookies-e0zybe"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Tutorial

First we have to build our context.

Let's start by creating a folder called: `contexts` and inside it we will create a file called `CheckContext.js`.
In the file we create a CheckContext constant which should be exported.
We pass the default value in `React.createContext({})`, which is an empty object `{}`.

After that we create a provider `CheckContextProvider` of the context, which receives children.
`CheckContextProvider` is actually a React Component which has useEffects, useStates, useMemos and so on.
The only difference is that it returns a `CheckContext.Provider` (note the dot) as JSX Element with just one property `value`.
In `value` we insert the values which should be passed to all components which consume the context later.

!!! example

    ```javascript
    import React from 'react';

    export const CheckContext = React.createContext({});

    export const CheckContextProvider = ({children}) => {
      const [isChecked, setIsChecked] = React.useState(false);

      return
        (
            <CheckContext.Provider value={{isChecked, setIsChecked}}>
              {children}
            </CheckContext.Provider>
        )
    }
    ```

Now we have to use the `CheckContextProvider` in the `index.js` for example:
This means, that all components inside the App component are able to access the context if they define it.

!!! example

    ```javascript
    import { StrictMode } from "react";
    import { createRoot } from "react-dom/client";

    import App from "./App";
    import { CheckContextProvider } from "./contexts/CheckContext";

    const rootElement = document.getElementById("root");
    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <CheckContextProvider>
          <App />
        </CheckContextProvider>
      </StrictMode>
    );
    ```

Next we can build components, that should exist within the App, that consume the context.

!!! example

    ```javascript
    import React from 'react';
    import { CheckContext } from '../contexts/CheckContext'

    export default function Component() {
      const { setIsChecked } = React.useContext(CheckContext)

      return (
        <button onClick={setIsChecked}>
          Toggle
        </button>
      )
    }
    ```

!!! example

    ```javascript
    import React from 'react';
    import { CheckContext } from '../contexts/CheckContext'

    export default function Component() {
      const { isChecked } = React.useContext(CheckContext)

      return (
        <p>
        {isChecked ? 'Is checked' : 'Is not checked'}
        </p>
      )
    }
    ```
