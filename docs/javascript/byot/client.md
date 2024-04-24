# Client

To communicate with the server, we need to implement a client in the dashboard.

And to work easier with HTTP requests and responses, we install Axios:

```bash
yarn add axios
```

Now we implement the client:

`dashboard/client/index.js`

```javascript
import Axios from 'axios'

export const API_URL = 'http://localhost:1337'

export const getEvents = async () => {
    return Axios.get(`${API_URL}/events`)
}
```
