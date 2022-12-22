# Hooks

## useState

Take your solution from the `Components / JSX` section and add following behaviour:

<iframe src="/exercises/react/hooks/useState/index.html" width="800px" height="950px"></iframe>

<!-- ### Solution

```js
import React from 'react'

function Address(props) {
    return (
        <>
            <p>{props.address.street}</p>
            <p>
                {props.address.city} {props.address.zipcode}
            </p>
            <p>{props.address.country}</p>
        </>
    )
}

function Person(props) {
    const [showAddress, setShowAddress] = React.useState(false)

    return (
        <div>
            <img width="250" alt="" src={props.person.profilePicture} />
            <h1>
                {props.person.firstName} {props.person.lastName}
            </h1>
            <p>Phone: {props.person.phone}</p>
            <p>
                Email: <a href={props.person.email}>{props.person.email}</a>
            </p>
            <a href={props.person.website}>{props.person.website}</a>
            <br />
            <br />
            <button onClick={() => setShowAddress(!showAddress)}>
                {showAddress ? 'Hide' : 'Show'} Address
            </button>
            {showAddress ? <Address address={props.person.address} /> : null}
        </div>
    )
}

function App() {
    const users = [
        {
            firstName: 'John',
            lastName: 'Smith',
            email: 'john@example.com',
            profilePicture:
                'https://images.pexels.com/photos/6206980/pexels-photo-6206980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            phone: '+1 (123) 456-7890',
            address: {
                street: '9062 Mertz Plains Apt. 623',
                buildingNumber: '410',
                city: 'Boganside',
                zipcode: '71562',
                country: 'Estonia',
            },
            website: 'http://www.johnsmith.com',
        },
        {
            firstName: 'Raegan',
            lastName: 'Haley',
            email: 'ustroman@hotmail.com',
            profilePicture:
                'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            phone: '+5089956276536',
            address: {
                street: '2922 Retha Plaza',
                city: 'Lake Gail',
                zipcode: '26859-4338',
                country: 'Mozambique',
            },
            website: 'http://zboncak.biz',
        },
    ]

    return (
        <>
            <Person person={users[0]} />
            <br />
            <Person person={users[1]} />
        </>
    )
}

export default App
``` -->

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
