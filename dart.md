# **Dart Language**
## **Language samples**

### Hello World

Every app has a ***main()*** function. To display text on the console, you can use the top-level ***print*** function.

```dart
void main() {
  print('Hello, World!');
}
```

### Variables

Even in type-safe Dart code, most variables don't need explicit types, thanks to type inference.

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

A shorthand ***=>***(arrow) syntax is handy for functions that contain a single statement. This syntax is especially useful when passing ***anonymous functions*** as arguments.

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

What consist of a class? **variables, properties, constructors, methods, getter/setter method.**

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

PilotedCraft now has the astronauts field as well as the describeCrew() method.

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

## **Language tour**

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

### String interpolation

- put the value of an expression inside a string by using ${expression}
- omit the {} if the expression is an identifier

```dart
'${3+2}'                    // '5'
'${"word".toUpperCase()}'   // 'WORD'
'$myObject'                 // the value of myObject.toString()
```

### Null-aware operator

- ??=: assign a value to a variable only if the variable is currently null

- ??: return the expression on its left unless that expression's value is null, in which case it evaluates and returns the expression on its right

```dart
int a;    // a is null

a ??= 3;  // a is 3
a ??= 5;  // a is still 3

print(1 ?? 3)       // 1
print(null ?? 12);  // 12
```

### Conditional property access

put a question mark(?) after an object that might be null to guard access to its properties or methods.

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

Dart's type inference can assign types to these variables for you. In this case, the inferred types are List<String>, Set<String>, and Map<String, int>.

Or you can specify the type yourself:

```dart
final aListOfInts = <int>[];
final aSetOfInts = <int>{};
final aMapOfIntToDouble = <int, double>{};
```

### Arrow syntax

The => symbol is a way to define a function that executes the expression to its right and returns its value.

```dart
// pass a function to the any() method of List
bool hasEmpty = aListOfStrings.any((s) {
  return s.isEmpty;
});

// simpler way to write that code
bool hasEmpty = aListOfStrings.any((s) => s.isEmpty);
```

### Cascade call

use cascades(..) to perform a sequence of operations on the same object.

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

You can define getters and setters whenever you need more control over a property than a simple field allows.

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

You can also use a getter to define a computed property:

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

-- positional parameters

```dart
int sumUp(int a, int b, int c) {
    return a + b + c;
}

int total = sumUp(1, 2, 3);
```

You can make these positional parameters optional by wrapping them in brackets.

-- optional positional parameters

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

Optional positional parameters are always last in a function's parameter list. Their default value is null unless you provide another default value.

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

Using a curly brace syntax, you can define optional parameters that have names.

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

All of exceptions are unchecked exceptions. Methods don't declare which exceptions they might throw, and you aren't required to catch any exceptions.

Dart provides Exception and Error types, but you're allowed to throw any non-null object.

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

Dart provides a handy shortcut for assigning values to properties in a constructor: ***this.propertyName*** when declaring the constructor.

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

* go between the constructor's signature and its body
* do some setup before the constructor body executes
* eg. final fields must have values before the constructor body exectues

```dart
Point.fromJson(Map<String, num> json)
    : x = json['x'],
	  y = json['y'] {
	print('In Point.fromJson(): ($x, $y)');          
}
```

The initializer list is also a handy place to put asserts, which run only during development.

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

* objects never change after created
* make these objects compile-time constants
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

