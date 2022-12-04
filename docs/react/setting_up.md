# Setting Up

Here we will learn, how to setup a React project fast, so that we don't have to setup every dependency by ourselves.

## Create React App

To create a react project you can use one of the following ways. Let's assume you installed node. Open the command line interface (CLI), git bash or terminal on Mac or Linux. Then run the following command. I am using git bash.

```sh
$ npx create-react-app name-of-your-project
```

If you do not like to write npx every time you create a project you may install create-react-app package globally in your computer using the following command.

```sh
$ npm install -g create-react-app
```

After you installed create-react-app, you create a React application as follows:

```sh
$ create-react-app name-of-project
```

# Your first React App

```sh
$ cd Desktop/
```

```sh
$ npx create-react-app react-app
```

```sh
$ cd react-app
```

```sh
$ yarn start
```

Now your React app should run at localhost 3000. Go to the App.js and modify the content by writing some text, you will see the latest changes on the browser.
To stop the server, press Ctr + C in the CLI.

![React Starting](../images/react_app_starting.png)

## React Boilerplate

Let's see the React boilerplate, which has been created by create-react-app. Whenever you create a new project, you run create-react-app and name of the project.

In the following React boilerplate, there are three folders: node_modules, public and src. In addition, there are .gitignore, README.md, package.json and yarn.lock. Some of you, instead of yarn.lock, you may have package-lock.json.

It is good to know these folders and files.

-   node_modules - stores all the necessary node packages of the React applications.

-   /public

    -   index.html - the only HTML file we have in the entire application
    -   favicon.ico - an icon file
    -   manifest.json - is used to make the application a progressive web app
    -   other images - open graph images(open graph images are images which are visible when a link share on social media)
    -   robots.txt - information, if the website allows web scraping

-   /src

    -   App.css, index.css - are different CSS files
    -   index.js - a file which allows to connect all the components with index.html
    -   App.js - A file where we usually import most of the presentational components
    -   App.test.js - Tests with testing library and jest
    -   reportWebVitals.js: is useful to collect Web Vitals information
    -   setupTests.js - to write testing cases
    -   logo.svg - just a svg file

-   package.json - List of packages the applications uses
-   .gitignore - React boilerplate comes with git initiated, and the .gitingore allows files and folders not to be pushed to GitHub
-   README.md - Markdown file to write documentation
-   yarn.lock or package-lock.json - a means to lock the version of the package

```js title="index.js"
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
```

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
            name="description"
            content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
        <title>React App</title>
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    --></body>
</html>
```