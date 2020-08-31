# Loops

## while-loops

```javascript
const arr = ["a", "b", "c"];

while (arr.length > 0) {
  const elem = arr.shift(); // remove first element
  console.log(elem);
}
```

## Endless Loop

```javascript
while (true) {
  if (Math.random() === 0) break;
}
```

## for-loops

```javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

### Loop over an array

```javascript
const arr = ["a", "b", "c"];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

## for-of-loops

Use this rather than for-loops because here you define the element as const

```javascript
const iterable = ["hello", "world"];

for (const elem of iterable) {
  console.log(elem);
}
```

## for-in-loops **(avoid!)**

```javascript
const obj = { a: 1, b: 2 };

for (const key in obj) {
  console.log(key);
}
```

### Loop over lists instead

```javascript
const obj = { a: 1, b: 2 };

for (const key of Object.keys(obj)) {
  console.log(key);
}
```
