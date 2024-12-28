# Part 1b. JavaScript

- [Part 1b. JavaScript](#part-1b-javascript)
- [Introduction](#introduction)
- [Variables](#variables)
- [Arrays](#arrays)
- [Objects](#objects)
- [Functions](#functions)


# Introduction

- Last version as of writing: ES14 (ECMAScript 2023)
- Current browsers do not support all features of the latest version. Some code may need to be transpiled to an older version.
- Transpilation is automatically configured in most modern build tools (e.g. Vite)
- To run JavaScript code, we need a runtime environment. For example:
    - Browser (client-side) 
    - Node.js
        - Node.js works everywhere, from servers to mobile devices
        - Node.js supports the latest JavaScript features (no transpilation needed) 

# Variables

- To declare a variable, use the keyword `let`, `const` or `var` (not recommended):

    ```javascript
        const x = 1
        let y = 5

        console.log(x, y)   // 1, 5 are printed
        y += 10
        console.log(x, y)   // 1, 15 are printed
        y = 'sometext'
        console.log(x, y)   // 1, sometext are printed
        x = 4               // causes an error
    ```
    - `const` is used for variables that should not be reassigned
    - Note: `const` does not make the value immutable, only the variable identifier. For example, `const arr = [1, 2, 3]` allows you to modify the array, but you cannot assign a new array to `arr`.

# Arrays

- Declare an array: `const arr = [1, 2, 3]`
- Access an element: `arr[0])` (the frist element is at index 0)
- Modify an element: `arr[1] = 4`
- Add an element: `arr.push(5)`
- To add an element without modifying the original array, use the `concat` method: `const newArr = arr.concat(5)`
- Remove the last element: `arr.pop()`
- Get the length of an array: `arr.length`
- Iterate over an array:

    ```javascript
        arr.forEach(item => {
            console.log(item) // prints each item
        })
    ```
    - `forEach` is a method of the array object. It takes a function as an argument and calls that function for each element in the array. In this example, the function is an arrow function that prints each item.
- Map each element to a new value:

    ```javascript
        const arr = [1, 2, 3]
        const m1 = arr.map(value => value * 2)
        console.log(m1)   // [2, 4, 6] is printed
        
        const m2 = arr.map(value => '<li>' + value + '</li>')
        console.log(m2)   // ['<li>1</li>', '<li>2</li>', '<li>3</li>'] is printed
    ```
    - `map` is a method of the array object. It takes a function as an argument and calls that function for each element in the array.
- Destructuring an array:

    ```javascript
        const arr = [1, 2, 3]
        const [a, b, c] = arr
        console.log(a, b)   // 1, 2 are printed
    ```

# Objects

- An object is a collection of key-value pairs (**properties**)
- Declare an object: `const obj = { key1: 'value1', key2: 'value2' }`
- Values can be of any type, including arrays and other objects
- Access a property: `obj.key1`
- Modify a property: `obj.key1 = 'new value'`
- Add a property after declaration: `obj.key3 = 'value3'`
- Add a property where the key contains spaces: use square brackets instead of dot notation: `obj['key with spaces'] = 'value'`
- Declare an object with a method:

    ```javascript
        const obj = {
            name: 'John',
            greet: function() {
                console.log('Hello, ' + this.name)
            }
        }
        obj.greet()   // prints 'Hello, John'
    ```
    - `this` refers to the object itself. In this example, `this.name` refers to the `name` property of the object.
    - Methods can also be added after object declaration: `obj.greet = function() { ... }`

# Functions

- Define a function (arrow function syntax):

    ```javascript
        const sum = (p1, p2) => {
            return p1 + p2
        }
    ```
- Define a function using the `function` keyword:

    ```javascript
        function sum(p1, p2) {
            return p1 + p2
        }
    ```
- Define a function using a function expression:

    ```javascript
        const sum = function(p1, p2) {
            return p1 + p2
        }
    ```

- Call a function: `const result = sum(1, 2)`
- If there is only one expression in the function, the curly braces and `return` keyword can be omitted:

    ```javascript
        const sum = (p1, p2) => p1 + p2
    ```
- If there is only one argument, parentheses can be omitted: `const square = x => x * x`