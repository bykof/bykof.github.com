# Introduction

Here you will find some exercises for JavaScript Fundamentals.

## Starting with the exercises

To start with the exercises I can recommend you following steps:

1. install Node.JS [Link](https://nodejs.org/en/)
2. create a folder: `mkdir -p js-exercises/javascript-fundamentals/shop`
3. go to the folder: `cd js-exercises/javascript-fundamentals/shop`
4. init a node package: `npm init -y`
5. add a new script in the `package.json` [see at the bottom](#packagejson):
6. add an `index.js`: `touch index.js`
7. write your code and start the `index.js` with `npm run start`

### package.json

```json
{
    "name": "shop",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "devDependencies": {
        "jest": "^26.5.3"
    },
    "scripts": {
        "start": "node index.js"
    }
}
```
