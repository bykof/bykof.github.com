# Requests

Build the interface in the iframe down below.

Don't forget to create proper components!

Use this API endpoints:

```
Get all albums:
GET https://jsonplaceholder.typicode.com/albums

Get photos of an album:
GET https://jsonplaceholder.typicode.com/albums/${id}/photos
```

The idea is to get all albums and display them.
After clicking on an album the application should show all photos of this album.

<iframe src="/exercises/react/requests/example/index.html" height="800px" width="800px"></iframe>

## Solution

```js
function Album({ album, onAlbumSelected }) {
    return (
        <div
            onClick={() => onAlbumSelected(album)}
            style={{
                border: '1px solid black',
                display: 'inline-block',
                padding: '0.5em',
                margin: '0.25em',
                cursor: 'pointer',
            }}
        >
            {album.title}
        </div>
    )
}

function App() {
    const [selectedAlbum, setSelectedAlbum] = React.useState(null)
    const albumsQuery = useQuery(['albums'], async () => {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/albums',
        )
        return await response.json()
    })
    const photosQuery = useQuery(
        ['photos', selectedAlbum],
        async () => {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/albums/' +
                    selectedAlbum.id +
                    '/photos',
            )
            return await response.json()
        },
        { enabled: selectedAlbum !== null },
    )

    const onAlbumSelected = React.useCallback((album) => {
        setSelectedAlbum(album)
    }, [])

    return (
        <>
            {photosQuery.data &&
                photosQuery.data.map((photo) => (
                    <img alt={''} key={photo.id} src={photo.thumbnailUrl} />
                ))}

            {albumsQuery.data &&
                albumsQuery.data.map((album) => (
                    <Album
                        onAlbumSelected={onAlbumSelected}
                        key={album.id}
                        album={album}
                    />
                ))}
        </>
    )
}
```
