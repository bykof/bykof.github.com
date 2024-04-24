# Add Theme

We add a theme to our application first with:

```bash
yarn add 98.css
```

and then in the file `dashboard/pages/_app.js`:

```javascript
import '../styles/globals.css'
import '98.css'

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp
```
