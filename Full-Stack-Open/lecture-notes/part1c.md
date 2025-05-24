# Part 1c. Component state, event handlers
- [Part 1c. Component state, event handlers](#part-1c-component-state-event-handlers)
- [Some notes on JavaScript](#some-notes-on-javascript)
  - [Component helper functions](#component-helper-functions)
  - [Destructuring](#destructuring)
- [Page re-rendering](#page-re-rendering)
- [Stateful components](#stateful-components)
  - [How React state works](#how-react-state-works)
  - [Step-by-step explanation](#step-by-step-explanation)
- [Event handling](#event-handling)
  - [Inline event handlers](#inline-event-handlers)
  - [Beware of function calls in event handlers](#beware-of-function-calls-in-event-handlers)
  - [Example app](#example-app)

# Some notes on JavaScript

## Component helper functions

- Helper functions can be defined inside a component or outside of it. For example:

    ```jsx
    const Hello = (props) => {

        // Helper function inside the component
        // Note: You don't need to pass props to the helper function
        // since it has access to the props of the component
        const bornYear = () => new Date().getFullYear() - props.age

        return (
            <div>
            <p>
                Hello {props.name}, you are {props.age} years old. So you were probably born in {bornYear()}.
            </p>
            </div>
        )
    }
    ```

## Destructuring

- Destructuring can be used to simplify the code when accessing props. For example:

    ```jsx
    const Hello = (props) => {

        // Destructuring the props object to get 'name' and 'age'
        const { name, age } = props
        // Alternatively:
        // const name = props.name
        // const age = props.age

        const bornYear = () => new Date().getFullYear() - age

        return (
            <div>
            <p>
                Hello {name}, you are {age} years old. So you were probably born in {bornYear()}.
            </p>
            </div>
        )
    }
    ```

- You can also destructure the props directly in the function parameters:

    ```jsx
    const Hello = ({ name, age }) => { ... }
    ```

# Page re-rendering

- One way to refresh an element (e.g. a counter) after the page has been loaded is to re-render the component.
- Let's say you have a variable `counter`. It increments by one every time when, for example, the page is re-rendered. In `main.jsx`, you will have something like this:

    ```jsx
    let counter = 1 // Initial value of the counter
    const root = ReactDOM.createRoot(document.getElementById('root'))

    // Function to refresh the page
    const refresh = () => {
    root.render(
        <App counter={counter} /> // Pass the counter as a prop to the App component
    )
    }

    refresh()
    counter += 1 // Increment the counter after refreshing
    refresh()
    counter += 1
    ```

- Your `App.jsx` will look something like this:

    ```jsx
    const App = (props) => {
        const {counter} = props // get 'counter' from props
        return (
            <div>{counter}</div> // Display the counter
        )
    }
    ```

- To re-render after a certain time interval, you can use the `setInterval()` function:

    ```jsx
    setInterval(() => {
        refresh()
        counter += 1
    }, 1000) // Refresh every second
    ```

# Stateful components

- Making repeated calls to the render method is not the recommended way to update the UI. Instead, you can use **stateful components** to manage the **state** of the application.
- Stateful component: A component that has a state that can change over time.
- To add state to a component, you can use the `useState` "hook" from React:


    ```jsx
    import { useState } from 'react'

    const App = () => {
        // Add a state variable 'counter' to 'App' by calling 'useState' with an initial value of 0
        const [counter, setCounter] = useState(0)
        // This returns an array with two elements: the current state value and a function that lets you update it

        setTimeout(() => setCounter(counter + 1), 1000) // note that this doesn't change the value of 'counter'! It only tells React to update 'counter' in the next render
        return (
            <div>{counter}</div>
        )
    }
    ``` 
- PS: A "hook" is a special function that lets you "hook into" React features (use React features in your function components)

## How React state works

- `useState()` should be called at the **top of the function body**
- **`useState()` sets the state value of the *first* render only** (i.e. when the component is rendered for the first time)
    - it doesn't set the state value on subsequent renders (subsequent renders will use the value set by `setCounter()`)
- **Each render's state value is fixed (it doesn't change during the render)** (see [this explanation](https://react.dev/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time))
    - In other words, `counter` has a fixed value during the current render, and it won't be updated even after calling `setCounter()`!
    - `setCounter()` only tells React what the new state value should be in the *next* render
    - The state value is updated after the component is re-rendered
- **Setting the state requests a re-render of the component**. However, this doesn't mean that the component will re-render immediately:
    - ***Batching***: React processes state updates after running multiple event handlers in the component. This reduces the number of re-renders and improves performance. (see [this explanation](https://react.dev/learn/queueing-a-series-of-state-updates))

## Step-by-step explanation

1. When the `App` component is rendered for the first time, `useState(0)` sets the initial value of `counter` to `0`.
2. `setCounter(counter + 1)` is called after 1 second. This doesn't change the value of `counter` immediately. It only tells React that the state value should be updated to `counter + 1` in the next render.
3. The current value of `counter` (i.e. `0`) is displayed in the `div`.
4. The component is re-rendered with the updated state value (`counter + 1`). `counter` is now `1`.
5. `setCounter(counter + 1)` is called again after 1 second. This tells React to update the state value to `counter + 1` (i.e. `2`) in the next render.
6. The current value of `counter` (i.e. `1`) is displayed in the `div`.
7. The component is re-rendered with the updated state value and `setCounter(counter + 1)` is called again. This process continues as long as the app is running.

One may use `console.log()` to see the order of execution and understand how the state is updated.

# Event handling

- Events (e.g. button clicks) can be handled in React using event handler functions
- Event handlers are called when a specific event occurs
- Event handlers are passed as attributes to the elements (e.g. buttons) where the event occurs

    ```jsx
    const App = () => {
        const [ counter, setCounter ] = useState(0)

        // Event handler
        const increaseByOne = () => {
            setCounter(counter + 1)
        }

        return (
            <div>
                <div>{counter}</div>
                
                // Pass the event handler to the button
                <button onClick={increaseByOne}>
                    plus
                </button>                  
            </div>
        )
    }
    ```

## Inline event handlers

- The HTML element `button` has multiple events that can happen to it, such as `onClick`, `onMouseOver`, etc.
- Each event has a corresponding attribute that allows us to tell `button` what to do when the event occurs by passing an event handler function to it
- The event handler `increaseByOne` is defined outside the JSX output and passed to `onClick` as a *function reference*, but you can also define it as an *inline function* directly in the `onClick` attribute: 

    ```jsx
    <button onClick={() => setCounter(counter + 1)}>
        plus
    </button>
    ```

## Beware of function calls in event handlers

- Note that in our case, we should not pass `setCounter()` directly to `onClick`:

    ```jsx
    // This will result in re-rendering infinitely
    <button onClick={setCounter(counter + 1)}>
        plus
    </button>
    ```


- Passing `setCounter(counter + 1)` directly to `onClick` would result in re-rendering infinitely:
  - When the `App` component is rendered for the first time, all the code inside it is evaluated, including the `button` element
  - `setCounter(counter + 1)` is called immediately as the `button` element is evaluated during rendering
    - **This is because `()` after a function name calls the function. So in this case, `setCounter(counter + 1)` is a *function call* statement, not a function reference (`onClick` event triggers the event handler when the button is clicked, but it does not stop the evaluation of the button's attributes during rendering)**
  - `setCounter` changes the state, which triggers a re-render
  - As the component renders, `setCounter(counter + 1)` is called again
  - This changes the state and triggers another re-render, and so on...
- On the other hand, passing an anonymous arrow function (`() => ...`) that calls `setCounter()` inside it will work as expected: `setCounter()` is only called when the button is clicked

## Example app

- Our app will have three buttons: one to increase the counter, one to decrease it, and one to reset it
- We will define three event handlers for each button: `increaseByOne`, `decreaseByOne`, and `setToZero`
- The app will also have a `Display` component to show the counter value
- Below is the code for the `App` component:

    ```jsx
    const App = () => {
        const [ counter, setCounter ] = useState(0)

        // Event handlers
        const increaseByOne = () => setCounter(counter + 1)
        const decreaseByOne = () => setCounter(counter - 1)
        const setToZero = () => setCounter(0)

        return (
            <div>
                <Display counter={counter} />
                <Button onClick={increaseByOne} text="+" />
                <Button onClick={setToZero} text="zero" />
                <Button onClick={decreaseByOne} text="-" /> 
            </div>
        )
    }
    ```

    - Note that we are not using the HTML element `button` directly. Instead, we are using a custom component `Button` that we will define later. (This makes code cleaner as we will reuse the `Button` component)
    - Self-closing tags such as `<Button ... />` can be used instead of `<Button> ... </Button>` for components that don't have children
    - `Button` is a custom component, not the HTML `button` element! (It's capitalized to differentiate it from the HTML element)
        - We pass the event handlers from `Button` to the `onClick` attribute of the HTML `button` element
- We will define the `Display` and `Button` components outside the `App` component (so they can be reused in other components or projects):

    ```jsx
    const Display = ({ counter }) => <div>{counter}</div>
    const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

    const App = () => {
        // ...
    }
    ```
    - Note that the prop `onClick` in the `Button` component is named the same as the attribute `onClick` in the HTML element `button`, but you can name the prop anything you want and it doesn't have to match the attribute name in the HTML element.
    - The code above uses destructuring to access the props directly and is written as a concise arrow function (with an implicit return). This simplifies the code for readability, though sometimes it's better to use a more verbose syntax. For example, the above components can also be written as:
    
        ```jsx
        const Display = (props) => {
            return <div>{props.counter}</div>
        }

        const Button = (props) => {
            return <button onClick={props.onClick}>{props.text}</button>
        }
        ```