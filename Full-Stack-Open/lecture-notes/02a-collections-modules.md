# 2a. Rendering a collection, modules

- [2a. Rendering a collection, modules](#2a-rendering-a-collection-modules)
- [VS Code snippets](#vs-code-snippets)
- [Working with JavaScript arrays](#working-with-javascript-arrays)
- [Rendering a collection of items](#rendering-a-collection-of-items)
  - [Key-attribute](#key-attribute)
- [Refactoring modules (e.g. components)](#refactoring-modules-eg-components)

# VS Code snippets

- To quickly create re-usable code blocks, you can use VS Code snippets. See the [documentation](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets).

# Working with JavaScript arrays

- We will be using the functional programming paradigm (see below) to work with arrays in JavaScript.
- For example, we will use functional operators like `find`, `map`, `filter`, and `reduce` to process arrays.
- Functional programming treats computations as the evaluation of mathematical functions and avoids changing data (or state). (Compare this with *imperative programming*: data/state is changed during the computation by executing a sequence of statements.)
- In other words, functional programming is about transforming input data into output data, without side effects.
- JavaScript supports functional programming. For example, you can:
    - assign functions to variables
        
        ```javascript
        const square = function(x) {
            return x * x;
        };
        ```
    - pass functions as arguments to other functions
  
        ```javascript
        const numbers = [1, 2, 3];
        const squared = numbers.map(square);
        console.log(squared);
        ```

    - return functions from other functions

- **Higher-order functions**: functions that take other functions (i.e. **callback functions**) as arguments or return functions as their result. For example:

    - `filter` function:

        ```javascript
        var courses = [
            { name: 'JavaScript', duration: 30 },
            { name: 'Python', duration: 20 },
            { name: 'Java', duration: 50 },
            { name: 'C++', duration: 20 },
            { name: 'Ruby', duration: 20 }
        ];

        // Filter courses with duration less than 30
        var isShort = function(course) {
            return course.duration < 30;
        }
        var shortCourses = courses.filter(isShort);

        // Compare this with imperative programming where you would use a loop:
        // var shortCoursesImperative = [];
        // for (var i = 0; i < courses.length; i++) {
        //     if (courses[i].duration < 30) {
        //         shortCoursesImperative.push(courses[i]);
        //     }
        // }
        ```
    - `map` function generates a new array by applying a function to each element of the original array:

        ```javascript
        var courses = [
            { name: 'JavaScript', duration: 30 },
            { name: 'Python', duration: 20 },
            { name: 'Java', duration: 50 },
            { name: 'C++', duration: 20 },
            { name: 'Ruby', duration: 20 }
        ];
        // Create an array of course names
        var courseNames = courses.map(function(item) {
            return item.name;
        });
        ```

    - `reduce` function reduces an array to a single value by applying a function to each element of the array:

        ```javascript
        var numbers = [1, 2, 3, 4, 5];
        // Calculate the sum of all numbers
        var sum = numbers.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue;
        }, 0); // 0 is the initial value of the accumulator
        ```

# Rendering a collection of items

- We will work with the following files:
    
    App.jsx:
    ```jsx
    const App = (props) => {
    const { notes } = props

    return (
        <div>
        <h1>Notes</h1>
        <ul>
            <li>{notes[0].content}</li>
            <li>{notes[1].content}</li>
            <li>{notes[2].content}</li>
        </ul>
        </div>
    )
    }

    export default App
    ```

    main.jsx
    ```jsx
    import ReactDOM from 'react-dom/client'
    import App from './App'

    const notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        important: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    }
    ]

    ReactDOM.createRoot(document.getElementById('root')).render(
    <App notes={notes} />
    )
    ```
    
    - Each note is an object with `id`, `content`, and `important` properties. 

- In App.jsx, each note is rendered as a list item in an unordered list:
    
    ```jsx
    <li>{notes[0].content}</li>
    ```

- However, it is more efficient to render all notes using the `map` function:
  
    ```jsx
    notes.map(note => <li>{note.content}</li>)
    ```

- So we can replace the above code block for list in App.jsx with:
    
    ```jsx
      <ul>
        {notes.map(note => 
          <li>
            {note.content}
          </li>
        )}
      </ul>
    ```

## Key-attribute

- The above code works, but it will give you a warning in the console:
  
    ```
    Each child in an array or iterator should have a unique "key" prop.
    ```

- This is because React needs a way to identify the elements in the list so that it knows how to update the view generated by a component when the component is re-rendered.
- The list items (i.e. elements returned by the `map` function) must have a unique `key` prop:

    ```jsx
    <ul>
      {notes.map(note => 
        <li key={note.id}> // let's use note id as the key
          {note.content}
        </li>
      )}
    </ul>
    ```

- Remember to enclose variables in curly braces `{}` when using them in JSX. Note that you need to use `{}` both for the entire `map` expression and for the variables inside it!
- (Not recommended) We can also use the array index as the key. Simply pass a second parameter to the callback function inside `map`:

    ```jsx
    <ul>
        {notes.map((note, i) => 
            <li key={i}>
            {note.content}
            </li>
        )}
    </ul>
    ```
    
    - This is not recommended because if the array is modified (e.g. an item is added or removed), the index of the items will change, and React will not be able to correctly identify the items in the list. Therefore, a unique and persistent identifier (like `id`) should be used if the list is likely to change.
    - If the above example, each note has a hardcoded unique `id`. We can also generate unique IDs automatically using `shortid.generate()`.

# Refactoring modules (e.g. components)

- We can make each `<li>` element a separate component, e.g. `Note`:

    Note.jsx:
    ```jsx
    const Note = ({ note }) => {
        return (
            <li>{note.content}</li>
        )
        }

    const App = ({ notes }) => {
        return (
            <div>
            <h1>Notes</h1>
            <ul>

                {notes.map(note => 
                <Note key={note.id} note={note} />
                )}
            </ul>
            </div>
        )
    }
    ```

    - Note that instead of passing the key attribute to the `<li>` element, we now pass it to the `Note` component. This is because React needs the key attribute on the top-level element of the list item, which in this case is the `Note` component.

- A whole React application can be written in a single file. Although that is not very practical. Common practice is to declare each component in its own file as an **ES6-module**.
- A module is a file that contains code that can be imported and exported. For example:

    ```jsx
    import App from './App'
    ```

    This imports the main component of the app from the file `App.jsx` and assigns it to the variable `App`.

- In smaller applications, component modules are usually placed in a directory called components, which is in turn placed within the src directory. These modules are usually named after the component they contain.
- To create a module for the component `Note`:
    - Create a directory called `components` in the `src` directory.
    - Create a file called `Note.jsx` in the `components` directory.
    - Add the following code to `Note.jsx`:

        ```jsx
        const Note = ({ note }) => {
        return <li>{note.content}</li>
        }

        export default Note
        ```

    - `export default Note` exports the declared module, the variable `Note`.

- To import the `Note` component in `App.jsx`:
    ```jsx
    import Note from './components/Note'
    // '.' refers to the current directory. '.jsx' can be omitted.
    ```
