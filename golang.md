# Go Language

## Types

Data types categorize a set of related values, describe the **operations** that can be done on them, and define the way they are **stored**.

Philosophers make a distinction between types and tokens. For example, suppose you have a dog named Max. Max is the token(a instance) and dog is the type(the general concept).  We might reason like this: all dogs have four legs, Max is a dog, therefore Max has four legs.

In mathematics, we often talk about sets.  Each member of these sets shares properties with all the other members of the set. In this way, sets are similar to types in programming languages, because all the values of a particular type share certain properties.

Go is a statically typed programming language. This means that variables always have a specific type and that type cannot change. Go comes with several built-in data types.

### Numbers

Go has several different types to represent numbers. Generally, we split numbers into two different kinds: integers and floating-point numbers.

- integers: uint8,uint16,uint32,uint64,int8,int16,int32,int64
- floating-pointer numbers: float32, float64, complex64, complex128

Go supports the following standard arithmetic operators:

- addition(+)
- substraction(-)
- multiplication(*)
- division(/)
- remainder(%)

### Strings

A string is a sequence of characters with a definite length used to represent text. Go strings are made up of individual bytes, one for each character in English, two or more bytes for each character in Chinese.

String **literals** can be created using 

- double quotes: "Hello, World", allow special escape sequences, such as :\t\n
- back ticks: `Hello, World`

The following are some common operations on strings:

- **len("Hello, world")**: finds the length of a string
- **"Hello, World"[1]**: accesses a particular character in the string
- **"Hello, " + "World"**: concatenates two strings together

### Booleans

A boolean value is a special 1-bit integer type used to represent **true** and **false** (of on and off). We often use booleans to make decisions in our program and represent binary distinctions.

Three logical operators are used with boolean values.

- && and
- ||   or
- !      not

We usually use truth tables to define how these operators work.

| &&    | true  | false | \|\| | true | false | !     |
| ----- | ----- | ----- | ---- | ---- | ----- | ----- |
| true  | true  | false |      | true | true  | false |
| false | false | false |      | true | false | true  |

## Variables

A variable is a storage location, with a specific type and an associated name.

```go
package main

import "fmt"

func main() {
    var x string       // define a variable
    x = "Hello, World" // assign a value to a variable
    fmt.Println(x)
}
```

You can also define and assign a value in a single line.

```go
var x string = "Hello, World"
```

> The **=** symbol is different from that in algebra. It's better to read it as 
>
> - x takes the string "Hello, World"
> - x is assigned the string "Hello, World"

You can change the value of a variable throughout the lifetime of a program.

```go
package main

import "fmt"

func main() {
    var x string
    
    x = "first"
    fmt.Println(x)
    
    x = "second"
    fmt.Println(x)
    
    x = x + " more"
    fmt.Println(x)
}
```

> 1. When we see x = x + " more", we should read it as "concatenate the value of the variable x and the string literal more, and then assign the new value to the variable x"
>
> 2. x += y is shortcut for x = x + y in Go
>
> 3. equality in Go: ==(two equals signs next to each other)
>
>    ```go
>    var x string = "hello"
>    var y string = "world"
>    fmt.Println(x == y)
>    ```

Because creating a new variable with a starting value is so common, Go also supports a shorter statement.

```go
x := "Hello, World"
```

The type is not necessary because the Go compiler is able to infer the type based on the literal value you assign the variable. The compiler can also do inference with the **var** statement.

```go
var x = "Hello, World"
```

### How to Name a Variable

Naming a variable properly is an important part of software development. Names must start with a letter and may contain letters, numbers, or the underscore symbol.

```go
name := "Max"
fmt.Println("My dog's name is", name)

dogsName := "Max"
fmt.Println("My dog's name is", dogsName)
```

> camelCase, which is a style for writing compound words in which the first letter of each new word or phrase is capitalized. It is also sometimes referred to as mixedCase, BumpyCaps, camelBack, or HumpBack.

### Scope

The **range of places** where you are allowed to use a variable is called the scope of the variable.

Go is lexically scoped using block. Basically, this means that the variable exists within the nearest curly braces({}), or block, including any nested curly braces (blocks), but not outside of them.

```go
func main() {
	var x string = "Hello, World"
	fmt.Println(x)
}

func f() {
	fmt.Println(x)
}
```

```go
var x string = "Hello, World"

func main() {
	fmt.Println(x)
}

func f() {
	fmt.Println(x)
}
```

### Constants

Constants are essentially variables whose values cannot be changed later. They are created in the same way you create variables, but instead of using the var keyword we use the **const** keyword.

```go
package main

import "fmt"

func main() {
    const x string = "Hello, World"
    fmt.Println(x)
}
```

Constants are a good way to reuse common values in a program without writing them out each time.

### Defining Multiple Variables

Use the keyword var (or const) followed by parentheses with each variable on its own line.

```go
var (
	a = 5
    b = 10
    s = "Hello, World"
)
```

## Control Structures

### The for Statement

The for statement allows us to repeat a list of statements (a block) multiple times.

```go
package main

import "fmt"

func main() {
    i := 1
    for i <= 10 {
        fmt.Println(i)
        i = i + 1
    }
}
```

Other programming languages have a lot of different types of loops(while, do, until, foreach, ...), but Go only has one that can be used in a variety of different ways.

```go
func main() {
    for i := 1; i <= 10; i++ {
    	fmt.Println(i)
	}
}
```

First, we have the **variable initialization**, then we have the **condition** to check each time, and finally, we **increment** the variable.

> Adding 1 to a variable is so common that we have a special operator(++); similarly, subtracting 1 can be done with --.

### The if Statement

```go
func main() {
    for i := 1; i <= 10; i++ {
        if i % 2 == 0 {
    	    fmt.Println(i, "even")
        // } else if i % 3 == 0 {    
        } else {
        	fmt.Println(i, "odd")
	    }
    }
}
```

### The switch Statement

```go
switch i {
case 0: fmt.Println("Zero")
case 1: fmt.Println("One")
case 2: fmt.Println("Two")
case 3: fmt.Println("Three")
case 4: fmt.Println("Four")
case 5: fmt.Println("Five")
default: fmt.Println("Unknown Number")
}
```

## Arrays, Slices, and Maps

### Arrays

An array is a numbered sequence of elements of a single type with a fixed length.

**define and allocate an array**

```go
var x [3]int
x[0] = 98
x[1] = 93
x[2] = 77
```

> In general, to convert between types, you can use the type name like a function.
>
> ```go
> fmt.Println(total /float64(len(x)))
> ```

**define and assign an array**

```go
x := [3]float64{ 98, 93, 77 } // or
x := [3]float64{
    98,
    93,
    77,
}
```

### Slices

A slice is a segment of an array.

- slices are indexable and have a length
- this length is allowed to change

**define a slice**

```go
var x []float64 // the missing length between the brackets
```

**create a slice**

```go
x := make([]float64, 5) // built-in make function
x := make([]float64, 5, 10) // length and capacity
```

**use [low : high] expression**

- **low** is the index of where to start the slice
- **high** is the index of where to end the slice, but **not including**

```go
arr := [5]float64{1,2,3,4,5}
x := arr[0:5]
```

> arr[0:] is the same as arr[0:len(arr)], arr[:5] is the same as arr[0:5], and arr[:] is the same as arr[0:len(arr)].

In addition to the indexing operator, Go includes two built-in functions to assist with slices: **append** and **copy**.

**append**

*append* adds elements onto the end of a slice.

```go
slice1 := []int{1,2,3} // slice lietral
slice2 := append(slice1, 4, 5)
```

**copy**

*copy* takes two arguments: dst and src. All of the entries in src are copied into dst overwriting whatever is there. If the lengths of the two slices are not the same, the smaller of the two will be used.

```go
slice1 := []int{1,2,3}
slice2 := make([]int, 2)
copy(slice2, slice1)
```

### Maps

A map is an unordered collection of key-value pairs(associative arrays, hash tables, or dictionaries). Maps are used to look up a value by its associated key.

```go
var x map[string]int // x is a map of strings to ints
```

A map have to be initialized before it can be used.

```go
x := make(map[string]int)
x["key"] = 10
fmt.Println(x["key"])
```

We can delete items from a map.

```go
delete(x, "key") // built-in delete function
```

Look up a key in a map

```go
if name, ok := elements["Un"]; ok {
	fmt.Println(name, ok)
}
```

## Functions

A function(also known as a procedure or a subroutine) is an independent section of code that maps zero or more input parameters to zero or more output parameters.

**define a function**

```go
func average(xs []float64) float64 {
    total := 0.0
    for _, v := range xs {
        total += v
    }
    
    return total / float64(len(xs))
}
```

**call a function**

```go
func main() {
    xs := []float64{98, 93, 77, 82, 83}
    fmt.Println(average(xs))
}
```

**Return types can have names**

```go
func f2() (r int) {
    r = 1
    return
}
```

**Multiple values can be returned**

```go
func f() (int, int) {
    return 5, 6
}

func main() {
    x, y := f()
}
```

**Use a return to check an error**

Multiple values are often used to return an error value along with the result.

```go
x, err := f() // or
x, ok := f()
```

### Variadic functions

By using an ellipsis before the type name of the last parameter, you can indicate that it takes zero or more of those parameters.

```go
func add(args ...int) int {
    total := 0
    for _, v := range args {
	    total += v
    }
    return total
}
```

We can pass a slice of ints by following the slice with an ellipsis.

```go
xs := []int{1, 2, 3}
fmt.Println(add(xs...))
```

### Closure

It is possible to create functions inside of functions.

```go
func main() {
    x := 0
    
    increment := func() int {
        x++
        return x
    }
    
    fmt.Println(increment())
    fmt.Println(increment())
}
```

A function like this together with the nonlocal variables it references is known as a **closure**. In this case, *increment* and the variable *x* form the closure.

One way to use closure is by writing a function that returns another function, which when called, can generate a sequence of numbers.

```go
func makeEvenGenerator() func() uint {
    i := uint(0)
    return func() (ret uint) {
        ret = i
        i += 2
        return
    }
}

func main() {
    nextEven := makeEvenGenerator()
    fmt.Println(nextEven()) // 0
    fmt.Println(nextEven()) // 2
    fmt.Println(nextEven()) // 4
}
```

### defer, panic, and recover

Go has a special statement called **defer** that schedules a function call to be run after the function completes.

```go
package main

import "fmt"

func first() {
	fmt.Println("1st")
}

func second() {
	fmt.Println("2nd")
}

func main() {
	defer second()
	first()
}
```

**defer** is often used when resources need to be freed in some way.

```go
f, _ := os.Open(filename)
defer f.Close()
```

We call the **panic** function to cause a runtime error, and we can handle a runtime panic with the built-in **recover** function.

**recover** stops the panic and returns the value that was passed to the call to **panic**.

```go
package main

import "fmt"

func main() {
    panic("PANIC")
    str := recover() // this will never happen
    fmt.Println(str)
}
```

But the call to recover will never happen in this case, we have to pair it with defer.

```go
package main

import "fmt"

func main() {
    defer func() {
        str := recover()
        fmt.Println(str)
    }()
    
    panic("PANIC")
}
```

### Pointers

When we call a function that takes an argument, that argument is copied to the function. If you want to modify the original variables in the function, one way to do this is to use a special data type known as a pointer.

```go
func zero(xPtr *int) {
	*xPtr = 0
}

func main() {
	x := 5
	zero(&x)
	fmt.Println(x) // x is 0
}
```

Pointers reference a location in memory where a value is stored rather than the value itself. By using a pointer(*int), the *zero* function is able to modify the original variable.

- *int: a pointer to an int
- *xPtr: deference a pointer variable , gives us access to the value the pointer points to
- &x: find the address of a variable, returns a *int(pointer to an int)

Another way to get a pointer is to use the built-in **new** function.

```go
func one(xPtr *int) {
	*xPtr = 1
}

func main() {
    xPtr := new(int)
    one(xPtr)
    fmt.Println(*xPtr) // x is 1
}
```

## Structs and Interfaces

### Structs

A struct is a type that contains named fields.

```go
type Circle struct {
	x, y, r float64
}
```

#### Initialization

```go
var c Circle
```

Like with other data types, this will create a local Circle variable that is by default set to zero.

>For a struct, zero means each of the fields is set to their corresponding zero value(0 for ints, 0.0 for floats, "" for strings, nil for pointers, etc.)

```go
c := new(Circle)
```

This allocates memory for all the fields, sets each of them to their zero value, and returns a pointer to the struct(*Circle). Pointers are often used with structs so that functions can modify their contents.

More typically, we want to give each of the fields an initial value.

```go
c := Circle{x: 0, y:0, r:5} // or
c := Circle{0, 0, 5} // we know the order they were defined
```

If you want a pointer to the struct

```go
c := &Circle{0, 0, 5}
```

#### Fields

We can access fields using the . operator

```go
fmt.Println(c.x, c.y, c.r)
c.x = 10
c.y = 5
```

```go
func circleArea(c *Circle) float64 {
	return math.Pi * c.r*c.r
}

func circleArea(c *Circle) float64 {
	return math.Pi * c.r*c.r
}
```

#### Methods

In between the keyword func and the name of the function, we've added a **receiver**.  The receiver is like a parameter -- it has a name and a type.

```go
func (c *Circle) area() float64 {
	return math.Pi * c.r*c.r
}
```

We no longer need the & operator, Go automatically knows to pass a pointer to the circle for this method.

```go
c := Circle{0, 0, 5}
fmt.Println(c.area())
```

Let's do the same thing for the rectangle.

```go
type Rectangle struct {
	x1, y1, x2, y2 float64
}

func (r *Rectangle) area() float64 {
    l := distance(r.x1, r.y1, r.x1, r.y2)
    w := distance(r.x1, r.y1, r.x2, r.y1)
    return l * w
}
```

### Embedded types

A struct's fields usually represent a **has-a** relationship.

```go
type Person struct {
	Name string
}

func (p *Person) Talk() {
	fmt.Println("Hi, my name is", p.Name)
}
```

A person has a name and can talk. Now suppose we wanted to create a new Android struct.

```go
type Android struct {
    Person Person
    Model string
}
```

This would work, but we would rather say an android is a person, rather than an android has a person.

Go supports **is-a** relationships by using **embedded types**(sometimes also referred to as **anonymous fields**)

```go
type Android struct {
	Person
	Model string
}
```

When defined this way, the Person struct can be assessed using the type name.

```go
a := new(Android)
a.Person.Talk()
```

But we can also call any Person methods directly on the Android.

```go
a := new(Android)
a.Talk()
```

The is-a relationship works this way intuitively: people can talk, and android is a person, therefore an android can talk.

### Interfaces

Rectangle and Circle has the same area method. Go has a way of making these similarities explicit through a type known as an interface. We can define a Shape interface.

```go
type Shape interface {
    area() float64
}
```

In our case, both Rectangle and Circle have area methods that return float64s, so both types implement the Shape interface.

Nothing additional is required to implement an interface. It's sufficient to merely have a method with the same name and signature.

```go
func totalArea(shapes ...Shape) {
    var area float64
    for _, s := range shapes {
        area += s.area();
    }
    
    return area
}
```

We can define a function which sums the area of shapes area up.

```go
c := Circle{0, 0, 5}
r := Rectangle{0, 0, 10, 10}
fmt.Println(totalArea(&c, &r)) // interfaces are passed by pointer
```

Interfaces can also be used as fields.

```go
type MultiShape struct {
    shapes []Shape
}
```

We can even turn MultiShape itself into a Shape by giving it an area method.

```go
func (m *MultiShape) area() float64 {
    var area float64
    for _, s := range.m.shapes {
        area += s.area()
    }
    return area
}
```

```go
multiShape := MultiShape{
    shapes: []Shape{
        Circle{0, 0, 5},
        Rectangle{0, 0, 10, 10},
    },
}
fmt.Println(multiShape.area())
```

Interfaces are particularly useful as software projects grow and become more complex. They allow us to hide the incidental details of implementation, which makes it easier to reason about software components in isolation.

>  Interfaces in Go provide a way to specify the behavior of an object: if something can do ***this***, then it can be used ***here***.
>
> Interfaces with only one or two methods are common in Go code, and are usually given a name derived from the method, such as *io.Writer* for something that implements *Write*.
>
> A type can implement multiple interfaces.

## Concurrency

Making progress on more than one task simultaneously is known as **concurrency**. Go has rich support for concurrency using **goroutines** and **channels**.

### Goroutines

A goroutines is a function that is capable of running concurrently with other functions.

```go
package main

import (
	"fmt"
    "time"
    "math/rand"
)

func f(n int) {
    for i := 0; i < 10; i++ {
        fmt.Println(n, ":", i)
        amt := time.Duration(rand.Intn(250))
		time.Sleep(time.Millisecond * amt)
    }
}

func main() {
    go f(0)
    var input string
    fmt.Scanln(&input)
}
```

Goroutines are lightweight and we can easily create thousands of them.

```go
func main() {
    for i := 0; i < 10; i++ {
        go f(i)
    }
    
    var input string
    fmt.Scanln(&input)
}
```

### Channels

Channels provide a way for two goroutines to communicate with each other and synchronize their execution.

```go
package main

import (
	"fmt"
    "time"
)

func pinger(c chan string) {
    for i := 0; ; i++ {
        c <- "ping"
    }
}

func printer(c chan string) {
    for {
        // fmt.Println(<-c)
        msg := <- c
        fmt.Println(msg)
        
        time.Sleep(time.Second * 1)        
    }
}

func main() {
    var c chan string = make(chan string)
    
    go pinger(c)
    go printer(c)
    
    var input string
    fmt.Scanln(&input)
}
```

The left arrow operator(<-) is used to send and receive message on the channel

- **c <- "ping"**: send "ping" to the channel
- **msg := <- c**: receive a message from the channel and store in msg

Using a channel like this synchronizes the two goroutines. When pinger attempts to send a message on the channel, it will wait until printer is ready to receive the message(known as blocking).

```go
func ponger(c chan string) {
    for i := 0; ; i++ {
	    c <- "pong"
    }
}

func main() {
    var c chan string = make(chan string)
    
    go pinger(c)
    go ponger(c)
    go printer(c)
    
    var input string
    fmt.Scanln(&input)
}
```

#### Channel Direction

We can specify a direction on a channel type, thus restricting it to either sending or receiving.

- **func pinger(c chan<- string)**: only allowed to send to c
- **func printer( c <-chan string)**: only allowed to receive from c

#### Select

Go has a special statement called **select** that works like a switch but for channels.

```go
func main() {
    c1 := make(chan string)
    c2 := make(chan string)
    
    go func() {
        for {
            c1 <- "from 1"
            time.Sleep(time.Second * 2)
        }
    }()
    
    go func() {
        for {
            c1 <- "from 2"
            time.Sleep(time.Second * 3)
        }
    }()

    go func() {
        for {
            select {
                case msg1 := <- c1:
                fmt.Println(msg1)
                
                case msg2 := <- c2:
                fmt.Println(msg2)
            }     
        }
    }()
    
    var input string
    fmt.Scanln(&input)
}
```

**select** picks the first channel that is ready and receives from it(or sends to it). If more than one of the channels are ready, then it randomly picks which one to receive from. If none of the channels are ready, the statement blocks until one becomes available.

**select** statement is often used to implement a timeout.

```go
select {
case msg1 := <- c1:
	fmt.Println("Message 1", msg1)
case msg2 := <- c2:
	fmt.Println("Message 2", msg2)
case <- time.After(time.Second):
	fmt.Println("timeout")
default:
	fmt.Println("nothing ready")
}
```

time.After creates a channel, and after the given duration, will send the current time on it(ignored here). We can also specify a **default** case.

#### Buffered Channels

Normally, channels are synchronous; both sides of the channel will wait until the other side is ready. A buffered channel is asynchronous; sending or receiving a message will not wait unless the channel is already full. If the channel is full, then sending will wait until there is room for at least one more.

```go
c := make(chan int, 2) //buffered channel with a capacity of 2
```

## Modules and Packages

Go programs are organized into **packages**.

- a package is a collection of source files in the same directory that are compiled together
- functions, types, variables, and constants defined in one source file are visible to al other source files within the same package

A repository contains one or more **modules**.

- a module is a collection of related Go packages that are released together
- a Go repository typically contains only one module, located at the root of the repository
- a file named go.mod declares the *module path*: the import path prefix for all packages within the module
- the module contains the packages in the directory containing its go.mod file, and so on...

**Module path**

- serves as **import path prefix** for its packages
- indicates where the go command should look to download it.
- **eg:** golang.org/x/tools -> https://golang.org/x/tools

**Import path** 

- a string used to import a package.

- package's import path = module path + subdirectory
- **eg:** github.com/google/go-cmp/cmp = github.com/google-cmp + cmp/
- packages in the standard library do not have a module path prefix

### Directory structure

```
$GOPATH
|__bin
|__pkg
|__src
   |__github.com
      |__google
         |__go-cmp        
```

### Entry example

In the directory: $GOPATH/src/example.com/user/hello

**go.mod**

```rust
module example.com/user/hello

go 1.14
```

**hello.go**

```dart
package main

import "fmt"

func main() {
	fmt.Println("Hello, world.")
}
```

Now, you can build and install the program with the **go** tool

```bash
$ go install example.com/user/hello
```

This command builds the *hello* command, and install it into the directory *$GO_ROOT*/bin.

### Complex example

In the directory: $GOPATH/src/example.com/user/hello/morestrings

**reverse.go**

```dart
// Package morestrings implements additional functions to manipulate UTF-8
// encoded strings, beyond what is provided in the standard "strings" package.
package morestrings

// ReverseRunes returns its argument string reversed rune-wise left to right.
func ReverseRunes(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}
```

Because ReverseRunes function begins with an upper-case letter, it is **exported**, and can be used in other packages that import *morestrings* package.

In the directory: $GOPATH/src/example.com/user/hello

**hello.go**

```dart
package main

import (
	"fmt"
	"example.com/user/hello/morestrings"
    "github.com/google/go-cmp/cmp"
)

func main() {
	fmt.Println(morestrings.ReverseRunes("!oG ,olleH"))
    fmt.Println(cmp.Diff("Hello World", "Hello Go"))
}
```

When you run commands like **go install**, **go build**, or **go run**, the **go** command will automatically download the remote module and record its version in your go.mod file.

Module dependencies are automatically downloaded to the **pkg/mod** subdirectory. use **go clean -modcache** to remove all downloaded modules.

```bash
$ go clean -modcache
```

## Testing

Go has a lightweight test framework composed of the **go test** command and the **testing** package.

- write a test by creating a file with a name ending in **_test.go**
- functions named **TestXXX** with signature func (t *testing.T)
- failure test with function calls such as **t.Error** or **t.Fail**

Add a test to the **morestrings** package by creating a file morestrings/reverse_test.go.

```dart
package morestrings

import "testing"

func TestReverseRunes(t *testing.T) {
	cases := []struct {
		in, want string
	}{
		{"Hello, world", "dlrow ,olleH"},
		{"Hello, 世界", "界世 ,olleH"},
		{"", ""},
	}
	for _, c := range cases {
		got := ReverseRunes(c.in)
		if got != c.want {
			t.Errorf("ReverseRunes(%q) == %q, want %q", c.in, got, c.want)
		}
	}
}
```

Then run the test with

```bash
$ go test example.com/user/hello/morestrings
```

## 