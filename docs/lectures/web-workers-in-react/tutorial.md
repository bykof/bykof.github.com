# Tutorial

Settings up Web Workers in React is pretty simple.

All we need to do is just to include a Webpack module and
import it to use it afterswards.

Let's start!

## Setup

First we install [`worker-loader`](https://github.com/webpack-contrib/worker-loader):

```
yarn add worker-loader
```

## Usage

### The worker

Then we need to write the worker first, lets start with an easy example by now:

```
// ./src/workers/default.js

import hello from '../helper-functions/bla';

onmessage = (event) => {
  hello();
  console.log('Message received from main script');
  const workerResult = 'Result: ' + event;
  console.log('Posting message back to main script');
  postMessage(workerResult);
};
```

### The worker consumer

Now we just need to import the worker as the file would export a `Worker` instance.

```
// ./src/App.js

import { useEffect, useState } from 'react';
/* eslint-disable import/no-webpack-loader-syntax */
import DefaultWorker from 'worker-loader!./workers/default.js';

const App = () => {
  const [worker, setWorker] = useState();

  useEffect(() => {
    const tempWorker = new DefaultWorker();
    tempWorker.onmessage = (event) => {
      console.log(event.data);
    };
    setWorker(tempWorker);
    return () => {
      tempWorker.terminate();
    };
  }, []);

  const onClick = () => {
    worker.postMessage('Hello World!');
  };

  return (
    <div className='App'>
      <button type='button' onClick={onClick}>
        Send and receive message
      </button>
    </div>
  );
};

export default App;
```
