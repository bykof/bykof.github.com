# Functions

## Movie Storage

```go linenums="1" title="main.go"
package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"strings"
)

/*
   Task:

*/
type Movie struct {
	ID   int
	Name string
}

func Load() []Movie {
    // Your code goes here
}

func PrintMovies(movies ...Movie) {
    // Your code goes here
}

func MovieById(id int) (Movie, err) {
    // Your Code goes here
    return Movie{}, fmt.Errorf("movie not found id: %d", id)
}

func RunCmd(command string, movies []Movie) bool {
    // Your code goes here
}

func main() {
	movies := Load()

	fmt.Printf("We have %d, what do you want to do?\n", len(movies))

	in := bufio.NewScanner(os.Stdin)
	for {
		fmt.Printf(`
  > list   		: lists all the movies
  > id <id>		: list a movie by id
  > quit   		: quits
`)

		if !in.Scan() || !RunCmd(in.Text(), movies) {
			break
		}
	}
}
```