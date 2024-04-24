# Implement the frontend

## `Event` Component

First let's create a component to show our events later:

`dashboard/components/Event.js`

```javascript
export const Event = ({ title, description, start, end }) => {
    const startDateTime = new Date(start)
    const endDateTime = new Date(end)

    return (
        <div className="window" style={{ width: 300, marginBottom: '1em' }}>
            <div className="title-bar">
                <div className="title-bar-text">{title}</div>
            </div>
            <div className="window-body">
                <p>{description}</p>
                <hr />
                <p>
                    {startDateTime.toLocaleString()} -{' '}
                    {endDateTime.toLocaleString()}
                </p>
            </div>
        </div>
    )
}

export default Event
```

## Add react-query

To fetch data properly from the backend server, we will use the library [react-query](https://react-query.tanstack.com/).
It is able to fetch, cache, synchronize and update server state.

We install it using:

```bash
yarn add react-query
```

## Events Container

Create a container to fetch the data from the server and display it by using our created `Event` component, our implemented `client`, and the `react-query` library.

`dashboard/containers/Events.js`

```javascript
import { useQuery } from 'react-query'
import { getEvents } from '../client'
import { Event } from '../components/Event'

export const Events = () => {
    const {
        isLoading,
        isError,
        data: events,
        error,
    } = useQuery('events', getEvents)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error fetching events: {error.toString()}</div>
    }

    return events.map((event) => <Event key={event.id} {...event} />)
}

export default Events
```

## Glueing it all together

Now we are finished and just have to call the `Event` container in the `index.js` file.

`dashboard/pages/index.js`

```javascript
import Head from 'next/head'
import Events from '../containers/Events'

const mainStyle = {
    padding: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
}

export default function Home() {
    return (
        <div>
            <Head>
                <title>Events Dashboard</title>
            </Head>
            <main style={mainStyle}>
                <Events />
            </main>
        </div>
    )
}
```

## Result

<figure>
  <img src="/img/byot/result.png" width="500" />
</figure>
