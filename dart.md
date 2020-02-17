# **Dart Language**
## **Language samples**

This collection is not exhaustive -- it's just a brief introduction to the language for people who like to learn by example.

### Hello World

Every app has a ***main()*** function. To display text on the console, you can use the top-level ***print()*** function.

```dart
void main() {
  print('Hello, World!');
}
```

### Variables

Even in **type-safe** Dart code, most variables don't need explicit types, thanks to **type inference**.

```dart
var name = 'Voyager I';
var year = 1977;
var antennaDiameter = 3.7;
var flybyObjects = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'];
var image = {
  'tags': ['saturn'],
  'url': '//path/to/saturn.jpg',
};
```

### Control flow statements

```dart
if (year >= 2001) {
  print('21st century');
} else if (year >= 1901) {
  print('20th century');
}

for (var object in flybyObjects) {
  print(object);
}

for (int month = 1; month <= 12; month++) {
  print(month);
}

while (year < 2016) {
  year += 1;
}
```

### Functions

We recommend specifying the types of each function's arguments and return value.

```dart
int fibonacci(int n) {
  if (n == 0 || n == 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

var result = fibonacci(20);
```

**anonymous functions**

* ***=>***: arrow syntax handy for functions that contain a single statement
* especially useful when passed as arguments

```dart
flybyObjects.where((name) => name.contains('turn').forEach(print));
```

You can  also use a function as an argument such as the top-level ***print()***.

### Comments

```dart
// This is a normal, one-line comment.

/// This is a documentation comment, used to document libraries,
/// classes, and their members. Tools like IDEs and dartdoc treat
/// doc comments specially.

/* Comments like these are also supported. */
```

### Imports

```dart
// importing core libraries
import 'dart:math';

// importing libraries from external packages
import 'package:test/test.dart'
   
// import files
import 'path/to/my_other_file.dart';
```

### Classes

What consist of a class? **fields, properties, constructors, methods, getter/setter method.**

```dart
class Spacecraft {
  String name;
  DateTime launchDate;

  // Constructor, with syntactic sugar for assignment to members.
  Spacecraft(this.name, this.launchDate) {
    // Initialization code goes here.
  }

  // Named constructor that forwards to the default one.
  Spacecraft.unlaunched(String name) : this(name, null);

  int get launchYear =>
      launchDate?.year; // read-only non-final property

  // Method.
  void describe() {
    print('Spacecraft: $name');
    if (launchDate != null) {
      int years =
          DateTime.now().difference(launchDate).inDays ~/
              365;
      print('Launched: $launchYear ($years years ago)');
    } else {
      print('Unlaunched');
    }
  }
}
```

You might use the Spacecraft class like this.

```dart
var voyager = Spacecraft('Voyager I', DateTime(1977, 9, 5));
voyager.describe();

var voyager3 = Spacecraft.unlaunched('Voyager III');
voyager3.describe();
```

### Inheritance

Dart has single inheritance.

```dart
class Orbiter extends Spacecraft {
  num altitude;
  Orbiter(String name, DateTime launchDate, this.altitude)
      : super(name, launchDate);
}
```

### Mixins

Mixins are a way of reusing code in multiple class hierarchies.

```dart
class Piloted {
  int astronauts = 1;
  void describeCrew() {
    print('Number of astronauts: $astronauts');
  }
}
```

To add a mixin's capabilities to a class, just extend the class with the mixin.

```dart
class PilotedCraft extends Spacecraft with Piloted {
  // ...
}
```

PilotedCraft now has the **astronauts** field as well as the describeCrew() method.

### Interfaces and abstract classes

Dart has no ***interface*** keyword. Instead, all classes implicitly define an interface. Therefore, you can implement any class.

```dart
class MockSpaceship implements Spacecraft {
  // ...
}
```

You can create an abstract class to be extended/implemented by a concrete class. Abstract classes can contain abstract methods with empty bodies.

```dart
abstract class Describable {
  void describe();
  
  void describeWithEmphasis() {
    print('==========');
    describe();
    print('==========');
  }
}
```

### Exceptions

use ***throw*** to raise an exception.

```dart
if (astronauts == 0) {
  throw StateError('No astronauts');
}
```

To catch an exception, use a ***try*** statement with ***on*** or ***catch*** (or both).

```dart
try {
  for (var object in flybyObjects) {
    var description = await File('$object.txt').readAsString();
    print(description);
  }
} on IOException catch (e) {
  print('Could not describe object: $e');
} finally {
  flybyObjects.clear();
}
```

Note that the code above is asynchronous; ***try*** works for both synchronous code and code in an ***async*** function.

### Async

Avoid callback hell and make you code much more readable by using ***async*** and ***await***.

```dart
Future<void> printWithDelay(String message) async {
  await Future.delayed(Duration(seconds: 1));
  print(message);
}
```

The method above is equivalent to:

```dart
Future<void> printWithDelay(String message) {
  return Future.delayed(Duration(seconds: 1)).then((_){
    print(message); 
  });
}
```

As the next example shows, ***async*** and ***await*** help make asynchronous code easy to read.

```dart
Future<void> createDescriptions(Iterable<String> objects) async {
  for (var object in objects) {
    try {
      var file = File('$object.txt');
      if (await file.exists()) {
        var modified = await file.lastModified();
        print(
            'File for $object already exists. It was modified on $modified.');
        continue;
      }
      await file.create();
      await file.writeAsString('Start describing $object in this file.');
    } on IOException catch (e) {
      print('Cannot create description for $object: $e');
    }
  }
}
```

You can also use ***async****, which gives you a nice, readable way to build streams.

```dart
Stream<String> report(Spacecraft craft, Iterable<String> objects) async* {
  for (var object in objects) {
    await Future.delayed(oneSecond);
    yield '${craft.name} flies by $object';
  }
}
```



## Language tour

The language tour show you how to use each major Dart feature, from variables and opertors to classes and libraries.

### A basic program

```dart
// Define a function.
printInteger(int aNumber) {
  print('The number is $aNumber.'); // Print to console.
}

// This is where the app starts executing.
main() {
  var number = 42; // Declare and initialize a variable.
  printInteger(number); // Call a function.
}
```

### Important concepts

Keep these facts and concepts in mind, as you learn about the Dart language.

* Everything you can place in a variable is an object, and every object is an instance of a class
  * even numbers, functions, and null
  * all objects inherit from the ***Object*** class
* Although Dart is strongly typed, type annotations are optional because Dart can infer types. When you want to explicitly say that no type is expected, use the special type ***dynamic***
* Dart supports generic types, like ***List<int>*** or ***List<dynamic>***

* Dart support top-level functions, as well as functions tied to a class or object (**static** and **instance ** methods, respectively). You can also create functions within functions (**nested** or **local** functions)

* Dart support top-level variables, as well as variables tied to a class or object (**static** and **instance** variables). Instance variables are sometimes known as **fields** or **properties**.
* Dart doesn't have the keywords public, protected, and private. If an identifier starts with an underscore (_), it's private to its library.
* ***Identifiers*** can start with a letter or underscore (_), followed by any combination of those characters plus digits.
* Dart has both **expression**(which have runtime values) and **statements**(which don't) . A statement often contains one or more expressions, but an expression can't directly contain a statement.
  * condition ? expr1 : expr2 has a value of expr1 or expr2
  * if-else statement has no value
* Dart tools can report two kinds of problems: warnings and errors.
  * warnings are just indications that your code might not work, but they don't prevent your program from executing
  * errors can be either compile-time or run-time. A compile-time error prevents the code from executing at all; run-time error results in an exception being raised while the code executes

### Variables

Variables store references.

Create a variable and initialize it

```dart
var name = 'Bob';
```

The type of the name variables is inferred to be String. If an object isn't restricted to a single type, specify the Object or dynamic type.

```dart
dynamic name = 'Bob';
```

Another option is to explicitly declare the type that would be inferred.

```dart
String name = 'Bob';
```

**Default value**

Uninitialized variables have an initial value of ***null***.

```dart
int lineCount;
assert(lineCount == null);
```

**final and const**



### Built-in types

The Dart language has special support for the following types: **numbers, strings, booleans, lists(arrays), sets, maps, runes(Unicode characters in a string), and symbols**.

You can initialize an object of any of these special types using a literal. Some of the built-in types have their own constructors, you can use constructors to initialize variables.

**Numbers**

Dart numbers come in two flavors: int, double.

* int: $-2^{63}$ ~$2^{63}-1$
* double: 64-bit floating-point numbers

Both int and double are subtypes of num. The num type includes basic operators such as +,-,/, and *, and is also where you'll find abs(), ceil(), and floor(), among other methods. Bitwise operators, such as >>, are defined in the int class.

Number literals

```dart
// Integers are numbers without a decimal point
var x = 1;
var hex = 0xDEADBEEF;

// If a number includes a decimal, it is a double
var y = 1.1;
var exponents = 1.42e5;
```

Turn a string into a number

```dart
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
```

The int type specified the traditional bitwise shift(<<, >>), AND(&), and OR(|) operators.

```dart
assert((3 << 1) == 6); // 0011 << 1 == 0110
assert((3 >> 1) == 1); // 0011 >> 1 == 0001
assert((3 | 4) == 7);  // 0011 | 0100 == 0111
```

Literal numbers are compile-time constants. Many arithmetic expressions are also compile-time constants, as long as their operands are compile-time constants that evaluate to numbers.

```dart
const msPerSecond = 1000;
const secondsUntilRetry = 5;
const msUntilRetry = secondsUntilRetry * msPerSecond;
```

**Strings**

A Dart string is a sequence of UTF-16 code units. 

You can use either single or double quotes to create a string.

```dart
var s1 = 'Single quotes work well for string literals.';
var s2 = "Double quotes work just as well.";
var s3 = 'It\'s easy to escape the string delimiter.';
var s4 = "It's even easier to use the other delimiter.";
```

You can concatenate strings using adjacent string literals or the ***+*** operator.

```dart
var s1 = 'String '
    'concatenation'
    " works even over line breaks.";
assert(s1 ==
    'String concatenation works even over '
        'line breaks.');

var s2 = 'The + operator ' + 'works, as well.';
assert(s2 == 'The + operator works, as well.');
```

To create a multi-line string, use a triple quote with either single or double quotation marks.

```dart
var s1 = '''
You can create
multi-line strings like this one.
''';

var s2 = """This is also a
multi-line string.""";
```

You can create a "raw" string by prefixing it with **r**.

```dart
var s = r'In a raw string, not even \n gets special treatment.';
```

You can put the value of an expression inside a string. To get the string corresponding to an object, Dart calls the object's ***toString()*** method.

```dart
var s = 'string interpolation';

assert('Dart has $s, which is very handy.' ==
    'Dart has string interpolation, ' +
        'which is very handy.');
assert('That deserves all caps. ' +
        '${s.toUpperCase()} is very handy!' ==
    'That deserves all caps. ' +
        'STRING INTERPOLATION is very handy!');
```

**Booleans**

To represent boolean values, Dart has a type named ***bool***. Only two objects have type bool: the boolean literals ***true*** and ***false***, which are both compile-time constants.

```dart
// Check for an empty string.
var fullName = '';
assert(fullName.isEmpty);

// Check for zero.
var hitPoints = 0;
assert(hitPoints <= 0);

// Check for null.
var unicorn;
assert(unicorn == null);

// Check for NaN.
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);
```

**Lists**

The most common collection is the array, or ordered group of objects. In Dart, arrays are ***List*** objects, so most people just call them ***lists***.

Lists use zero-based indexing, where 0 is the index of the first element and list.length-1 is the index of the last element.

```dart
var list = [1, 2, 3];
assert(list.length == 3);
assert(list[1] == 2);

list[1] = 1;
assert(list[1] == 1);
```

To create a list that's a compile-time constant, add ***const*** before the list literal.

```dart
var constantList = const [1, 2, 3];
// constantList[1] = 1; // Uncommenting this causes an error.
```

Use a ***spread operator(...)*** to insert all the elements of a list into another list.

```dart
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);
```

To avoid exceptions, use a ***null-aware spread operator(...?)***.

```dart
var list;
var list2 = [0, ...?list];
assert(list2.length == 1);
```

Use ***collection if*** to create a list with three or four items in it.

```dart
var nav = [
  'Home',
  'Furniture',
  'Plants',
  if (promoActive) 'Outlet'
];
```

Use ***collection for*** to manipulate the items of a list before adding them to another list.

```dart
var listOfInts = [1, 2, 3];
var listOfStrings = [
  '#0',
  for (var i in listOfInts) '#$i'
];
assert(listOfStrings[1] == '#1');
```

**Sets**

A set in Dart is an unordered collection of unique items. Dart support for sets is provided by set literals and the ***Set*** type.

Use a set literal

```dart
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
```

Create an empty set

```dart
var names = <String>{};
// Set<String> names = {}; // This works, too.
// var names = {}; // Creates a map of type Map<dynamic, dynamic>, not a set.
```

Add items to an existing set

```dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
```

Get the number of items in the set

```dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
assert(elements.length == 5);
```

To create a set that's a compile-time constant, add ***const*** before the set literal

```dart
final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
};
// constantSet.add('helium'); // Uncommenting this causes an error.
```

Sets support spread operators(... and ...?) and collection ifs and fors, just like lists do.

**Maps**

In general, a map is an object that associates keys and values. Both keys and values can be any type of object. Each key occurs only once, but you can use the same value multiple times. Dart support for maps is provided by map literals and the ***Map*** type.

Use map literals

```dart
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```

Use a Map constructor

```dart
var gifts = Map();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var nobleGases = Map();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
```

Add a new key-value pair to an existing map

```dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds'; // Add a key-value pair
```

Retrieve a value from a map

```dart
var gifts = {'first': 'partridge'};
assert(gifts['first'] == 'partridge');
```

If you look for a key that isn't in a map, you get a null in return

```dart
var gifts = {'first': 'partridge'};
assert(gifts['fifth'] == null);
```

Get the number of key-value pair in the map

```dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';
assert(gifts.length == 2);
```

To create a map that's a compile-time constant, add ***const*** before the map literal

```dart
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};

// constantMap[2] = 'Helium'; // Uncommenting this causes an error.
```

Maps support spread operators(... and ...?) and collection ifs and fors, just like lists do.

**Runes and grapheme clusters**

Unicode defines a unique numeric value for each letter, digit, and symbol used in all of the world's writing systems. Because a Dart string is a sequence of UTF-16 code units, expressing Unicode code points within a string requires special syntax. The usual way to express a Unicode code point is \uXXXX, where XXXX is a 4-digit hexadecimal value. for example,

* heart character(♥)  is \u2665
* laughing emoji (😆) is \u{1f600}

If you need to read or write individual Unicode characters, use the **characters** getter defined on String by the character package.

```dart
import 'package:characters/characters.dart';

var hi = 'Hi 🇩🇰';
print(hi);
print('The end of the string: ${hi.substring(hi.length - 1)}');
print('The last character: ${hi.characters.last}\n');
```

**Symbols**

A ***Symbol*** object represents an operator or identifier declared in a Dart program. 

To get the symbol for an identifier, use a symbol literal, which is just **#** followed by the identifier.

```dart
#radix
#bar
```

Symbol literals are compile-time constants.

### Functions

Functions are objects and have a type, ***Function***.  This means that functions can be assigned to variables or passed as arguments to other functions.

```dart
// The function still works if you omit return type
bool isNoble(int atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

**arrow syntax**: for functions that contain just one expression

```dart
bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
```

A function can have two types of parameters: **required** and **optional**. The required parameters are listed first, followed by any optional parameters. 

**Optional parameters**

Optional parameters can be **named** or **positional**, but not both.

Define and call a function with **named parameters**

```dart
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool bold, bool hidden}) {
  // ...
}

// Call the function
enableFlags({bold: true, hidden: false});
```

You can annotate a optional parameter with @***required*** to indicate that the parameter is mandatory.

```dart
import 'package:meta/meta.dart';

const Scrollbar({Key key, @required Widget child})
```

Wrap a set of function parameters in [] marks them as **optional positional parameters**.

```dart
String say(String from, String msg, [String device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}

assert(say('Bob', 'Howdy') == 'Bob says Howdy');
assert(say('Bob', 'Howdy', 'smoke signal') ==
    'Bob says Howdy with a smoke signal');
```

You can define **default values** for both named and positional parameters. The default values must be compile-time constants. If no default value is provided, the default value is null.

```dart
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool bold = false, bool hidden = false}) {...}

// bold will be true; hidden will be false.
enableFlags(bold: true);
```

Set default values for positional parameters.

```dart
String say(String from, String msg,
    [String device = 'carrier pigeon', String mood]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  if (mood != null) {
    result = '$result (in a $mood mood)';
  }
  return result;
}

assert(say('Bob', 'Howdy') ==
    'Bob says Howdy with a carrier pigeon');
```

**main() function**

Every app must have a top-level main() function, which serves as the entry point to the app. The main() function returns ***void*** and has an optional ***List<String>*** parameter for arguments.

```dart
void main() {
  querySelector('#sample_text_id')
    ..text = 'Click me!'
    ..onClick.listen(reverseText);
}
```

You can use the **args library** to define and parse command-line arguments.

```dart
// Run the app like this: dart args.dart 1 test
void main(List<String> arguments) {
  print(arguments);

  assert(arguments.length == 2);
  assert(int.parse(arguments[0]) == 1);
  assert(arguments[1] == 'test');
}
```

**Functions as first-class objects**

Pass a function as parameter to another function

```dart
void printElement(int element) {
  print(element);
}

var list = [1, 2, 3];

// Pass printElement as a parameter.
list.forEach(printElement);
```

Assign a function to a variable

```dart
var loudify = (msg) => '!!! ${msg.toUpperCase()} !!!';
assert(loudify('hello') == '!!! HELLO !!!');
```

**Anonymous functions**

Create a **nameless** function called an anonymous function, or sometimes as a ***lambda*** or ***closure***.

```dart
var list = ['apples', 'bananas', 'oranges'];
list.forEach((item) {
  print('${list.indexOf(item)}: $item');
});
```

Use arrow notation

```dart
list.forEach(
    (item) => print('${list.indexOf(item)}: $item'));
```

**Lexical scope**

Dart is a lexically scoped language, which means that the scope of variables is determined statically, simple by the layout of the code. You can follow the curly braces outwards to see if a variable is in scope.

```dart
bool topLevel = true;

void main() {
  var insideMain = true;

  void myFunction() {
    var insideFunction = true;

    void nestedFunction() {
      var insideNestedFunction = true;

      assert(topLevel);
      assert(insideMain);
      assert(insideFunction);
      assert(insideNestedFunction);
    }
  }
}
```

**Lexical closures**

A **closure** is a function object that has access to variables in its lexical scope, even when the function is used outside of its original scope.

```dart
/// Returns a function that adds [addBy] to the
/// function's argument.
Function makeAdder(num addBy) {
  return (num i) => addBy + i;
}

void main() {
  // Create a function that adds 2.
  var add2 = makeAdder(2);

  // Create a function that adds 4.
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);
}
```

**Testing functions for equality**

Test top-level functions, static methods, and instance methods for equality.

```dart
void foo() {} // A top-level function

class A {
  static void bar() {} // A static method
  void baz() {} // An instance method
}

void main() {
  var x;

  // Comparing top-level functions.
  x = foo;
  assert(foo == x);

  // Comparing static methods.
  x = A.bar;
  assert(A.bar == x);

  // Comparing instance methods.
  var v = A(); // Instance #1 of A
  var w = A(); // Instance #2 of A
  var y = w;
  x = w.baz;

  // These closures refer to the same instance (#2),
  // so they're equal.
  assert(y.baz == x);

  // These closures refer to different instances,
  // so they're unequal.
  assert(v.baz != w.baz);
}
```

**Return values**

All functions return a value. If no return value is specified, the statement  ***return null;*** is implicitly appended to the function body.

```dart
foo() {}

assert(foo() == null);
```

### Operators

Dart defines the operators shown in the following table.

| Description              | Operator                                   |
| ------------------------ | ------------------------------------------ |
| unary postfix            | *expr++ expr-- () [] . ?.*                 |
| unary prefix             | -expr !expr ~expr ++expr --expr await expr |
| multiplicative           | * / % ~/                                   |
| aditive                  | + -                                        |
| shift                    | << >> >>>                                  |
| bitwise AND OR XOR       | & \| ^                                     |
| logical AND OR           | && \|\|                                    |
| relational and type test | ***>= > <= < as is is!***                  |
| equality                 | == !=                                      |
| if null                  | ??                                         |
| conditional              | expr1 ? expr2 : expr3                      |
| cascade                  | ..                                         |
| assignment               | = *= /= += -= &= ^= etc.                   |

### Control flow statements

You can control the flow of your Dart code.

* if and else

  ```dart
  if (isRaining()) {
    you.bringRainCoat();
  } else if (isSnowing()) {
    you.wearJacket();
  } else {
    car.putTopDown();
  }
  ```

* for loops

  ```dart
  var message = StringBuffer('Dart is fun');
  for (var i = 0; i < 5; i++) {
    message.write('!');
  }
  ```

- for-in loops

  ```dart
  var collection = [0, 1, 2];
  for (var x in collection) {
    print(x); // 0 1 2
  }
  ```

- while loop

  ```dart
  while (!isDone()) {
    doSomething();
  }
  ```

- do-while loop

  ```dart
  do {
    printLine();
  } while (!atEndOfPage());
  ```

- break

  ```dart
  while (true) {
    if (shutDownRequested()) break;
    processIncomingRequests();
  }
  ```

- continue

  ```dart
  for (int i = 0; i < candidates.length; i++) {
    var candidate = candidates[i];
    if (candidate.yearsExperience < 5) {
      continue;
    }
    candidate.interview();
  }
  ```

- switch and case

  ```dart
  var command = 'OPEN';
  switch (command) {
    case 'CLOSED':
      executeClosed();
      break;
    case 'PENDING':
      executePending();
      break;
    case 'APPROVED':
      executeApproved();
      break;
    case 'DENIED':
      executeDenied();
      break;
    case 'OPEN':
      executeOpen();
      break;
    default:
      executeUnknown();
  }
  ```

  Dart does support empty ***case*** clauses, following a form of fall-through

  ```dart
  var command = 'CLOSED';
  switch (command) {
    case 'CLOSED': // Empty case falls through.
    case 'NOW_CLOSED':
      // Runs for both CLOSED and NOW_CLOSED.
      executeNowClosed();
      break;
  }
  ```

- assert

  Disrupt normal execution if a boolean condition is false and an ***AssertionError*** is thrown.

  ```dart
  // Make sure the variable has a non-null value.
  assert(text != null);
  
  // Make sure the value is less than 100.
  assert(number < 100);
  
  // Make sure this is an https URL.
  assert(urlString.startsWith('https'));
  ```

  Attach a message to an assertion

  ```dart
  assert(urlString.startsWith('https'),
      'URL ($urlString) should start with "https".');
  ```

  When exactly do assertions work?

  - Flutter enables assertion in debug mode
  - Development-only tools such as **dartdevc** typically enable assertions by default
  - Some tools, such as **dart** and **dart2js**, support assertions through --enable-asserts

  In production code, assertions are ignored, and the arguments to ***assert*** aren't evaluated.

### Exceptions

Exceptions are errors indicating that something unexpected happened. If the exception isn't caught, the **isolate** that raised the exception is suspended, and typically the isolate and its program are terminated.

Dart's exceptions are unchecked exceptions. Methods do not declare which exceptions they might throw, and you are not required to catch any exception.

Dart provides ***Exception*** and ***Error*** types, as well as numerous predefined subtypes. Of course, you can define your own exceptions. However, Dart programs can throw any non-null object as an exception.

Throw or raise an exception

```dart
throw FormatException('Expected at least 1 section');
throw 'Out of llamas!';
```

Because throwing an exception is an expression, you can throw exceptions in anywhere else that allows expressions

```dart
void distanceTo(Point other) => throw UnimplementedError();
```

Catching or capturing an exception stops the exception from propagating.

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  buyMoreLlamas();
}
```

You can specify multiple catch clauses to catch more than one type of exception

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // A specific exception
  buyMoreLlamas();
} on Exception catch (e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {
  // No specified type, handles all
  print('Something really unknown: $e');
}
```

Trace the stack of exceptions

```dart
try {
  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
```

Rethrow an exception

```dart
void misbehave() {
  try {
    dynamic foo = true;
    print(foo++); // Runtime error
  } catch (e) {
    print('misbehave() partially handled ${e.runtimeType}.');
    rethrow; // Allow callers to see the exception.
  }
}

void main() {
  try {
    misbehave();
  } catch (e) {
    print('main() finished handling ${e.runtimeType}.');
  }
}
```

The cleanup code runs whether or not an exception is thrown. if the exception is not caught, it will be propagated after the cleanup code runs.

```dart
try {
  breedMoreLlamas();
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLlamaStalls();
}
```

```dart
try {
  breedMoreLlamas();
} catch (e) {
  print('Error: $e'); // Handle the exception first.
} finally {
  cleanLlamaStalls(); // Then clean up.
}
```

### Classes

Dart is an object-oriented language with classes and mixin-based inheritance. Every object is an instance of a class, and all classes descend from ***Object***. 

* Mixin-based inheritance: a class body can be used in multiple class hierarchies
* Extension methods: a way to add functionality to a class without changing the class or creating a subclass

**Using constructors**

You can create an object using a constructor. Constructor names can be either ClassName or ClassName.identifier. 

```dart
var p1 = Point(2, 2);
var p2 = Point.fromJson({'x': 1, 'y': 2});
```

The ***new*** keyword became optional in Dart 2.

```dart
var p1 = new Point(2, 2);
var p2 = new Point.fromJson({'x': 1, 'y': 2});
```

**Using constant constructors**

To create a compile-time constant, put the ***const*** before the constructor name.

```dart
var p = const ImmutablePoint(2, 2);
```

Constructing two identical compile-time constants results in a single, canonical instance.

```dart
var a = const ImmutablePoint(1, 1);
var b = const ImmutablePoint(1, 1);

assert(identical(a, b)); // They are the same instance!
```

Within a **constant context**, you can omit the ***const*** before a constructor or literal.

```dart
// Lots of const keywords here.
const pointAndLine = const {
  'point': const [const ImmutablePoint(0, 0)],
  'line': const [const ImmutablePoint(1, 10), const ImmutablePoint(-2, 11)],
};
```

You can omit all but the first use of the const keyword.

```dart
// Only one const, which establishes the constant context.
const pointAndLine = {
  'point': [ImmutablePoint(0, 0)],
  'line': [ImmutablePoint(1, 10), ImmutablePoint(-2, 11)],
};
```

If a constant constructor is outside of a constant context and is invoked without ***const***, it creates a non-constant object.

```dart
var a = const ImmutablePoint(1, 1); // Creates a constant
var b = ImmutablePoint(1, 1); // Does NOT create a constant

assert(!identical(a, b)); // NOT the same instance!
```

**Using class members**

Objects have members consisting of functions and data(methods and instance variables, respectively). When you call a method, you invoke it on an object: the method has access to that object's functions and data.

Use a dot(.) to refer to an instance variable or method

```dart
var p = Point(2, 2);

// Set the value of the instance variable y.
p.y = 3;

// Get the value of y.
assert(p.y == 3);

// Invoke distanceTo() on p.
num distance = p.distanceTo(Point(4, 4));
```

Use ?. instead of . to avoid an exception when the leftmost operand is null

```dart
// If p is non-null, set its y value to 4.
p?.y = 4;
```

**Getting an object's type**

***Object.runtimeType*** property returns a ***Type*** object.

```dart
print('The type of a is ${a.runtimeType}');
```

==Up to here, you've seen how to use classes. The rest of this section shows how to implement classes.==

**Instance variables**

Declare instance variables in the class body. All uninitialized instance variables have the value null.

All instance variables generate an implicit getter method. Non-final instance variables also generate an implicit setter method.

```dart
class Point {
  num x; // Declare instance variable x, initially null.
  num y; // Declare y, initially null.
  num z = 0; // Declare z, initially 0.
}

void main() {
  var point = Point();
  point.x = 4; // Use the setter method for x.
  assert(point.x == 4); // Use the getter method for x.
  assert(point.y == null); // Values default to null.
}
```

If you initialize an instance variable where it is declared, the value is set when the instance is created, which is before the constructor and its initializer list execute.

**Constructors**

Declare a constructor by creating a function with the same name as its class: the generative constructor.

```dart
class Point {
  num x, y;

  Point(num x, num y) {
    // There's a better way to do this, stay tuned.
    this.x = x;
    this.y = y;
  }
}
```

Use this only when there is a name conflict. Otherwise, Dart style omits the this.

The pattern of assigning a constructor argument to an instance variable is so common, Dart has syntactic sugar to make it easy.

```dart
class Point {
  num x, y;

  // Syntactic sugar for setting x and y
  // before the constructor body runs.
  Point(this.x, this.y);
}
```

If you don't declare a constructor, a **default constructor** is provided for you. The default constructor has no arguments and invokes the no-argument constructor in the superclass.

Subclasses **don't inherit** constructors from their superclass. A subclass that declares no constructors has only the  default constructor.

**Named constructors**

Use a named constructor to implement multiple constructors for a class or to provide extra clarity.

```dart
class Point {
  num x, y;

  Point(this.x, this.y);

  // Named constructor
  Point.origin() {
    x = 0;
    y = 0;
  }
}
```

**Initializer list**

You can initialize instance variables before the constructor body runs.

```dart
// Initializer list sets instance variables before
// the constructor body runs.
Point.fromJson(Map<String, num> json)
    : x = json['x'],
      y = json['y'] {
  print('In Point.fromJson(): ($x, $y)');
}
```

> The right-hand side of an initializer does not have access to ***this***.
>
> ```dart
> class Point {
>   final num x;
>   final num y;
>   final num distanceFromOrigin;
> 
>   Point(x, y)
>       : x = x,
>         y = y,
>         distanceFromOrigin = sqrt(x * x + y * y);
> }
> 
> main() {
>   var p = new Point(2, 3);
>   print(p.distanceFromOrigin);
> }
> ```

During development, you can validate inputs by using ***assert*** in the initializer list.

```dart
Point.withAssert(this.x, this.y) : assert(x >= 0) {
  print('In Point.withAssert(): ($x, $y)');
}
```

**Redirecting constructors**

Sometimes a constructor's only purpose is to redirect to another constructor in the same class and its body is empty.

```dart
class Point {
  num x, y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // Delegates to the main constructor.
  Point.alongXAxis(num x) : this(x, 0);
}
```

**Constant constructors**

If your class produces objects that never change, you can make these objects compile-time constants.

* define a ***const*** constructor
* make sure that all instance variables are final

```dart
class ImmutablePoint {
  static final ImmutablePoint origin =
      const ImmutablePoint(0, 0);

  final num x, y;

  const ImmutablePoint(this.x, this.y);
}
```

**Factory constructors**

Implement a constructor that doesn't always create a new instance of its class.

- return an instance from a cache
- return an instance of a subtype

```dart
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to
  // the _ in front of its name.
  static final Map<String, Logger> _cache =
      <String, Logger>{};

  factory Logger(String name) {
    return _cache.putIfAbsent(
        name, () => Logger._internal(name));
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}
```

> Factory constructors have no access to ***this***.

Invoke a factory constructor just like you would any other constructor.

```dart
var logger = Logger('UI');
logger.log('Button clicked');
```

**Invoking a non-default superclass constructor**

By default, a constructor in a subclass calls the superclass's unnamed, no-argument constructor. The superclass's constructor is called at the beginning of the constructor body. If an **initializer list** is also being used, it executes before the superclass is called. In summary, the order of execution is as follows:

1. initializer list
2. superclass's no-arg constructor
3. main class's no-arg constructor

If the superclass doesn't have an unnamed, no-argument constructor, then you must manually call one of the constructors in the superclass.

```dart
class Person {
  String firstName;

  Person.fromJson(Map data) {
    print('in Person');
  }
}

class Employee extends Person {
  // Person does not have a default constructor;
  // you must call super.fromJson(data).
  Employee.fromJson(Map data) : super.fromJson(data) {
    print('in Employee');
  }
}

main() {
  var emp = new Employee.fromJson({});

  // Prints:
  // in Person
  // in Employee
  if (emp is Person) {
    // Type check
    emp.firstName = 'Bob';
  }
  (emp as Person).firstName = 'Bob';
}
```

**Methods**

Methods are functions that provide behavior for an object.

**Instance methods**

Instance methods on objects can access instance variables and ***this***.

```dart
import 'dart:math';

class Point {
  num x, y;

  Point(this.x, this.y);

  num distanceTo(Point other) {
    var dx = x - other.x;
    var dy = y - other.y;
    return sqrt(dx * dx + dy * dy);
  }
}
```

**Getters and setters**

Getters and setters are special methods that provide read and write access to an object's properties

```dart
class Rectangle {
  num left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // Define two calculated properties: right and bottom.
  num get right => left + width;
  set right(num value) => left = value - width;
  num get bottom => top + height;
  set bottom(num value) => top = value - height;
}

void main() {
  var rect = Rectangle(3, 4, 20, 15);
  assert(rect.left == 3);
  rect.right = 12;
  assert(rect.left == -8);
}
```

With getters and setters, you can start with instance variables, later wrapping them with methods, all without changing client code.

**Abstract methods**

Instance, getter, and setter methods can be abstract, defining an interface but leaving its implementation up to other classes. Abstract methods can only exist in abstract classes.

```dart
abstract class Doer {
  // Define instance variables and methods...

  void doSomething(); // Define an abstract method.
}

class EffectiveDoer extends Doer {
  void doSomething() {
    // Provide an implementation, so the method is not abstract here...
  }
}
```

**Abstract classes**

Abstract classes can't be instantiated and are useful for defining interfaces, often with some implementation. If you want your abstract class to appear to be instantiable, define a factory constructor.

```dart
// This class is declared abstract and thus
// can't be instantiated.
abstract class AbstractContainer {
  // Define constructors, fields, methods...

  void updateChildren(); // Abstract method.
}
```

**Implicit interfaces**

Every class implicitly defines an interface containing all the instance members of the class and of any interfaces it implements. 

If you want to create class A that supports class B's API without inheriting B's implementation, class A should implement the B interface.

```dart
// A person. The implicit interface contains greet().
class Person {
  // In the interface, but visible only in this library.
  final _name;

  // Not in the interface, since this is a constructor.
  Person(this._name);

  // In the interface.
  String greet(String who) => 'Hello, $who. I am $_name.';
}

// An implementation of the Person interface.
class Impostor implements Person {
  get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}

String greetBob(Person person) => person.greet('Bob');

void main() {
  print(greetBob(Person('Kathy')));
  print(greetBob(Impostor()));
}
```

A class implements one or more interfaces.

```dart
class Point implements Comparable, Location {...}
```

**Extending a class**

Use ***extends*** to create a subclass, and ***super*** to refer to the superclass.

```dart
class Television {
  void turnOn() {
    _illuminateDisplay();
    _activateIrSensor();
  }
  // ···
}

class SmartTelevision extends Television {
  void turnOn() {
    super.turnOn();
    _bootNetworkInterface();
    _initializeMemory();
    _upgradeApps();
  }
  // ···
}
```

Subclasses can override instance methods, getters, and setters.

```dart
class SmartTelevision extends Television {
  @override
  void turnOn() {...}
  // ···
}
```

You can override the operators

```dart
class Vector {
  final int x, y;

  Vector(this.x, this.y);

  Vector operator +(Vector v) => Vector(x + v.x, y + v.y);
  Vector operator -(Vector v) => Vector(x - v.x, y - v.y);

  // Operator == and hashCode not shown. For details, see note below.
  // ···
}

void main() {
  final v = Vector(2, 3);
  final w = Vector(2, 2);

  assert(v + w == Vector(4, 5));
  assert(v - w == Vector(0, 1));
}
```

Detect or react whenever code attempts to use a non-existent method or instance variable.

```dart
class A {
  // Unless you override noSuchMethod, using a
  // non-existent member results in a NoSuchMethodError.
  @override
  void noSuchMethod(Invocation invocation) {
    print('You tried to use a non-existent member: ' +
        '${invocation.memberName}');
  }
}
```

**Extension methods**

Extension methods are a way to add functionality to existing libraries.

```dart
// string_apis.dart
extension NumberParsing on String {
  int parseInt() {
    return int.parse(this);
  }
  // ···
}
```

```dart
// Import a library that contains an extension on String.
import 'string_apis.dart';
// ···
print('42'.padLeft(5)); // Use a String method.
print('42'.parseInt()); // Use an extension method.
```

**Enumerated types**

Enumerated types, often called enumerations or enums, are a special kind of class used to represent a fixed number of constant values.

```dart
enum Color { red, green, blud }
```

Each value in an enum has an **index** getter, which returns the zero-based position of the value in the ***enum*** declaration.

```dart
assert(Color.red.index == 0);
assert(Color.green.index == 1);
assert(Color.blue.index == 2);
```

Get a list of all of the values in the enum

```dart
List<Color> colors = Color.values;
assert(colors[2] == Color.blue);
```

You can use enums in **switch statements**, and you'll get a warning if you don't handle all of the enum's values.

```dart
var aColor = Color.blue;

switch (aColor) {
  case Color.red:
    print('Red as roses!');
    break;
  case Color.green:
    print('Green as grass!');
    break;
  default: // Without this, you see a WARNING.
    print(aColor); // 'Color.blue'
}
```

**Mixins**

Mixins are a way of reusing a class's code in multiple class hierarchies.

To implement a mixin, create a class that extends ***Object*** and declares no constructors, or use the **mixin** instead of class if you don't use it as a regular class.

```dart
mixin Musical {
  bool canPlayPiano = false;
  bool canCompose = false;
  bool canConduct = false;

  void entertainMe() {
    if (canPlayPiano) {
      print('Playing piano');
    } else if (canConduct) {
      print('Waving hands');
    } else {
      print('Humming to self');
    }
  }
}
```

Specify that only certain types can use the mixin

```dart
mixin MusicalPerformer on Musician {
  // ···
}
```

Use mixins

```dart
class Musician extends Performer with Musical {
  // ···
}

class Maestro extends Person
    with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}
```

**Class variables and methods**

Use the ***static*** keyword to implement class-wide variables and methods.

Class variables are useful for class-wide state and constants and aren't initialized until they're used.

```dart
class Queue {
  static const initialCapacity = 16;
  // ···
}

void main() {
  assert(Queue.initialCapacity == 16);
}
```

Class methods do not operate on an instance, and thus do not have access to ***this***.

```dart
import 'dart:math';

class Point {
  num x, y;
  Point(this.x, this.y);

  static num distanceBetween(Point a, Point b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
  }
}

void main() {
  var a = Point(2, 2);
  var b = Point(4, 4);
  var distance = Point.distanceBetween(a, b);
  assert(2.8 < distance && distance < 2.9);
  print(distance);
}
```

### Generics

The type List<E> is a generic(or parameterized) type which has a formal type parameters. By convention, most type variables have single-letter names, such as E, T, S, K, and V.

**Why use generics?**

Generics have benefits allowing your code to run:

- with type safety
- reduce code duplication

Assign a no-string to the list is probably a mistake.

```dart
var names = List<String>();
names.addAll(['Seth', 'Kathy', 'Lars']);
names.add(42); // Error
```

Share a single interface and implementation between many types.

```dart
// Create an interface for caching an object
abstract class ObjectCache {
  Object getByKey(String key);
  void setByKey(String key, Object value);
}

// Create an interface for caching strings
abstract class StringCache {
  String getByKey(String key);
  void setByKey(String key, String value);
}

// Create a generic interface that takes a type parameter
// T is the stand-in type. It's a placeholder that you can 
// think of as a type that a developer will define later.
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}
```

**Using collection literals**

List, set, and map literals can be parameterized. 

```dart
var names = <String>['Seth', 'Kathy', 'Lars'];
var uniqueNames = <String>{'Seth', 'Kathy', 'Lars'};
var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
};
```

**Using parameterized types with constructors**

```dart
var nameSet = Set<String>.from(names);
var views = Map<int, View>();
```

**Generic collections and the types they contain**

Dart generic types are reified, which means that they carry their type information around at runtime.

```dart
var names = List<String>();
names.addAll(['Seth', 'Kathy', 'Lars']);
print(names is List<String>); // true
```

**Restricting the parameterized type**

When implementing a generic type, you might want to limit the types of its parameters.

```dart
class Foo<T extends SomeBaseClass> {
  // Implementation goes here...
  String toString() => "Instance of 'Foo<$T>'";
}

class Extender extends SomeBaseClass {...}

var someBaseClassFoo = Foo<SomeBaseClass>();
var extenderFoo = Foo<Extender>();

var foo = Foo();
print(foo); // Instance of 'Foo<SomeBaseClass>'

// results in an error
var foo = Foo<Object>();
```

**Using generic methods**

A newer syntax, called **generic methods**, allows type arguments on methods and functions.

```dart
T first<T>(List<T> ts) {
  // Do some initial work or error checking, then...
  T tmp = ts[0];
  // Do some additional checking or processing...
  return tmp;
}
```

The type argument can be used in several places:

- In the function's return type
- In the type of an argument
- In the type of a local variable

### Libraries and visibility

The ***import*** and ***library*** directives can help you create a **modular** and **shareable** code base. Libraries not only provide APIs, but are a unit of **privacy**: identifiers that start with an **underscore**(_) are visible only inside the library. 

Every Dart app is a library, even if it doesn't use a library directive. Libraries can be distributed using ***packages***.

**Using libraries**

Use ***import*** to specify how a namespace from one library is used in the scope of another library.

```dart
import 'dart:html';
import 'package:test/test.dart';
```

The only required argument to import is a URI specifying the library.

- built-in libraries: dart: scheme
- other libraries: package: scheme
- a file system path

> URI stands for uniform resource identifier. URLs(uniform resource locators) are a common kind of URI.

**Specifying a library prefix**

If you import two libraries that have conflicting identifiers, then you an specify a prefix for one or both libraries.

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// Uses Element from lib1.
Element element1 = Element();

// Uses Element from lib2.
lib2.Element element2 = lib2.Element();
```

**Importing only part of a library**

If you want to use only part of a library, you can selectively import the library.

```dart
// Import only foo.
import 'package:lib1/lib1.dart' show foo;

// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;
```

**Implementing libraries**

The advice on how to implement a library package includes:

- How to organize library source code
- How to use the ***export*** directive
- When to use the ***part*** directive
- When to use the ***library*** directive
- How to use **conditional** imports and exports to implement a library that supports **multiple** platforms

### Asynchrony support

Dart libraries are full of functions that return ***Future*** or ***Stream*** objects. These functions are ***asynchronous***. They return after setting up a possibly time-consuming operation, without waiting for that operation to complete.

The ***async*** and ***await*** keywords support asynchronous programming, letting you write asynchronous code that looks similar to synchronous code.

**Handling Futures**

When you need the result of a completed **Future**, you have two options.

- Use async and await
- Use the Future API

Code that uses async and await is asynchronous, but it looks a lot like synchronous code.

```dart
Future checkVersion() async {
  var version = await lookUpVersion();
  // Do something with version
}
```

Use try, catch, finally to handle errors and cleanup in code that uses await.

```dart
try {
  version = await lookUpVersion();
} catch (e) {
  // React to inability to look up the version
}
```

You can use await multiple times in an async function.

```dart
var entrypoint = await findEntrypoint();
var exitCode = await runExecutable(entrypoint, args);
await flushThenExit(exitCode);
```

In await expression, that value of expression is usually a Future; if it isn't, then the value is automatically wrapped in a Future. This Future object indicates a promise to return an object.  The await expression makes execution pause until that object is available.

**Declaring async functions**

An async function is a function whose body is marked with the async modifier.

Adding the async keyword to a function makes it return a Future.

```dart
Future<String> lookUpVersion() async => '1.0.0';
```

If your function doesn't return a useful value, make its return type Future<void>. 

Note that the function's body doesn't need to use the Future API. Dart creates the Future object if necessary.

**Handling Streams**

When you need to get values from a Stream, you have two options.

- Use async and an asynchronous for loop(await for)
- Use the Stream API

```dart
Future main() async {
  // ...
  await for (var request in requestServer) {
    handleRequest(request);
  }
  // ...
}
```

The value of *requestServer* must have type Stream. Execution proceeds as follows.

1. Wait until the stream emits a value
2. Execute the body of the for loop, with the variable set to that emitted value
3. Repeat 1 and 2 until the stream is closed

To stop listening to the stream, you can use a break or return statement, which breaks out of the for loop and unsubscribes from the stream.

### Generators

When you need to lazily produce a sequence of values, consider using a ***generator function***. Dart has built-in support for two kinds of generator function.

### Callable classes

To allow an instance of your Dart class to be called like a function, implement the ***call()*** method.

```dart
class WannabeFunction {
  call(String a, String b, String c) => '$a $b $c!';
}

main() {
  var wf = new WannabeFunction();
  var out = wf("Hi","there,","gang");
  print('$out');
}
```

### Isolates

Most computers, even on mobile platforms, have multi-core CPUs. To take advantage of all those cores, developers traditionally use shared-memory threads running concurrently. However, shared-state concurrency is error prone and can lead to complicated code.

Instead of threads, all Dart code runs inside of ***isolates***. Each isolate has its own memory heap, ensuring that no isolate's state is accessible from any other isolate.

### Typedefs

In Dart, functions are objects, just like strings and numbers are objects.  A ***typedef***, or ***function-type alias***, gives a **function type** a name that you can use when declaring fields and return types. A typedef retains **type information** when a function type is assigned to a variable.

```dart
typedef Compare = int Function(Object a, Object b);

class SortedCollection {
  Compare compare;

  SortedCollection(this.compare);
}

// Initial, broken implementation.
int sort(Object a, Object b) => 0;

void main() {
  SortedCollection coll = SortedCollection(sort);
  assert(coll.compare is Function);
  assert(coll.compare is Compare);
}
```

Because typedefs are simple aliases, they offer a way to check the type of any function.

```dart
typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True!
}
```

### Metadata

Use metadata to give additional information about your code. A metadata annotation begins with the character **@**, followed by either a reference to a compile-time constant or a call to a constant constructor.

Two annotations are available to all Dart code: **@deprecated** and **@override**.

```dart
class Television {
  /// _Deprecated: Use [turnOn] instead._
  @deprecated
  void activate() {
    turnOn();
  }

  /// Turns the TV's power on.
  void turnOn() {...}
}
```

You can define your own metadata annotations.

```dart
library todo;

class Todo {
  final String who;
  final String what;

  const Todo(this.who, this.what);
}
```

And here's an example of using that @todo annotation.

```dart
import 'todo.dart';

@Todo('seth', 'make this do something')
void doSomething() {
  print('do something');
}
```

Metadata can appear before a library, class, typedef, type parameter, constructor, factory, function, field, parameter, or variable declaration and before an import or export directive. You can retrieve metadata at runtime using reflection.

### Comments

Dart supports single-line comments, multi-line comments, and documentation comments.

**Single-line comments**

A single-line comment begins with **//**.

```dart
void main() {
  // TODO: refactor into an AbstractLlamaGreetingFactory?
  print('Welcome to my Llama farm!');
}
```

**Multi-line comments**

A multi-line comment begin with **/*** and ends with ***/**.  Multi-line comments can nest.

```dart
void main() {
  /*
   * This is a lot of work. Consider raising chickens.

  Llama larry = Llama();
  larry.feed();
  larry.exercise();
  larry.clean();
   */
}
```

**Documentation comments**

Documentation comments are multi-line or single-line comments that begin with **///** or **/****. Using /// on consecutive lines has the same effect as a multi-line doc comment.

Inside a documentation comment, using **brackets**, you can refer to classes, methods, fields, top-level variables, functions, and parameters. The names in brackets are resolved in the **lexical scope** of the documented program element.

```dart
/// A domesticated South American camelid (Lama glama).
///
/// Andean cultures have used llamas as meat and pack
/// animals since pre-Hispanic times.
class Llama {
  String name;

  /// Feeds your llama [Food].
  ///
  /// The typical llama eats one bale of hay per week.
  void feed(Food food) {
    // ...
  }

  /// Exercises your llama with an [activity] for
  /// [timeLimit] minutes.
  void exercise(Activity activity, int timeLimit) {
    // ...
  }
}
```

In the generated documentation, [Food] becomes a link to the API docs for the Food class.

To parse Dart code and generate HTML documentation, you can use the **dartdoc** tool.





## **Library tour**

### dart:core

The dart:core library provides a small but critical set of built-in functionality. This library is automatically imported into every Dart program.

#### Printing to the console

The top-level ***print()*** method takes a single argument and displays that object's string value in the console.

```dart
print(obj); // obj.toString()
print('I drink $tea.');
```

#### Numbers

The dart:core library defines the num, int and double classes, which have some basic utilities for working with numbers.

You can convert a string into an integer or double with the ***parse()*** methods of int and double, respectively.

```dart
assert(int.parse('42') == 42);
assert(int.parse('0x42') == 66);
assert(double.parse('0.50') == 0.5);
```

Use the parse() method of num, which creates an integer if possible and otherwise a double.

```dart
assert(num.parse('42') is int);
assert(num.parse('0x42') is int);
assert(num.parse('0.50') is double);
```

To specify the base of an integer, add a radix parameter.

```dart
assert(int.parse('42', radix: 16) == 66);
```

Use the ***toString(), toStringAsFixed(), toStringAsPrecision()*** methods to convert an int or double to a string.

```dart
assert(42.toString() == '42');
assert(123.456.toString() == '123.456');

// specify the number of digits to the right of the decimal
assert(123.456.toStringAsFixed(2) == '123.46');

// specify the number of significant figures
assert(123.456.toStringAsPrecision(2) == '1.2e+2');
assert(double.parse('1.2e+2') == 120.0);
```

#### Strings and regular expressions

A string in Dart is an immutable sequences of UTF-16 code units.  You can use regular expression(RegExp objects) to search within strings and to replace parts of strings.

**Searching inside a string**

```dart
// Check whether a string contains another string.
assert('Never odd or even'.contains('odd'));

// Does a string start with another string?
assert('Never odd or even'.startsWith('Never'));

// Does a string end with another string?
assert('Never odd or even'.endsWith('even'));

// Find the location of a string inside a string.
assert('Never odd or even'.indexOf('odd') == 6);
```

**Extracting data from a string**

* extract individual characters from a string as a substring or ints, respectively
* split a string into a list of substrings

```dart
// Grab a substring.
assert('Never odd or even'.substring(6, 9) == 'odd');

// Split a string using a string pattern.
var parts = 'structured web apps'.split(' ');
assert(parts.length == 3);
assert(parts[0] == 'structured');

// Get a UTF-16 code unit (as a string) by index.
assert('Never odd or even'[0] == 'N');

// Use split() with an empty string parameter to get
// a list of all characters (as Strings); good for
// iterating.
for (var char in 'hello'.split('')) {
  print(char);
}

// Get all the UTF-16 code units in the string.
var codeUnitList = 'Never odd or even'.codeUnits.toList();
assert(codeUnitList[0] == 78);
```

**Converting to uppercase or lowercase**

```dart
// Convert to uppercase.
assert('structured web apps'.toUpperCase() ==
    'STRUCTURED WEB APPS');

// Convert to lowercase.
assert('STRUCTURED WEB APPS'.toLowerCase() ==
    'structured web apps');
```

**Trimming and empty strings**

Remove all leading and trailing white space with ***trim()***. To check whether a string is empty(length is zero), use ***isEmpty()***.

```dart
// Trim a string.
assert('  hello  '.trim() == 'hello');

// Check whether a string is empty.
assert(''.isEmpty);

// Strings with only white space are not empty.
assert('  '.isNotEmpty);
```

**Replacing part of a string**

Strings are immutable objects, which means you can create them but you can't change them. For example, the method ***replaceAll()*** returns a new String without changing the original String.

```dart
var greetingTemplate = 'Hello, NAME!';
var greeting =
    greetingTemplate.replaceAll(RegExp('NAME'), 'Bob');

// greetingTemplate didn't change.
assert(greeting != greetingTemplate);
```



**Building a string**

A StringBuffer doesn't generate a new String object until ***toString()*** is called.

```dart
var sb = StringBuffer();
sb
  ..write('Use a StringBuffer for ')
  ..writeAll(['efficient', 'string', 'creation'], ' ')
  ..write('.');

var fullString = sb.toString();

assert(fullString ==
    'Use a StringBuffer for efficient string creation.');
```

**Regular expressions**

Use regular expressions for efficient searching and pattern matching of strings.

```dart
// Here's a regular expression for one or more digits.
var numbers = RegExp(r'\d+');

var allCharacters = 'llamas live fifteen to twenty years';
var someDigits = 'llamas live 15 to 20 years';

// contains() can use a regular expression.
assert(!allCharacters.contains(numbers));
assert(someDigits.contains(numbers));

// Replace every match with another string.
var exedOut = someDigits.replaceAll(numbers, 'XX');
assert(exedOut == 'llamas live XX to XX years');
```

You can work directly with the RegExp class, too. The Match class provides access to a regular expression match.

```dart
var numbers = RegExp(r'\d+');
var someDigits = 'llamas live 15 to 20 years';

// Check whether the reg exp has a match in a string.
assert(numbers.hasMatch(someDigits));

// Loop through all matches.
for (var match in numbers.allMatches(someDigits)) {
  print(match.group(0)); // 15, then 20
}
```

#### Collections

Dart ships with a core collections API, which includes classes for lists, sets, and maps.

**Lists**

You can use ***literals*** to create and initialize lists. Alternatively, use one of the List ***constructors***. The ***List*** class defines several methods for adding items to and removing items from lists. 

```dart
// Use a List constructor.
var vegetables = List();

// Or simply use a list literal.
var fruits = ['apples', 'oranges'];

// Add to a list.
fruits.add('kiwis');

// Add multiple items to a list.
fruits.addAll(['grapes', 'bananas']);

// Get the list length.
assert(fruits.length == 5);

// Remove a single item.
var appleIndex = fruits.indexOf('apples');
fruits.removeAt(appleIndex);
assert(fruits.length == 4);

// Remove all elements from a list.
fruits.clear();
assert(fruits.isEmpty);
```

Find the index of an object in a list.

```dart
var fruits = ['apples', 'oranges'];

// Access a list item by index.
assert(fruits[0] == 'apples');

// Find an item in a list.
assert(fruits.indexOf('apples') == 0);
```

Sort a list. You can provide a sorting function that compares two objects. This sorting function must return < 0 for smaller, 0 for the same, and > 0 for bigger.

```dart
var fruits = ['bananas', 'apples', 'oranges'];

// Sort a list.
// compareTo() is defined by Comparable and implemented by String
fruits.sort((a, b) => a.compareTo(b));
assert(fruits[0] == 'apples');
```

Lists are ***parameterized*** types, so you can specify the type that a list should contain.

```dart
// This list should contain only strings.
var fruits = List<String>();

fruits.add('apples');
var fruit = fruits[0];
assert(fruit is String);

// fruits.add(5); // Error: 'int' can't be assigned to 'String'
```

**Sets**

A set in Dart is an unordered collection of unique items. You can't get or set items by index(position).

```dart
var ingredients = Set();
ingredients.addAll(['gold', 'titanium', 'xenon']);
assert(ingredients.length == 3);

// Adding a duplicate item has no effect.
ingredients.add('gold');
assert(ingredients.length == 3);

// Remove an item from a set.
ingredients.remove('gold');
assert(ingredients.length == 2);
```

Check whether one or more objects are in a set.

```dart
var ingredients = Set();
ingredients.addAll(['gold', 'titanium', 'xenon']);

// Check whether an item is in the set.
assert(ingredients.contains('titanium'));

// Check whether all the items are in the set.
assert(ingredients.containsAll(['titanium', 'xenon']));
```

An intersection is a set whose items are in two other sets.

```dart
var ingredients = Set();
ingredients.addAll(['gold', 'titanium', 'xenon']);

// Create the intersection of two sets.
var nobleGases = Set.from(['xenon', 'argon']);
var intersection = ingredients.intersection(nobleGases);
assert(intersection.length == 1);
assert(intersection.contains('xenon'));
```

**Maps**

A map, commonly known as a ***dictionary*** or ***hash***, is an unordered collection of key-value pairs. Maps associate a key to some value for easy retrieval.

You can declare a map using a terse literal syntax, or you can use a traditional constructor.

```dart
// Maps often use strings as keys.
var hawaiianBeaches = {
  'Oahu': ['Waikiki', 'Kailua', 'Waimanalo'],
  'Big Island': ['Wailea Bay', 'Pololu Beach'],
  'Kauai': ['Hanalei', 'Poipu']
};

// Maps can be built from a constructor.
var searchTerms = Map();

// Maps are parameterized types; you can specify what
// types the key and value should be.
var nobleGases = Map<int, String>();
```

You can add, get and set map items using the bracket syntax. you can remove a key and its value from a map.

```dart
var nobleGases = {54: 'xenon'};

// Retrieve a value with a key.
assert(nobleGases[54] == 'xenon');

// Check whether a map contains a key.
assert(nobleGases.containsKey(54));

// Remove a key and its value.
nobleGases.remove(54);
assert(!nobleGases.containsKey(54));
```

You can retrieve all the values or all the keys from a map.

```dart
var hawaiianBeaches = {
  'Oahu': ['Waikiki', 'Kailua', 'Waimanalo'],
  'Big Island': ['Wailea Bay', 'Pololu Beach'],
  'Kauai': ['Hanalei', 'Poipu']
};

// Get all the keys as an unordered collection
// (an Iterable).
var keys = hawaiianBeaches.keys;

assert(keys.length == 3);
assert(Set.from(keys).contains('Oahu'));

// Get all the values as an unordered collection
// (an Iterable of Lists).
var values = hawaiianBeaches.values;
assert(values.length == 3);
assert(values.any((v) => v.contains('Waikiki')));
```

You can check whether a map contains a key. Because map values can be null, you cannot rely on simply getting the value for the key and checking for null to determine the existence of a key.

```dart
var hawaiianBeaches = {
  'Oahu': ['Waikiki', 'Kailua', 'Waimanalo'],
  'Big Island': ['Wailea Bay', 'Pololu Beach'],
  'Kauai': ['Hanalei', 'Poipu']
};

assert(hawaiianBeaches.containsKey('Oahu'));
assert(!hawaiianBeaches.containsKey('Florida'));
```

You can assign a value to a key if and only if the key does not already exist in a map. You must provide a function that returns the value.

```dart
Map<String, int> scores = {'Bob': 36};
for (var key in ['Bob', 'Rohan', 'Sophena']) {
  scores.putIfAbsent(key, () => key.length);
}
scores['Bob'];      // 36
scores['Rohan'];    //  5
scores['Sophena'];  //  7
```

**Common collection methods**

List, Set and Map share common functionality found in many collections. Some of this common functionality is defined by the ***Iterable*** class, which List and Set implement.

Although Map doesn't implement Iterable, you can get Iterables from it using Map keys and values properties.

Check whether a list, set, or map has items.

```dart
var coffees = [];
var teas = ['green', 'black', 'chamomile', 'earl grey'];
assert(coffees.isEmpty);
assert(teas.isNotEmpty);
```

Apply a function to each item in a list, set, or map

```dart
var teas = ['green', 'black', 'chamomile', 'earl grey'];

teas.forEach((tea) => print('I drink $tea'));

// Your function must take two arguments on a map
hawaiianBeaches.forEach((k, v) {
  print('I want to visit $k and swim at $v');
  // I want to visit Oahu and swim at
  // [Waikiki, Kailua, Waimanalo], etc.
});
```

Map an iterable to another lazily to get all the results in a single object.

```dart
var teas = ['green', 'black', 'chamomile', 'earl grey'];

// the object returned by map() is an Iterable that's lazily evaluated.
// your function isn't called until you ask for an item from the return
// object.
var loudTeas = teas.map((tea) => tea.toUpperCase());
loudTeas.forEach(print);
```

Force your function to be called immediately on each item.

```dart
var loudTeas =
    teas.map((tea) => tea.toUpperCase()).toList();
```

Get all the items that match a condition and check whether some or all items match a condition.

```dart
var teas = ['green', 'black', 'chamomile', 'earl grey'];

// Chamomile is not caffeinated.
bool isDecaffeinated(String teaName) =>
    teaName == 'chamomile';

// Use where() to find only the items that return true
// from the provided function.
var decaffeinatedTeas =
    teas.where((tea) => isDecaffeinated(tea));
// or teas.where(isDecaffeinated)

// Use any() to check whether at least one item in the
// collection satisfies a condition.
assert(teas.any(isDecaffeinated));

// Use every() to check whether all the items in a
// collection satisfy a condition.
assert(!teas.every(isDecaffeinated));
```

#### URIs

The ***Uri*** class provides functions to encode and decode strings for use in ***URI***s. These functions handle characters that are special for URIs, such as ***&*** and ***=***. The Uri class also parses and exposes the components of a URI: host, port, scheme, and so on.

**Encoding and decoding fully qualified URIs**

special meaning characters in a URI: **/, :, &, #**

```dart
var uri = 'https://example.org/api?foo=some message';

var encoded = Uri.encodeFull(uri);
assert(encoded ==
    'https://example.org/api?foo=some%20message');

var decoded = Uri.decodeFull(encoded);
assert(uri == decoded);
```

**Encoding and decoding URI components**

```dart
var uri = 'https://example.org/api?foo=some message';

var encoded = Uri.encodeComponent(uri);
assert(encoded ==
    'https%3A%2F%2Fexample.org%2Fapi%3Ffoo%3Dsome%20message');

var decoded = Uri.decodeComponent(encoded);
assert(uri == decoded);
```

**Parsing URIs**

```dart
var uri =
    Uri.parse('https://example.org:8080/foo/bar#frag');

assert(uri.scheme == 'https');
assert(uri.host == 'example.org');
assert(uri.path == '/foo/bar');
assert(uri.fragment == 'frag');
assert(uri.origin == 'https://example.org:8080');
```

**Building URIs**

```dart
var uri = Uri(
    scheme: 'https',
    host: 'example.org',
    path: '/foo/bar',
    fragment: 'frag');
assert(uri.toString() == 'https://example.org/foo/bar#frag');
```

#### Dates and times

A ***DateTime*** object is a point in time. The time zone ise either UTC or the local time zone.

```dart
// Get the current date and time.
var now = DateTime.now();

// Create a new DateTime with the local time zone.
var y2k = DateTime(2000); // January 1, 2000

// Specify the month and day.
y2k = DateTime(2000, 1, 2); // January 2, 2000

// Specify the date as a UTC time.
y2k = DateTime.utc(2000); // 1/1/2000, UTC

// Specify a date and time in ms since the Unix epoch.
y2k = DateTime.fromMillisecondsSinceEpoch(946684800000,
    isUtc: true);

// Parse an ISO 8601 date.
y2k = DateTime.parse('2000-01-01T00:00:00Z');

// 1/1/2000, UTC
var y2k = DateTime.utc(2000);
assert(y2k.millisecondsSinceEpoch == 946684800000);

// 1/1/1970, UTC
var unixEpoch = DateTime.utc(1970);
assert(unixEpoch.millisecondsSinceEpoch == 0);
```

Use the ***Duration*** class to calculate the difference between two dates and to shift a date forward or backward.

```dart
var y2k = DateTime.utc(2000);

// Add one year.
var y2001 = y2k.add(Duration(days: 366));
assert(y2001.year == 2001);

// Subtract 30 days.
var december2000 = y2001.subtract(Duration(days: 30));
assert(december2000.year == 2000);
assert(december2000.month == 12);

// Calculate the difference between two dates.
// Returns a Duration object.
var duration = y2001.difference(y2k);
assert(duration.inDays == 366); // y2k was a leap year.
```

> Using a Duration to shift a DateTime by days can be problematic, due to clock shifts (to daylight saving time, for example). Use UTC dates if you must shift days.

#### Utility classes

The core library contains various utility classes, useful for sorting, mapping values, and iterating.

**Comparing objects**

Implement the ***Comparable*** interface to indicate that an object can be compared to another object, usually for sorting.

```dart
class Line implements Comparable<Line> {
  final int length;
  const Line(this.length);

  @override
  int compareTo(Line other) => length - other.length;
}

void main() {
  var short = const Line(1);
  var long = const Line(100);
  assert(short.compareTo(long) < 0);
}
```

**Implementing map keys**

Each object automatically provides an integer hash code, and thus can be used as a key in a map. However, you can override the ***hashCode*** getter to generate a custom hash code.

If you do, you might also want to override the ***==*** operator. Objects that are equal(via ***==***) must have identical hash codes. A hash code doesn't have to be unique, but it should be well distributed.

```dart
class Person {
  final String firstName, lastName;

  Person(this.firstName, this.lastName);

  // Override hashCode using strategy from Effective Java,
  // Chapter 11.
  @override
  int get hashCode {
    int result = 17;
    result = 37 * result + firstName.hashCode;
    result = 37 * result + lastName.hashCode;
    return result;
  }

  // You should generally implement operator == if you
  // override hashCode.
  @override
  bool operator ==(dynamic other) {
    if (other is! Person) return false;
    Person person = other;
    return (person.firstName == firstName &&
        person.lastName == lastName);
  }
}

void main() {
  var p1 = Person('Bob', 'Smith');
  var p2 = Person('Bob', 'Smith');
  var p3 = 'not a person';
  assert(p1.hashCode == p2.hashCode);
  assert(p1 == p2);
  assert(p1 != p3);
}
```

**Iteration**

The ***Iterable*** and ***Iterator*** classes support for-in loops. Extend(if possible) or implement Iterable whenever you create a class that can provide Iterators for use in for-in loops. Implement Iterator to define the actual iteration ability.

```dart
class Process {
  // Represents a process...
}

class ProcessIterator implements Iterator<Process> {
  @override
  Process get current => ...
  @override
  bool moveNext() => ...
}

// A mythical class that lets you iterate through all
// processes. Extends a subclass of [Iterable].
class Processes extends IterableBase<Process> {
  @override
  final Iterator<Process> iterator = ProcessIterator();
}

void main() {
  // Iterable objects can be used with for-in.
  for (var process in Processes()) {
    // Do something with the process.
  }
}
```

#### Exceptions

The Dart core library defines many common exceptions and errors. Exceptions are considered conditions that you can plan ahead for and catch. Errors are conditions that you don't expect or plan for.

A couple of the most common errors are:

* NoSuchMethodError

  Thrown when a receiving object does not implement a method

* ArgumentError

  Can be thrown by a method that encounters an unexpected argument.

Throwing an application-specific exception is a common way to indicate that an error has occurred. You can define a custom exception by implementing the ***Exception*** interface.

```dart
class FooException implements Exception {
  final String msg;

  const FooException([this.msg]);

  @override
  String toString() => msg ?? 'FooException';
}
```



### dart:async

Asynchronous programming often uses callback function, but Dart provides alternatives: ***Future*** and ***Stream*** objects.

A Future is like a promise for a result to be provided sometime in the future. A Stream is a way to get a sequence of values, such as events.

You don't always need to use the Future or Stream APIs directly. The Dart language supports asynchronous coding using keywords such as ***async*** and ***await***.

To use it, import dart:async.

```dart
import 'dart:async';
```

> As of Dart 2.1, you don't need to import dart:async to use the Future and Stream APIs, because dart:core exports those classes.

#### Future

Future objects appear throughout the Dart libraries, often as the object returned by an asynchronous method. When a future completes, its value is ready to use.

**Using await**

Before you directly use the Future API, consider using ***await*** instead. Code that uses await expressions can be easier to understand than code that uses the Future API.

```dart
runUsingFuture() {
  // ...
  findEntryPoint().then((entryPoint) {
    return runExecutable(entryPoint, args);
  }).then(flushThenExit);
}

// The equivalent code with await expressions looks more like synchronous code
runUsingAsyncAwait() async {
  // ...
  var entryPoint = await findEntryPoint();
  var exitCode = await runExecutable(entryPoint, args);
  await flushThenExit(exitCode);
}
```

> Async functions always return Futures. 

An ***async*** function can catch exceptions from Futures.

```dart
var entryPoint = await findEntryPoint();
try {
  var exitCode = await runExecutable(entryPoint, args);
  await flushThenExit(exitCode);
} catch (e) {
  // Handle the error...
}
```

**Basic usage**

Schedule code that runs when the future completes.

```dart
HttpRequest.getString(url).then((String result) {
  print(result);
});
```

Handle any errors or exceptions that a Future object might throw.

```dart
HttpRequest.getString(url).then((String result) {
  print(result);
}).catchError((e) {
  // Handle or ignore the error.
});
```

> The then().catchError() pattern is the asynchronous version of try-catch.
>
> Be sure to invoke catchError() on the result of then() -- not on the result of the original Future. Otherwise, the catchError() can handle errors only from the original Future's computation, but not from the handler registered by then().

**Chaining multiple asynchronous methods**

The then() method returns a Future, providing a useful way to run multiple asynchronous functions in a certain order. According to the return from the callback registered with then(), then() returns:

* a Future: an equivalent Future
* a value of any other type: a new Future that completes with the value

```dart
Future result = costlyQuery(url);
result
    .then((value) => expensiveWork(value))
    .then((_) => lengthyComputation())
    .then((_) => print('Done!'))
    .catchError((exception) {
  /* Handle exception... */
});
```

**Waiting for multiple futures**

Sometimes your algorithm needs to invoke many asynchronous functions and wait for them all to complete before continuing.

```dart
Future deleteLotsOfFiles() async =>  ...
Future copyLotsOfFiles() async =>  ...
Future checksumLotsOfOtherFiles() async =>  ...

await Future.wait([
  deleteLotsOfFiles(),
  copyLotsOfFiles(),
  checksumLotsOfOtherFiles(),
]);
print('Done with all the long steps!');
```

#### Stream

Stream objects appear throughout Dart APIs, representing sequences of data. For example, HTML events such as button clicks are delivered using streams. You can also read a file as a stream.

**Listening for stream data**

To get each value as it arrives, subscribe to the stream using the listen() method.

```dart
// Find a button by ID and add an event handler.
querySelector('#submitInfo').onClick.listen((e) {
  // When the button is clicked, it runs this code.
  submitData();
});
```

If you care about only one event, you can get it using a property such as: first, last, or single. To test the event before handling it, use a method such as: firstWhere(), lastWhere(), or singleWhere().

If you care about a subset of events, you can use methods such as : skip(), skipWhile(), take(), takeWhile(), and where().

**Using an asynchronous for loop**

Use listen() method to subscribe to a list of files.

```dart
void main(List<String> arguments) {
  // ...
  FileSystemEntity.isDirectory(searchPath).then((isDir) {
    if (isDir) {
      final startingDir = Directory(searchPath);
      startingDir
          .list(
              recursive: argResults[recursive],
              followLinks: argResults[followLinks])
          .listen((entity) {
        if (entity is File) {
          searchFile(entity, searchTerms);
        }
      });
    } else {
      searchFile(File(searchPath), searchTerms);
    }
  });
}
```

The equivalent code with an asynchronous for loop(await for), looks more like synchronous code.

```dart
Future main(List<String> arguments) async {
  // ...
  if (await FileSystemEntity.isDirectory(searchPath)) {
    final startingDir = Directory(searchPath);
    await for (var entity in startingDir.list(
        recursive: argResults[recursive],
        followLinks: argResults[followLinks])) {
      if (entity is File) {
        searchFile(entity, searchTerms);
      }
    }
  } else {
    searchFile(File(searchPath), searchTerms);
  }
}
```

> Before using `await for`, make sure that it makes the code clearer and that you really do want to wait for all of the stream’s results. For example, you usually should **not** use `await for` for DOM event listeners, because the DOM sends endless streams of events. If you use `await for` to register two DOM event listeners in a row, then the second kind of event is never handled.

**Transforming stream data**

Often, you need to change the format of a stream's data before you can use it.

```dart
var lines = inputStream
    .transform(utf8.decoder)
    .transform(LineSplitter());
```

* utf8.decoder: transform the stream of integers into a stream of strings
* LineSplitter: transform the stream of strings into a stream of separate lines

**Handling errors and completion**

How you specify error and completion handling code depends on whether you use an asynchronous for loop(await for) or the Stream API.

* use try-catch to handle errors

```dart
Future readFileAwaitFor() async {
  var config = File('config.txt');
  Stream<List<int>> inputStream = config.openRead();

  var lines = inputStream
      .transform(utf8.decoder)
      .transform(LineSplitter());
  try {
    await for (var line in lines) {
      print('Got ${line.length} characters from stream');
    }
    print('file is now closed');
  } catch (e) {
    print(e);
  }
}
```

* register onError hander  and onDone handler on listener

```dart
var config = File('config.txt');
Stream<List<int>> inputStream = config.openRead();

inputStream
    .transform(utf8.decoder)
    .transform(LineSplitter())
    .listen((String line) {
  print('Got ${line.length} characters from stream');
}, onDone: () {
  print('file is now closed');
}, onError: (e) {
  print(e);
});
```



### dart:math

provides common functionality such as sine and cosine, maximum and minimum, and constants such as ***pi*** and ***e***. Most of the functionality in the Math library is implemented as top-level functions.

```dart
import 'dart:math';
```

#### Trigonometry

These functions use radians, not degrees.

```dart
// Cosine
assert(cos(pi) == -1.0);

// Sine
var degrees = 30;
var radians = degrees * (pi / 180);
// radians is now 0.52359.
var sinOf30degrees = sin(radians);
// sin 30° = 0.5
assert((sinOf30degrees - 0.5).abs() < 0.01);
```

#### Maximum and minimum

```dart
assert(max(1, 1000) == 1000);
assert(min(1, -1000) == -1000);
```

#### Math constants

```dart
// See the Math library for additional constants.
print(e); // 2.718281828459045
print(pi); // 3.141592653589793
print(sqrt2); // 1.4142135623730951
```

#### Random numbers

You can optionally provide a seed to the Random constructor.

```dart
var random = Random();
random.nextDouble(); // Between 0.0 and 1.0: [0, 1)
random.nextInt(10); // Between 0 and 9.

// even generate random booleans
var random = Random();
random.nextBool(); // true or false
```

### dart:convert

The library has converters for JSON and UTF-8, as well as support for creating additional converters.

* ***JSON***: a simple text format for representing structured objects and collections
* ***UTF-8***: a common variable-width encoding that can represent every character in the Unicode character set

```dart
import 'dart:convert';
```

#### Decoding and encoding JSON

**Decode**: JSON-encoded string -> Dart object

```dart
// NOTE: Be sure to use double quotes ("),
// not single quotes ('), inside the JSON string.
// This string is JSON, not Dart.
var jsonString = '''
  [
    {"score": 40},
    {"score": 80}
  ]
''';

var scores = jsonDecode(jsonString);
assert(scores is List);

var firstScore = scores[0];
assert(firstScore is Map);
assert(firstScore['score'] == 40);
```

**Encode**: supported Dart object -> JSON-formatted string

```dart
var scores = [
  {'score': 40},
  {'score': 80},
  {'score': 100, 'overtime': true, 'special_guest': null}
];

var jsonText = jsonEncode(scores);
assert(jsonText ==
    '[{"score":40},{"score":80},'
        '{"score":100,"overtime":true,'
        '"special_guest":null}]');
```

Only objects of type int, double, String, bool, null, List, or Map(with string keys) are directly encodable into JSON. List and Map objects are encoded recursively.

You have two options for encoding objects that aren't directly encodable.

#### Decoding and encoding UTF-8 characters

**Decode**: UTF-8-encoded bytes -> Dart string

```dart
List<int> utf8Bytes = [
  0xc3, 0x8e, 0xc3, 0xb1, 0xc5, 0xa3, 0xc3, 0xa9,
  0x72, 0xc3, 0xb1, 0xc3, 0xa5, 0xc5, 0xa3, 0xc3,
  0xae, 0xc3, 0xb6, 0xc3, 0xb1, 0xc3, 0xa5, 0xc4,
  0xbc, 0xc3, 0xae, 0xc5, 0xbe, 0xc3, 0xa5, 0xc5,
  0xa3, 0xc3, 0xae, 0xe1, 0xbb, 0x9d, 0xc3, 0xb1
];

var funnyWord = utf8.decode(utf8Bytes);

assert(funnyWord == 'Îñţérñåţîöñåļîžåţîờñ');
```

**Convert**: UTF-8 character stream -> Dart string

```dart
var lines =
    utf8.decoder.bind(inputStream).transform(LineSplitter());
try {
  await for (var line in lines) {
    print('Got ${line.length} characters from stream');
  }
  print('file is now closed');
} catch (e) {
  print(e);
}
```

**Encode**: Dart string -> a list of UTF8-encoded bytes

```dart
List<int> encoded = utf8.encode('Îñţérñåţîöñåļîžåţîờñ');

assert(encoded.length == utf8Bytes.length);
for (int i = 0; i < encoded.length; i++) {
  assert(encoded[i] == utf8Bytes[i]);
}
```



### dart:io

The dart:io library provides APIs to deal with files, directories, processes, sockets, WebSockets, and HTTP clients and servers.

In general, the dart:io library implements and promotes an asynchronous API. Synchronous methods can easily block an application, making it difficult to scale. Therefore, most operations return results via Future or Stream objects, a pattern common with modern server platform such as Node.js.

The few synchronous methods in the dart:io library are clearly marked with a Sync suffix on the method name. Synchronous methods aren't covered here.

```dart
import 'dart:io';
```

#### Files and directories

The library enables command-line apps to read and write files and browse directories. You have two choices for reading the contents of a file.

* all at once: requires enough memory to store all the contents of the file
* streaming: processes it while reading it

**Reading a file as text**

Read a text file encoded using UTF-8

```dart
Future main() async {
  var config = File('config.txt');
  var contents;

  // Put the whole file in a single string.
  contents = await config.readAsString();
  print('The file is ${contents.length} characters long.');

  // Put each line of the file into its own string.
  contents = await config.readAsLines();
  print('The file is ${contents.length} lines long.');
}
```

**Reading a file as binary**

Read an entire file as bytes into a list of ints.

```dart
Future main() async {
  var config = File('config.txt');

  var contents = await config.readAsBytes();
  print('The file is ${contents.length} bytes long.');
}
```

**Handling errors**

```dart
Future main() async {
  var config = File('config.txt');
  try {
    var contents = await config.readAsString();
    print(contents);
  } catch (e) {
    print(e);
  }
}
```

**Streaming file contents**

Use a Stream to read a file, a little at a time.

```dart
import 'dart:io';
import 'dart:convert';

Future main() async {
  var config = File('config.txt');
  Stream<List<int>> inputStream = config.openRead();

  var lines =
      utf8.decoder.bind(inputStream).transform(LineSplitter());
  try {
    await for (var line in lines) {
      print('Got ${line.length} characters from stream');
    }
    print('file is now closed');
  } catch (e) {
    print(e);
  }
}
```

**Writing file contents**

You can use an ***IOSink*** to write data to a file. The default mode, ***FileMode.write***, completely overwrites existing data in the file

```dart
var logFile = File('log.txt');
var sink = logFile.openWrite(); // returns IOSink
sink.write('FILE ACCESSED ${DateTime.now()}\n');
await sink.flush();
await sink.close();
```

To add to the end of the file, use the optional ***mode*** parameter to specify ***FileMode.append***.

```dart
var sink = logFile.openWrite(mode: FileMode.append);
```

To write binary data, use ***add(List<int> data)***.

**Listing files in a directory**

Finding all files and subdirectories for a directory is an asynchronous operation. The ***list()*** method returns a Stream that emits an object when a file or directory is encountered.

```dart
Future main() async {
  var dir = Directory('tmp');

  try {
    var dirList = dir.list();
    await for (FileSystemEntity f in dirList) {
      if (f is File) {
        print('Found file ${f.path}');
      } else if (f is Directory) {
        print('Found dir ${f.path}');
      }
    }
  } catch (e) {
    print(e.toString());
  }
}
```

#### HTTP clients and servers

The library provides classes that command-line apps can use for accessing HTTP resources, as well as running HTTP servers.

**HTTP server**

The ***HTTPServer*** class provides the low-level functionality for building web servers. You can match request handlers, set headers, stream data, and more.

```dart
Future main() async {
  final requests = await HttpServer.bind('localhost', 8888);
  await for (var request in requests) {
    processRequest(request);
  }
}

void processRequest(HttpRequest request) {
  print('Got request for ${request.uri.path}');
  final response = request.response;
  if (request.uri.path == '/dart') {
    response
      ..headers.contentType = ContentType(
        'text',
        'plain',
      )
      ..write('Hello from the server');
  } else {
    response.statusCode = HttpStatus.notFound;
  }
  response.close();
}
```

**HTTP client**

The ***HttpClient*** class helps you connect to HTTP resources from you Dart command-line or server-side application. You can set headers, use HTTP methods, and read and write data.

```dart
Future main() async {
  var url = Uri.parse('http://localhost:8888/dart');
  var httpClient = HttpClient();
  var request = await httpClient.getUrl(url);
  var response = await request.close();
  var data = await utf8.decoder.bind(response).toList();
  print('Response ${response.statusCode}: $data');
  httpClient.close();
}
```







## **Language cheatsheet**

The Dart language is designed to be easy to learn for coders coming from other languages, but it has a few unique features. This cheatsheet written by an for Google engineers walks you through the most important of these language features.

### String interpolation

Embed the value of an expression into a string.

- use ***${expression}***
- omit the {} if the expression is an identifier

```dart
'${3+2}'                    // '5'
'${"word".toUpperCase()}'   // 'WORD'
'$myObject'                 // the value of myObject.toString()
```

### Null-aware operator

Dart offers some handy operators for dealing with values that might be null.

- ***??=***: assign a value to a variable only if the variable is currently null

- ***??***: return the expression on its left unless that expression's value is null, in that case it evaluates and returns the expression on its right

```dart
int a;    // a is null

a ??= 3;  // a is 3
a ??= 5;  // a is still 3

print(1 ?? 3)       // 1
print(null ?? 12);  // 12
```

### Conditional property access

Guard access to a property or method of an object that might be null.

* ***?***: put a question mark before the dot

```dart
myObject?.someProperty               
(myObject != null) ? myObject.someProperty : null // equivalence
myObject?.someProperty?.someMethod() // a chain of calls
```

### Collection literal

Dart has built-in support for lists, maps and sets.

```dart
final aListOfStrings = ['one', 'two', 'three']; // List<String>
final aSetOfStrings = {'one', 'two', 'three'};  // Set<String>
final aMapOfStringsToInts = {                   // Map<String, int>
  'one': 1,
  'two': 2,
  'three': 3,
};
```

Dart's type inference can assign types to these variables for you, or you can specify the type yourself.

```dart
final aListOfInts = <int>[];
final aSetOfInts = <int>{};
final aMapOfIntToDouble = <int, double>{};
```

### Arrow syntax

Define a function that executes an expression and return its value.

* ***=>***: the fat arrow

```dart
// pass a function to the any() method of List
bool hasEmpty = aListOfStrings.any((s) {
  return s.isEmpty;
});

// simpler way to write that code
bool hasEmpty = aListOfStrings.any((s) => s.isEmpty);
```

### Cascade call

Perform a sequence of operations on the same object.

* ***..***: call-chain the operations on an object

```dart
querySelector('#confirm')
  ..text = 'Confirm'
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
```

Why that works?

```dart
myObject.someMethod()  // return value of someMethod()
myObject..someMethod() // return myObject
```

### Getter and setter

More control over a property than a simple field allows

* getter
* setter

```dart
class MyClass {
  int _aProperty = 0;
    
  int get aProperty => _aProperty;
    
  set aProperty(int value) {
    if (value >= 0) {
      _aProperty = value;
    }
  }
}
```

Define a computed property

```dart
class MyClass {
  List<int> _values = [];
    
  void addValue(int value) {
    _value.add(value);
  }
    
  // a computed property
  int get count {
    return _values.length;
  }
}
```

Imagine you have a shopping cart class that keeps a private List<double> of prices.

```dart
class InvalidPriceException {}

class ShoppingCart {
  List<double> _prices = [];
    
  double get total => _prices.fold(0, (e, t) => e + t);
    
  set prices(List<double> value) {
    if (value.any((p) => p < 0)) {
      throw InvalidPriceException();
    }
        
    _prices = value;
  }
}
```

### Optional positional parameter

Dart has two kinds of function parameters: positional and named.

**positional parameters**

```dart
int sumUp(int a, int b, int c) {
  return a + b + c;
}

int total = sumUp(1, 2, 3);
```

**optional positional parameters**

You can make these positional parameters optional by wrapping them in ***brackets***.

```dart
int sumUpToFive(int a, [int b, int c, int d, int e]) {
  int sum = a;
  if (b != null) sum += b;
  if (c != null) sum += c;
  if (d != null) sum += d;
  if (e != null) sum += e;
  return sum;
}

int total = sumUpToFive(1, 2);
int total = sumUpToFive(1, 2, 3, 4, 5);
```

Optional positional parameters are always **last in** a function's parameter list. Their default value is null unless you provide another default value.

```dart
int sumUpToFive(int a, [int b = 2, int c = 3, int d = 4, int e =5]) {
  int sum = a;
  if (b != null) sum += b;
  if (c != null) sum += c;
  if (d != null) sum += d;
  if (e != null) sum += e;
   return sum;   
}

int total = sumUpToFive(1);
print(total); // 15
```

### Optional named parameter

Using a ***curly brace syntax***, you can define optional parameters that have names.

```dart
void printName(String firstName, String lastName, {String suffix}) {
    print('$firstName $lastName ${suffix ?? ''}');
}

printName('Avinash', 'Gupta');
printName('Poshmeister', 'Moneybuckets', suffix:'IV');
```

The value of these parameters is null by default, but you can provide default values.

```dart
void printName(String firstName, String lastName, {String suffix =''}) {
    print('$firstName $lastName $suffix');
}
```

### Exception

All of exceptions are **unchecked exceptions**. Methods don't declare which exceptions they might throw, and you aren't required to catch any exceptions.

Dart provides ***Exception*** and ***Error*** types, but you're allowed to throw any non-null object.

```dart
throw Exception('Something bad happened.');
throw 'Waaaaaaah!';
```

Use the **try**, **on** and **catch** keywords when handling exceptions.

* **try** works as it does in most other languages
* use **on** to filter for specific exceptions by type
* use **catch** to get a reference to the exception object

```dart
try {
  breedMoreLamas();
} on OutofLamasException {
  // A specific exception
  buyMoreLamas();
} on Exception catch(e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {
  // No specified type, handles all
  print('Something really unknown: $e');
}
```

If you can't completely handle the exception, use **rethrow** to propagate the exception.

```dart
try {
  breedMoreLamas();
} catch (e) {
  print('I was just trying to breed lamas!');
  rethrow;
}
```

To execute code whether or not an exception is thrown, use **finally**.

```dart
try {
  breedMoreLamas();
} catch (e) {
  print('I was just trying to breed lamas!');
  rethrow;
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLamsStalls();
}
```

### Using ***this*** in a constructor

Dart provides a handy shortcut for assigning values to properties in a constructor。

* ***this.propertyName***：when declaring the constructor.

```dart
class MyColor {
  int red;
  int green;
  int blue;
  MyColor(this.red, this.green, this.blue);
}

final color = MyColor(80, 80, 128);
```

This technique works for named parameters, too.

```dart
class MyColor {
  int red;
  int green;
  int blue;
  MyColor({this.red, this.green, this.blue});
}

final color = MyColor(red:80, green:80, blue:128);
```

For optional parameters, default values work as expected.

```dart
MyColor([this.red = 0, this.green = 0, this.blue = 0]);
// or
MyColor({this.red = 0, this.green = 0, this.blue = 0});
```

### Initializer list

Sometimes, you need to do some setup before the constructor body executes. For example, final fields must have values before the constructor body executes.

Initialize list goes between the constructor's signature and its body.

```dart
Point.fromJson(Map<String, num> json)
  : x = json['x'],
	y = json['y'] {
  print('In Point.fromJson(): ($x, $y)');          
}
```

The initializer list is also a handy place to put **asserts**, which run only during development.

```dart
NonNegativePoint(this.x, this.y)
  : assert(x >= 0),
	assert(y >= 0) {
  print('I just made a NonNegativePoint: ($x, $y)');
}
```

### Named constructor

To allow classes to have multiple constructors, Dart supports named constructors.

```dart
class Point {
  num x, y;
    
  Point(this.x, this.y);
    
  Point.origin() {
    x = 0;
    y = 0;
  }
}

// To use a named constructor, invoke it using its full name.
final myPoint = Point.origin();
```

### Factory constructor

Use ***factory*** to create a factory constructor, which can return subtypes or even null.

```dart
class Square extends Shape {}

class Circle extends Shape {}

class Shape {
  Shape();
    
  factory Shape.fromTypeName(String typeName) {
    if (typeName == 'square') return Square();
    if (typeName == 'circle') return Circle();
        
    print('I don\'t recognize $typeName');
    return null;
  }
}
```

### Redirecting constructor

Sometimes a constructor's only purpose is to redirect to another constructor in the same class.

* a constructor call in its initializer list
* no body 

```dart
class Automobile {
  String make;
  String model;
  int mpg;
    
  // The main constructor for this class
  Automobile(this.make, this.model, this.mpg);
    
  // Delegates to the main constructor
  Automobile.hybrid(String make, String model): this(make, model, 60);
    
  // Delegates to a named constructor
  Automobile.fancyHybrid(): this.hybrid('Futurecar', 'Mark 2');
}
```

### Const constructor

If your class produces objects that never change, you can make these objects compile-time constants.

* define a const constructor
* make sure all instance variables are final

```dart
class ImmutablePoint {
  final int x;
  final int y;
    
  const ImmutablePoint(this.x, this.y);
    
  static const ImmutablePoint origin = ImmutablePoint(0, 0);
}
```





## **Iterable collection**

* How to read elements of an Iterable
* How to check if the elements of an Iterable satisfy a condition
* How to filter the contents of an Iterable
* How to map the contents of an Iterable to a different value

### Why do you need collections?

* a collection is an object that represents a group of objects, which are called elements

* the most common collection types

  - List: used to read elements by their indexes
  - Set: used to contain elements that can occur only once
  - Map: used to read elements using a key

### What is an Iterable?
* a collection of elements that can be accessed sequentially
* an abstract class you cannot instantiate it directly
* create a new Iterable by creating a new ***List*** or ***Set***
* elements of a ***Map*** can be read as Iterable objects by using the map's ***entries*** or ***values*** property

The elements of the iterable are accessed by getting an ***Iterator*** using the ***iterator*** getter, and using it to step through the values.

* Iterator.moveNext: if the call returns true, the iterator has now moved to the next element
* Iterator.current: returns the current element, or null if Iterator.moveNext returns false

Each time ***iterator*** is read, it returns a new iterator, and different iterators can be stepped through independently, each giving access to all the elements of the iterable. The iterators of the same iterable should provide the same values in the same order.

Changing a collection while it is being iterated is generally not allowed. Doing so will break the iteration, which is typically signalled by throwing a ConcurrentModificationError the next time Iterator.moveNext is called. The current value of Iterator.current getter should not be affected by the change in the collection, the ***current*** value was set by the previous call to Iterator.moveNext.

Iterable doesn't have the ***[]*** operator

```dart
Iterable<int> iterable = [1, 2, 3];
int value = iterable[1];           // invalid
int value = iterable.elementAt(1); // ok
```

### Reading elements

#### using for-in loop

read the elements of an iterable sequentially, using a ***for-in*** loop

```dart
Map kidsBooks = {
    'Matilda': 'Roald Dahl',
    'Green Eggs and Ham': 'Dr Seuss',
    'Where the Wild Things Are': 'Maurice Sendak'
};

for (var book in kidsBooks.keys) {
    print('$book was written by ${kidsBooks[book]}');
}
```

#### using first and last

```dart
var iterable = ['Salad', 'Popcorn', 'Toast'];
print('The first element is ${iterable.first}');
print('The last element is ${iterable.last}');
```

#### using firstWhere()

* find the first element that satisfies certain conditions

* pass a predicate, which is a function that returns true if the input satisfies a certain condition

```dart
String element = iterable.firstWhere((e) => e.length > 5);
```

  ### Checking conditions

#### using any() and every()

* any(): return true if at least one element satisfies the condition
* every(): return true if all elements satisfy the condition

```dart
var items = ['Salad', 'Popcorn', 'Toast'];
  
if (items.any((element) => element.contains('a'))) {
    print('At least one element contains "a"');
}

if (items.every((element) => element.length >= 5)) {
    print('All elements have length >= 5');
}
```

### Filtering

#### using where()

* find all the elements that satisfy a certain condition
* the output is another Iterable

```dart
var evens = [1, -2, 3, 42].where((n) =>n.isEven);

for (var n in evens) {
    print('$n is even.');
}
```

#### using takeWhile()/skipWhile()

* takeWhile(): returns an Iterable that contains all the elements leading to the element that satisfies the predicate
* skipWhile(): returns an Iterable while skipping all the elements before the one that satisfies the predicate. Note that the element that satisfies the predicate is also included

```dart
var numbers = [1, 3, -2, 0, 4, 5];

var numbersUntilZero = numbers.takeWhile((n) => n != 0);
var numbersAfterZero = numbers.skipWhile((n) => n != 0);
```

### Mapping

apply a function over each of the elements, replacing each element with a new one.

map() returns a lazy Iterable, meaning that the supplied function is called only when the elements are iterated.

```dart
Iterable<int> output = numbers.map((n) => n * 10);
```

## **Asynchronous programming**

### Futures, async, await

* How and when to use the ***async*** and ***await*** keywords
* How using ***async*** and ***await*** affects execution order
* How to handle errors from an asynchronous call using ***try-catch*** expressions in ***async*** functions

#### Why asynchronous code matters

Asynchronous operations let your program complete work while waiting for another operation to finish. Here are some common asynchronous operations:

* Fetching data over a network
* Writing to a database
* Reading data from a file

To perform asynchronous operations in Dart, you can use the ***Future*** class and the ***async*** and ***await*** keywords.

#### Incorrectly using an asynchronous function

```dart
// This example shows how *not* to write asynchronous Dart code.

String createOrderMessage () {
  var order = fetchUserOrder();
  return 'Your order is: $order';
}

Future<String> fetchUserOrder() {
  // Imagine that this function is more complex and slow
  return Future.delayed(Duration(seconds: 4), () => 'Large Latte');
}

void main () {
  print(createOrderMessage());
}
```

**Key terms:**

* synchronous operation:  which blocks other operations from executing until it completes
* synchronous function: which only performs synchronous operations
* asynchronous operation: once initiated, it allows other operations to execute before it completes
* asynchronous function: which performs at least one asynchronous operation and can also perform synchronous operations

#### What is a future?

A future is an instance of the ***Future*** class. A future represents the result of an asynchronous operation, and can have two states: uncompleted or completed.

* Uncompleted

  when you call an asynchronous function, it returns an uncompleted future. That future is waiting for the function's asynchronous operation to finish or to throw an error. In Dart, Uncompleted is referring to the state of a future before it has produced a value.

* Completed

  If the asynchronous operation succeeds, the future completes with a value. Otherwise it completes with an error.

  * Completing with a value

    A future of type ***Future<T>*** completes with a value of type T. If a future doesn't produce a usable value, then the future's type is ***Future<void>***.

  * Completing with an error

    If the asynchronous operation performed by the function fails for any reason, the future completes with an error.

```dart
Future<void> fetchUserOrder() {
  // Imagine that this function is fetching user info but encounters a bug
  return Future.delayed(
    Duration(seconds: 3), 
    () => throw Exception('Logout failed: user ID is invalid'));
}

void main() {
  fetchUserOrder();
  print('Fetching user order...');
}  
```

  **Quick review:**

* A ***Future<T>*** instance produces a value of type T
* If a future doesn't produce a usable value, then the future's type is ***Future<void>***
* A future can be in one of two states: uncompleted or completed
* When you call a function that returns a future, the function queues up work to be done and returns an uncompleted future
* When a future's operation finishes, the future completes with a value or with an error

#### Working with futures: async and await

The ***async*** and ***await*** keywords provide a declarative way to define asynchronous functions and use their results. Remember these two basic guidelines when using ***async*** and ***await***.

* To define an ***async*** function, add ***async*** before the function body
* The ***await*** keyword works only in ***async*** functions

```dart
Future<String>  createOrderMessage() async {
  var order = await fetchUserOrder();
  return 'Your order is: $order';
}

Future<String>  fetchUserOrder() =>
    // Imagine that this function is
    // more complex and slow.
    Future.delayed(
      Duration(seconds: 2),
      () => 'Large Latte',
    );

Future<void>  main() async {
  print('Fetching user order...');
  print(await createOrderMessage());
}
```

If the function has a declared return type, then update the type to be ***Future<T>***, where ***T*** is the type of the value that the function returns. If the function doesn't explicitly return a value, then the return type is ***Function<void>***.

#### Execution flow async and await

An ***async*** function runs synchronously until the first ***await*** keyword. This means that within an ***async*** function body, all synchronous code before the first ***await*** keyword executes immediately.

> Before Dart 2.0, an ***async*** function returned immediately, without executing any code within the ***async*** function body.

```dart
void printOrderMessage () async {
  print('Awaiting user order...');
  var order = await fetchUserOrder();
  print('Your order is: $order');
}

Future<String> fetchUserOrder() {
  // Imagine that this function is more complex and slow.
  return Future.delayed(Duration(seconds: 4), () => 'Large Latte');
}

Future<void>main() async {
  countSeconds(5);
  await printOrderMessage();
}

// You can ignore this function - it's here to visualize delay time in this example.
void countSeconds(s) {
  for( var i = 1 ; i <= s; i++ ) {
      Future.delayed(Duration(seconds: i), () => print(i));
   }
}
```

#### Handling errors

Within an ***async*** function, you can write ***try-catch clauses*** the same way you would in synchronous code.

```dart
void printOrderMessage() async {
  try {
    var order = await fetchUserOrder();
    print('Awaiting user order...');
    print(order);
  } catch (err) {
    print('Caught error: $err');
  }
}

Future<String> fetchUserOrder() {
  // Imagine that this function is more complex.
  var str = Future.delayed(
      Duration(seconds: 4), 
      () => throw 'Cannot locate user order');
  return str;
}

Future<void> main() async {
  await printOrderMessage();
}
```

### Streams

What's the point?

> * Streams provide an asynchronous sequence of data
> * Data sequences include user-generated events and data read from files
> * You can process a stream using either ***await for*** or ***listen()*** from the Stream API
> * Streams provide a way to respond to errors
> * There are two kinds of streams: single subscription or broadcast

Asynchronous programming in Dart is characterized by the ***Future*** and ***Stream*** classes.

* Future

  represents a computation that doesn't complete immediately. Where a normal function returns the result, an asynchronous function returns a Future,  which will eventually contain the result. The future will tell you when the result is ready.

* Stream

  a sequence of asynchronous events. It is like an asynchronous Iterable, where, instead of getting the next event when you ask for it, the stream tells you that there is an event when it is ready.

#### Create a stream from scratch

One way to create a new stream is with an asynchronous generator(***async****) function. 

```dart
Stream<int> countStream(int to) async* {
    for (int i = 1; i <= to; i++) {
        yield i;
    }
}
```

The stream is created when the function is called, and the function's body starts running when the stream is listened to. When the function returns, the stream closes. Until the function returns, it can emit events on the stream by using ***yield*** or ***yield**** statements.

#### Receiving stream events

The asynchronous for loop(***await for***) iterates over the events of a stream like the ***for loop*** iterates over an ***Iterable***.

```dart
Future<int> sumStream(Stream<int> stream) async {
  var sum = 0;
  await for (var value in stream) {
    sum += value;
  }
  return sum;
}
```

When the loop body ends, the function is paused until the next event arrives or the stream is done.

```dart
// Copyright (c) 2015, the Dart project authors.
// Please see the AUTHORS file for details.
// All rights reserved. Use of this source code is governed
// by a BSD-style license that can be found in the LICENSE file.

import 'dart:async';

Future<int> sumStream(Stream<int> stream) async {
  var sum = 0;
  await for (var value in stream) {
    sum += value;
  }
  return sum;
}

Stream<int> countStream(int to) async* {
  for (int i = 1; i <= to; i++) {
    yield i;
  }
}

main() async {
  var stream = countStream(10);
  var sum = await sumStream(stream);
  print(sum); // 55
}
```

#### Error events

In some cases, an error happens before the stream is done. Streams can also deliver error events like it delivers data events. Most streams will stop after the first error, but it is possible to have streams that deliver more than one error, and streams that deliver more data after an error event.

When reading a stream using ***await for***, the error is thrown by the loop statement. This ends the loop, as well. 

```dart
// Copyright (c) 2015, the Dart project authors.
// Please see the AUTHORS file for details.
// All rights reserved. Use of this source code is governed
// by a BSD-style license that can be found in the LICENSE file.

import 'dart:async';

Future<int> sumStream(Stream<int> stream) async {
  var sum = 0;
  try {
    await for (var value in stream) {
      sum += value;
    }
  } catch (e) {
    return -1;
  }
  return sum;
}

Stream<int> countStream(int to) async* {
  for (int i = 1; i <= to; i++) {
    if (i == 4) {
      throw new Exception('Intentional exception');
    } else {
      yield i;
    }
  }
}

main() async {
  var stream = countStream(10);
  var sum = await sumStream(stream);
  print(sum); // -1
}
```

#### Two kinds of streams

**Single subscription streams**

* contains a sequence of events that are parts of a larger whole
* events need to be delivered in the correct order and without missing any of them
* such a stream can only be listened to once. 
* Listening again later could mean missing out on initial events, and then the rest of the stream makes no sense
* When you start listening, the data will be fetched and provided in chunks

**Broadcast streams**

* individual messages that can be handled one at a time
* you can start listening to such a stream at any time
* more than one listener can listen at the same time
* you can listen again later after canceling a previous subscription

### Isolates and event loops

Dart, despite being a single-threaded language, offers support for futures, streams, background work, and all the other things you need to write in a modern, asynchronous, and reactive way(Flutter).

#### Isolates

An isolate is what all Dart code runs in. It's like a little space on the machine with its own, private chunk of memory and a single thread running an event loop. An isolates has its own memory and a single thread of execution that runs an event loop.

Many Dart apps run all their code in a single isolate, but you can have more than one if you need it. If you have a computation to perform that's so enormous it could cause you to drop frames if it were run in the main isolate, then you can use Isolate.spawn() or Flutter's compute() function. Both of those functions create a separate isolate to do the number crunching, leaving your main isolate free to , say, rebuild and render the widget tree.

The new isolate gets its own event loop and its own memory, which the original isolate--even though it's the parent of this new one--isn't allowed to access. That's the source of the name isolate: these little spaces are kept isolated from one another.

In fact, the only way that isolates can work together is by passing messages back and forth. One isolate sends a message to the other, and the receiving isolate processes that message using its event loop.

This lack of shared memory might sound kind of strict, but it has some key benefits for Dart coders. For example, memory allocation and garbage collection in an isolate don't require locking. That works out well for Flutter apps, which sometimes need to build up and tear down a bunch of widgets quickly.

#### Event loops

The event loop makes asynchronous code possible.  The app runs an event loop, which grabs the oldest event from its event queue, process it, goes back for the next one, processes it, and so on, until the event queue is empty.

The whole time the app is running -- you're tapping on the screen, things are downloading, a timer goes off -- that event loop is just going around and around, processing those events one at a time.

When there's a break in the action, the thread just hangs out, waiting for the next event. It can trigger the garbage collector, get some coffee, whatever.

All of the high-level APIs and language features that Dart has for asynchronous programming -- futures, streams, async and await -- they're all built on and around this simple loop.

```dart
RaisedButton(
  child: Text('Click me'),
  onPressed: () {
    final myFuture = http.get('https://example.com');
    myFuture.then((response) {
      if (response.statusCode == 200) {
        print('Success!');
      }
    });
  },
)
```

## **Generator**

Generator is a kind of function which is used to produce a sequence of values lazily.

* Synchronous generator: returns an ***iterable*** object
* Asynchronous generator: returns a ***stream*** object

### Synchronous generator

To create a synchronous generator, mark the function body as ***sync*** and use ***yield*** to deliver value.

```dart
import 'dart:io';

Iterable<int> countStream(int max) sync * {
  for (int i = 0; i < max; ++i) {
    yield i;
    sleep(Duration(seconds: 1));
  }
}

void main() {
  print('start');
  countStream(5).forEach((data){
    print(data);
  });
  print('end');
}
```

### Asynchronous generator

To create an asynchronous generator, mark the function body as ***async**** and use ***yield*** keyword to deliver value.

```dart
import 'dart:io';

Stream<int> countStream(int max) async * {
  for (int i = 0; i < max; ++i) {
    yield i;
    sleep(Duration(seconds: 1));
  }
}

void main() {
  print('start');
  countStream(5).listen((data){
    print(data);
  },
  onDone: (){
    print("Done");
  });
  print('end');
}
```

When we have to use function call in the yield, we have to use ***yield****.

```dart
Iterable<int> naturalsDownFrom(int n) sync* {
  if (n > 0) {
    yield n;
    yield* naturalsDownFrom(n - 1);
  }
}
```

## Type system

The Dart language is type safe.

* static type checking: assigning a ***String*** to ***int*** is a compile-time error
* runtime checks: casting an ***Object*** to a string using ***as String*** fails with a runtime error if the object isn't a string

**sound typing** : ensure that a variable's value always matches the variable's static type.

**type inference**: Although types are mandatory, type annotations are optional

### What is soundness?

Soundness is about ensuring your program can't get into certain invalid states. A sound type system means you can never get into a state where an expression evaluates to a value that doesn't match the expression's static type. For example, if an expression's static type is String, at runtime you are guaranteed to only get a string when you evaluate it.

#### The benefits of soundness

* revealing type-related bugs at compile time
* more readable code
* more maintainable code
* better ahead of time(AOT) compilation

#### Tips for passing static analysis

* use sound return types when overriding methods
* use sound parameter types when overriding methods
* don't use a dynamic list as a typed list

### Runtime checks

### Type inference

### Substituting types



## Extension methods



