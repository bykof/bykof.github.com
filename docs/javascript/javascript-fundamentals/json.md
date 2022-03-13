# JSON

JavaScript has a native support for JSON parsing and "stringifying".

## Parsing

Let's assume we have following JSON in a string:

Example:

```javascript
const data = `{"a": 1, "2": "b"}`;
const parsedData = JSON.parse(data);
console.log(parsedData);
// Output: Object { 2: "b", a: 1 }
```

We can simply parse JSON strings into a JavaScript object, array, string, or number.

## Stringify

If we have already an object, we can "stringify" that object into a JSON string.

Example:

```javascript
const data = ['hello', 'world', 1, 2, 3];
const jsonData = JSON.stringify(data);
console.log(jsonData);
// Output: ["hello","world",1,2,3]
```
