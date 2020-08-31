# Exceptions

## The Error object

Any value can be thrown, but it's convenient to throw an `Error` object:

```javascript
throw new Error("Unexpected Error");
```

## Try... Catch

```javascript
const oddValue = (value) => {
  if (value % 2 === 0) {
    throw new Error(`${value} is not odd!`);
  }
};

try {
  oddValue(3);
  oddValue(2);
} catch (error) {
  console.error(error);
} finally {
  console.log("this will be printed always!");
}

// Error: 2 is not odd!
```
