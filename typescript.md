<h2>Introduction to TypeScript</h2>

TypeScript is a statically typed superset of JavaScript designed to make JavaScript development more robust and maintainable. It introduces the concept of static types to JavaScript, allowing developers to specify types for variables, function parameters, and return values.

<h3>Basic Types in TypeScript</h3>

<h4>1. Primitive Types</h4>

- Boolean Type

The boolean type represents logical values, either true or false. It's commonly used to store conditions or boolean flags in code.

    let isDone: boolean = false;

- Number Type

TypeScript's number type supports both integer and floating-point numbers.

    let decimal: number = 6;
    let pi: number = 3.14;

- String Type

The string type deals with textual data, representing sequences of characters.

    let name: string = "TypeScript";

- Array Type

Arrays in TypeScript are collections of elements of the same type denoted by square brackets [].

    let numbers: number[] = [1, 2, 3, 4];

<h4>2. Other Types</h4>

- Tuple Type

Tuples are arrays with a fixed number of elements, each potentially of different types.

    let tuple: [string, number] = ["hello", 10];

- Enum Type

Enums allow the creation of a set of named constants, making code more readable.

    enum Color {
        Red,
        Green,
        Blue,
    }
    let c: Color = Color.Green;

- Any Type

The any type allows variables to hold values of any type, providing flexibility but losing some of TypeScript's benefits.

    let notSure: any = 4;
    notSure = "maybe a string instead";

- Void Type

The void type represents the absence of a type, commonly used as the return type for functions that do not return a value.

    function sayHello(): void {
    console.log("Hello!");
    }

<h4>Variables and Type Declarations</h4>
In TypeScript, variables can be explicitly typed or their types can be inferred by the compiler.

    let message: string = "Hello, TypeScript!"; // Variable 'message' is explicitly typed as a string.

    let numberValue = 10; // TypeScript infers the type as 'number' based on the assigned value.
