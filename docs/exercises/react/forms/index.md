# Forms

Rebuild the application and use Events and States.
Use `onSubmit` with the form element to catch submit events by submitting with enter or a submit button.
Don't forget to prevent the default behaviour with: `event.preventDefault()`

<iframe src="/exercises/react/forms/example/index.html" height="400px" width="800px"></iframe>

## Solution

```js
function App() {
    const [elves, setElves] = React.useState([])
    const form = useForm()

    const onSubmit = (data) => {
        setElves([...elves, data.elfName])
        form.reset()
    }

    return (
        <>
            <p>Add an elf</p>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <input
                    type={'text'}
                    {...form.register('elfName', {
                        minLength: 3,
                        required: true,
                    })}
                />
                {form.formState.errors.elfName && (
                    <p>Please provide at least three characters</p>
                )}
                <br />
                <button type={'submit'}>Add elf</button>
            </form>
            <hr />
            <ul>
                {elves.map((elf) => (
                    <li>{elf}</li>
                ))}
            </ul>
        </>
    )
}
```
