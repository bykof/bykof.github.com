# Implement the frontend

## `Event` Component

First let's create a component to show our events later:

`dashboard/components/Event.js`
```javascript
import React from "react";

const windowStyles = { width: 300, marginBottom: 10 };

export const Event = ({ name, description, start, end }) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return (
    <div className="window" style={windowStyles}>
      <div className="title-bar">
        <div className="title-bar-text">{name}</div>
      </div>
      <div className="window-body">
        <p>{description}</p>
        <p style={{ textAlign: "right" }}>
          {startDate.toLocaleString()} - {endDate.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Event;
```

## Add react-query

To fetch data properly from the backend server, we will use the library [react-query](https://react-query.tanstack.com/).
It is able to fetch, cache, synchronize and update server state.

We install it using:

```bash
yarn add react-query
```

## Fetch and display data

All preparations are done so far, so let's go and fetch the data from the server and display it by using our created `Event` component, our implemented `client`, and the `react-query` library.

`dashboard/pages/index.js`
```javascript
import Head from "next/head";
import { useQuery } from "react-query";
import { getEvents } from "../client";
import Event from "../components/Event";

const mainStyle = {
  padding: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
};

export default function Home() {
  const { isLoading, isError, data: events, error } = useQuery(
    "events",
    getEvents
  );
  const loadingBar = isLoading && <div>Loading...</div>;
  const errorBar = isError && <div>{error.toString()}</div>;
  return (
    <div>
      <Head>
        <title>Events Dashboard</title>
      </Head>
      <main style={mainStyle}>
        {loadingBar}
        {errorBar}
        {events &&
          events.map((event) => (
            <Event
              key={event.id}
              name={event.name}
              description={event.description}
              start={event.start}
              end={event.end}
            />
          ))}
      </main>
    </div>
  );
}
```

## Result

<figure>
  <img src="/img/byot/result.png" width="500" />
</figure>
