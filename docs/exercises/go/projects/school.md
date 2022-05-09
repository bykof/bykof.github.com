# School

A school needs a programm, to store pupils, teachers, lessons and classrooms.
The program should have a menu to display it:

```
*** School Program ***
Choose one of the following options:
    1. Add a pupil
    2. Add a teacher
    3. Add a classroom
    4. Add a lesson
    5. Add pupils to lesson
    6. List all pupils
    7. List all teachers
    8. List all classrooms
    9. List all lessons
    10. List lessons of classroom
    (11. List lessons of pupil)
    (12. List lessons of teacher)

Your choice:
```

Program 11 and 12 are Bonus parts.

If you choose menu 1, following should be printed:

```
Add a pupil:
> Enter first name: Michael
> Enter last name: Bykovsi
> Enter grade: 10
> Pupil #1 Michael Bykovski successfully added
```

```
Add a pupil:
> Enter first name: Tanja
> Enter last name: Stark
> Enter grade: 10
> Pupil #2 Tanja Stark successfully added
```

If you choose menu 2:

```
Add a teacher:
> Enter first name: Peter
> Enter last name: Lustig
> Enter teaching area: Deutsch und Biologie
> Teacher #1 Peter Lustig successfully added
```

If you choose menu 3:

```
Add a classroom:
> Enter room number: 405
> Enter location: Hauptgebäude
> Classroom #1 405 Hauptgebäude successfully added
```

If you choose menu 4 the following input should be

```
Add a lesson:
> Enter lesson name: Deutsche Grammatik #2
> Enter semester: SS22
> Enter classroom id: 1
> Enter teacher id: 2
> Teacher with id 2 does not exist, please choose an existing teacher id!
> Enter teacher id: 1
> Lesson #1 Deutsche Grammatik #2 successfully added
```

If you choose menu 5:

```
Add pupils to lesson:
> Enter lesson id: 1
> Enter pupils separated by comma: 1,2
> Pupils:
    - #1 Michel Bykovski
    - #2 Tanja Stark
  were added to the lesson #1 Deutsche Grammatik #2
```

If you choose menu 6:

```
List of pupils:
#1 Michael Bykovski (10)
#2 Tanja Stark (10)
```

If you choose menu 7:

```
List of teachers:
#1 Peter Lustig
- Teaching Area: Deutsch und Biologie
```

If you choose menu 8:

```
List of classrooms:
#1 405 Hauptgebäude
```

If you choose menu 9:

```
List of lessons:
#1 Deutsche Grammatik #2
- Semester: SS22
- Classroom: #1 405 Hauptgebäude
- Teacher: #1 Peter Lustig
```

If you choose menu 10:

```
> Which classroom you would like to see?
> 1

#1 405 Hauptgebäude
- #1 Deutsche Grammatik #2
    - Teacher: #1 Peter Lustig
    - Pupils:
        - #1 Michael Bykovski
        - #2 Tanja Stark
```

Bonus task:

If you choose menu 11:

```
> Which pupil you would like to see?
> 2

#2 Tanja Stark
- #1 Deutsche Grammatik #2
    - Teacher: #1 Peter Lustig
    - Classroom: #1 405 Hauptgebäude
```

If you choose menu 12:

```
> Which teacher you would like to see?
> 1

#1 Peter Lustig
- #1 Deutsche Grammatik #2
    - Classroom: #1 405 Hauptgebäude
```

Start with this:

```go linenums="1" title="main.go"
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	for {
		reader := bufio.NewReader(os.Stdin)
		fmt.Printf("Your choice: ")
		command, _ := reader.ReadString('\n')
		fmt.Println(command)
	}
}

```
