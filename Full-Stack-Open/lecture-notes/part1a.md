# 1a. Introduction to React
- [1a. Introduction to React](#1a-introduction-to-react)
- [React basics](#react-basics)
  - [JSX](#jsx)
  - [Embedded JavaScript expressions in JSX](#embedded-javascript-expressions-in-jsx)
- [Setting up a React app](#setting-up-a-react-app)
- [React Components](#react-components)
  - [Defining the `App` component](#defining-the-app-component)
  - [Multiple components](#multiple-components)
  - [Props: Passing data to components](#props-passing-data-to-components)
- [Some notes](#some-notes)
  - [Do not render objects](#do-not-render-objects)
  - [Printing console logs](#printing-console-logs)
  - [JSX syntax](#jsx-syntax)
- [Exercise setup](#exercise-setup)
  - [For exercises 1.1 to 1.5](#for-exercises-11-to-15)
  - [For exercise 1.6 to 1.14](#for-exercise-16-to-114)

# React basics

(For full tutorial, see [React Quick Start](https://react.dev/learn))

- React is a JavaScript library for building user interfaces
- React apps are made of **components**
- A component is a piece of the UI (e.g. a button, or an entire page)
- Components are JavaScript functions and they can return markup code (e.g. HTML-like code such as **JSX**). For example:
    ```javascript
    function MyButton() {
        return (
            <button>Click me</button>
        );
    }
    ```
- The code above defines a component called `MyButton` that returns the code for a button. (Note that `<button>` looks like an HTML element, but it is actually a JSX element)
- You may write components using pure JavaScript without JSX, but JSX is easier to use
- `App.js` contains the root component of the app (the top-level component), as well as other components
- The root component can be specified using the keywords `export default`.
    
    `App.js` example:
    ```javascript
    // MyButton component
    function MyButton() {
        return (
            <button>Click me</button>
        );
    }

    // Root component
    export default function MyApp() {
        return (
            <div>
                <h1>Welcome to my app</h1>
                <MyButton /> 
            </div>
        );
    }

    ```

- **Note that React components should start with a capital letter** (e.g. `MyButton`) to distinguish them from HTML elements (which start with lowercase letters)
- To define a component, you can use either `function` or `const` (with an arrow function). For example, the following code is equivalent to the previous one:

    ```javascript
    const MyButton = () => {
        return (
            <button>Click me</button>
        );
    }
    ```

- React components are JS functions under the hood, but you can call them using JSX syntax, which is like using them as HTML tags: For example, call the `MyButton` component using `<MyButton />`

## JSX

- Most React apps are built with JavaScript funtions that return JSX, but other markup languages can also be used
- JSX looks like HTML, but it is actually JavaScript written in a HTML-like syntax (Under the hood, JSX is compiled into JavaScript before being executed by the browser)
    - The compilation is handled by Babel
    - Projects created with create-react-app or vite are configured to compile automatically
- JSX is stricter than HTML
    - For example, all tags must be closed (e.g. `<br />` instead of `<br>` for new lines)
    - Multiple JSX elements cannot be returned directly: they must be wrapped in a single parent tag (e.g. `<div>...</div>`  as shown in the example above). To avoid extra `<div>` tags in the rendered document, you may use React Fragments (`<>...</>`) instead of a `<div>` tag. Alternatively, you may also return multiple JSX elements as an array (`return [...]`).
- Just like HTML, JSX tags can have attributes (e.g. `className`)
    - e.g. `<img className="avatar" />`
- You can select JSX elements by their class and style them using CSS:
    ```css
    /*CSS file */
    .avatar {
        border-radius: 50%;
    }
    ```
    - Note: You may add the CSS file to the `HTML` file of the app using a `<link>` tag, but there are other ways to do that depending on the build tool used

## Embedded JavaScript expressions in JSX

- JSX can also contain JavaScript expressions (e.g. variables, functions)
- To include a JavaScript expression in JSX, wrap it in curly braces `{}`:
    ```javascript
    // return a JSX element with embedded JavaScript expressions
    return (
        <div>
            <img className="avatar" src={user.avatarUrl} />
            <h2>{user.name}</h2>
        </div>
    );
    ``` 
- In the example above, JavaScript expressions are embedded in a JSX attribute (`src` inside the `<img>` tag) and in the body of a JSX element (`<h2>` tag)
- The expressions are evaluated and the results are inserted into the JSX output

# Setting up a React app

- We will create an app called "introdemo"
- We will use Vite (a build tool) to create the app
- We will use the React template to create the app
- Some files in the React template:
    - `src/main.jsx` is the entry point of the app
    - `src/App.jsx` contains the root component of the app
    - `index.html` is the main HTML file of the app (where the content is rendered)

1. Create a new project called introdemo using Vite and the React template:

    ```bash
    # npm 6.x (outdated, but still used by some):
    npm create vite@latest introdemo --template react

    # npm 7+, extra double-dash is needed:
    npm create vite@latest introdemo -- --template react
    ```
    Notes:
    - `@latest` is used to get the latest version
    - `--template react` is used to specify the template to use. We are using the React template.

2. Navigate to the project directory, install dependencies, and start the development server:
   
    ```bash
    cd introdemo
    npm install
    npm run dev
    ```

   - The localhost URL will be displayed in the terminal. (e.g. `http://localhost:5173/`)
   - By default, Vite uses port 5173 (unless it is already in use)
   - The code of the app is in the `src` folder

3. In the `src` folder, open `main.jsx` and edit the code as follows:
    ```jsx
    import ReactDOM from 'react-dom/client'

    import App from './App'

    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
    ```
4. Also edit the `App.jsx` file in the `src` folder:
    ```jsx
    const App = () => {
        return (
            <div>
                <p>Hello world</p>
            </div>
        )
    }

    export default App
    ```
5. You may delete `App.css` and `index.css` in the `assets` folder as they are not needed for our app

create-react-app (CRA):
- Instead of Vite, you can use `create-react-app` (CRA) to create a new React app
- In `create-react-app`, the name of the app startup file is `index.js` instead of `main.jsx`
- To start the app, use `npm start` instead of `npm run dev`

# React Components

- Install *React Developer Tools* browser extension to inspect React components in the browser
- A React component with the name `App` is defined in `App.jsx`
- The content of `App` is rendered by the last line in `main.jsx` (`ReactDOM.createRoot(...).render(...)`)
- In a React app, `index.html` does not have any visible content by default. You may add the content manually, but it is usually rendered through React components:

    ```html
    <!-- index.html -->

    <!doctype html>
    <html lang="en">
    <head>
        <!-- some meta tags and title of the page -->
    </head>
    <body>
        <!-- root element of the app -->
        <div id="root"></div>
        <!-- script tag to load the app -->
        <script type="module" src="/src/main.jsx"></script>
    </body>
    </html>
    ```
   - The `div` element with the id `root` (i.e. the root element) is where the content of the app is rendered 
   - The `script` tag loads the content by running the `main.jsx` file

## Defining the `App` component

- In `App.jsx`, the `App` component is defined as follows:

    ```jsx
    const App = () => (
    <div>
        <p>Hello world</p>
    </div>
    )
    ```

- The `App` component is a JavaScript function (an arrow function in this case) that takes no arguments: `() => {...}`
- Note that we don't need to use the `return` keyword when the function body is a single expression. The above code is equivalent to:

    ```jsx
    const App = () => {
        return (
            <div>
                <p>Hello world</p>
            </div>
        )
    }
    ```
- The last line in `App.jsx` sets the `App` component as the default export of the file (i.e. the component that will be imported when `App.jsx` is imported in another file using `import App from './App'`)
  
    ```jsx
    export default App
    ```
- Note: We consider the `App` component as the root component in this part, but there are other cases where it is not the root (see Part 6)
    

## Multiple components

- We can define multiple components in `App.jsx` and call them inside one another

    ```jsx
    const Hello = () => {
        return (
            <div>
                <p>Hello world</p>
            </div>
        )
    }

    const App = () => {
        return (
            <div>
                <h1>Greetings</h1>
                <Hello />
                <Hello />
                <Hello />
            </div>
        )
    }
    ```

- Note that you should not define a component inside another component

## Props: Passing data to components

- Props are the data passed to a component (like attributes of the tag). For example:

    ```jsx
    <Hello name="Alice" />  // name is a prop
    ```
- You can define the props that a component can take by adding a `props` object as an argument:

    ```jsx
    const Hello = (props) => {
        return (
            <div>
                <p> 
                    Hello {props.name},
                    you are {props.age} years old
                </p>
            </div>
        )
    }
    ```
- In the example above, `props` is an object that contains the fields `name` and `age`. You can also define the fields directly as a list of arguments:

    ```jsx
    const Hello = ({name, age}) => {...}
    ```
- Remember to enclose the list of arguments in curly braces `{}`

- Example usage:
  
    ```jsx
    const Hello = (props) => {
        // see above
    }

    const App = () => {
        const name = 'Peter'
        const age = 10
        return (
            <div>
                <h1>Greetings</h1>
                <Hello name='Maya' age={26 + 10} />
                <Hello name={name} age={age} />
            </div>
        )
    }
    ```

- To call a component with props using JSX syntax, you pass the props as attributes:

    ```jsx
    <Hello name='Peter' age={10} />
    ```

# Some notes

## Do not render objects

- **You should not render objects directly**. For example, the following code will not work:

    ```jsx
    const App = () => {
        const person = {name: 'Peter', age: 10}

        // rendering the 'person' object directly
        return (
            <div>
                <p>{person}<p>
            </div>
        )
    }
    ```
- In the JSX output, `{}` only works for primitive values (or expressions that evaluate to a primitive value) such as strings and numbers, but not objects. Therefore, to fix the above code, you should render the fields of the object:

    ```jsx
    const App = () => {
        const person = {name: 'Peter', age: 10}

        // rendering the fields of the 'person' object
        return (
            <div>
                <p>{person.name} {person.age}</p>
            </div>
        )
    }
    ```
- Note: arrays can be rendered directly:

    ```jsx
    const App = () => {
        const numbers = [1, 2, 3]
        return (
            <div>
                <p>{numbers}</p> // this works
            </div>
        )
    }
    ```

    - Note: to access the elements of the array, you can use the `map` function:

    ```jsx

## Printing console logs

- You can print console logs in the browser console using `console.log`:

    ```jsx
    const Hello = (props) => {
        console.log(props)
        return (
            <div>
                <p>Hello {props.name}</p>
            </div>
        )
    }
    ```
- In the example above, the `props` object is printed to the console when the `Hello` component is rendered. This can be useful for debugging.

## JSX syntax

- Input arguments to a component can be an object (e.g. `props`) or a primitive value (e.g. string, number), or an array
- If the argument is a single object, you don't need to enclose the argument in brackets `()`. For example, both of the following are valid:

    ````jsx
    const Hello = (props) => {...}
    const Hello = props => {...}
    ````
- If the argument is a primative value or an array, you must enclose the argument in curly braces `{}`. In addition, you also need to enclose it in brackets `()` (to avoid syntax error due to the way JSX is parsed). For example:

    ```jsx
    const Hello = ({name}) => {...}
    const Hello = ({name, age}) => {...}
    // const Hello = {name} => {...} this won't work
    // const Hello = (name) => {...} this won't work
    // const Hello = {name, age} => {...} this won't work
    // const Hello = (name, age) => {...} this won't work
    ```

# Exercise setup

## For exercises 1.1 to 1.5

```bash
# Create a new React app named "courseinfo"
npm create vite@latest courseinfo --template react

cd courseinfo # navigate to the project directory
npm install # install dependencies
npm run dev # start the development server
```

## For exercise 1.6 to 1.14

```bash
# Create a new React app named "unicafe"
npm create vite@latest unicafe --template react

cd unicafe # navigate to the project directory
npm install # install dependencies
npm run dev # start the development server
```
