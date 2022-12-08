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

-   `node_modules` - stores all the necessary node packages of the React applications.

-   `/public`

    -   `index.html` - the only HTML file we have in the entire application
    -   `favicon.ico` - an icon file
    -   `manifest.json` - is used to make the application a progressive web app
    -   `other images` - open graph images(open graph images are images which are visible when a link share on social media)
    -   `robots.txt` - information, if the website allows web scraping

-   /src

    -   `App.css, index.css` - are CSS files
    -   `index.js` - a file which allows to connect all the components with index.html
    -   `App.js` - A file where we usually import most of the presentational components
    -   `App.test.js` - Tests with testing library and jest
    -   `reportWebVitals.js`: is useful to collect Web Vitals information
    -   `setupTests.js` - to write testing cases
    -   `logo.svg` - just a svg file

-   `package.json` - List of packages the applications uses
-   `.gitignore` - React boilerplate comes with git initiated, and the .gitingore allows files and folders not to be pushed to GitHub
-   `README.md` - Markdown file to write documentation
-   `yarn.lock` or `package-lock.json` - a means to lock the version of the package
