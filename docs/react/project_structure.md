# Project Structure

To have a good `software-architecture` I can give you a short glimpse about how a React application should be structured.
There is a framework called [Next.JS](https://nextjs.org/), which always have some groundbreaking ideas on how to build things in React.
They also defined a React application structure, which is, in my opinion, the current best structure.
I think that, because I used it in three different React projects and it always went really well.

So here is the structure:

!!!

    ```
    my-app/
    |- node_modules
    |- public/
    |   |- favicon.ico
    |   |- index.html
    |   |- robots.txt
    |   |- imgs
    |- src/
    |   |- index.js
    |   |- pages/
    |   |   |- index.js
    |   |   |- about.js
    |   |   |- products/
    |   |   |   |- index.js
    |   |   |   |- [id].js
    |   |- components/
    |   |   |- Product.js
    |   |   |- ProductList.js
    |   |- clients/
    |   |   |- productService
    |   |   |   |- index.js
    |   |   |   |- ...
    |   |- contexts/
    |   |   |   |- AuthenticationContext.js
    ```
