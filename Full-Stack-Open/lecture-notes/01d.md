# Part 1d. A more complex state, debugging React apps
- [Part 1d. A more complex state, debugging React apps](#part-1d-a-more-complex-state-debugging-react-apps)
- [Complex state](#complex-state)
  - [Multiple state variables](#multiple-state-variables)
  - [Objects as state variables](#objects-as-state-variables)
  - [More examples](#more-examples)
- [Conditional rendering](#conditional-rendering)
- [Event handling strategies](#event-handling-strategies)
  - [A function that returns a function](#a-function-that-returns-a-function)
  - [Passing event handlers to child components](#passing-event-handlers-to-child-components)
- [Debugging React apps](#debugging-react-apps)

# Complex state

- In the previous notebook, the `App` component has a simple state with a single numerical variable (`counter`)
- Components can have more complex states, such as:
    -  multiple state variables
    -  state variables of different types, e.g. numbers, strings, arrays, objects

## Multiple state variables

- In the following example, the `App` component has a more complex state with two variables:
    -  `left` (number): number of left clicks
    -  `right` (number): number of right clicks

    ```jsx
    const App = () => {
        const [left, setLeft] = useState(0)
        const [right, setRight] = useState(0)

        // ...
    }
    ```

## Objects as state variables

- Instead of having two separate state variables shown above, we could use a single object as the state variable:
  
    ```jsx
    const [clicks, setClicks] = useState(
                                {left: 0, right: 0}
                                )
    ```

- However, using a single object to represent a complex state can make the code too complex. For example, if we just want to update one of the values, we will need to tell our event handler to keep the other value unchanged:

    ```jsx
    // Event handlers

    const handleLeftClick = () => setClicks({
            left: clicks.left + 1,
            right: clicks.right // unchanged right clicks
            })

    const handleRightClick = () => setClicks({
            left: clicks.left, // unchanged left clicks
            right: clicks.right + 1
            })
    ```
- To handle unchanged values, we can use the spread syntax (`...`) to copy the existing values and update only the necessary values:

    ```jsx
    const handleLeftClick = () => setClicks({
            ...clicks,
            left: clicks.left + 1
            })

    const handleRightClick = () => setClicks({
            ...clicks,
            right: clicks.right + 1
            })
    ```

## More examples

- Using a single state object to store multiple state values may be beneficial in some cases (see [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)), but it is unnecessary for our app. We will continue using separate state variables.
- In the following example, we will create four separate state variables:
    - `left` (number): number of left clicks
    - `right` (number): number of right clicks
    - `allClicks` (array): an array of clicks, e.g. `[L L R L]`
    - `total` (number): total number of clicks 

    ```jsx
    const App = () => {
        const [left, setLeft] = useState(0)
        const [right, setRight] = useState(0)
        const [allClicks, setAll] = useState([])
        const [total, setTotal] = useState(0)

        // ...
    }
    ```
- We will have two event handlers:
    
    ```jsx
    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        const updatedLeft = left + 1 // see note below
        setLeft(updatedLeft)
        setTotal(updatedLeft + right)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        const updatedRight = right + 1 // see note below
        setRight(updatedRight)
        setTotal(left + updatedRight)
    }
    ```

    - Note: State values are fixed during the current render, so `setLeft` and `setRight` will not update the `left` and `right` variables immediately.
    - To calculate total clicks, we need to use the updated values (`updatedLeft` and `updatedRight`) instead of `left` and `right` (which are still the old values). The following code will not work as expected:

        ```jsx
        const handleLeftClick = () => {
            setAll(allClicks.concat('L'))
            setLeft(left + 1)
            setTotal(left + right) // will give wrong total
        }
        ```

- Just a reminder: `useState` and other hooks must be called at the top level of the component, not inside loops, conditions, or nested functions

# Conditional rendering

- Rendering different content based on conditions (see Part 2 for more details)
- In this example, a message will be shown if no button has been pressed. Otherwise, the button press history will be shown:

    ```jsx

    const History = (props) => {
        // Show message if no button has been pressed
        if (props.allClicks.length === 0) {
            return (
            <div>
                the app is used by pressing the buttons
            </div>
            )
        }
        // Show history
        return (
            <div>
            button press history: {props.allClicks.join(' ')}
            </div>
        )
    }

    const Button = ({ handleClick, text }) => (
        <button onClick={handleClick}>
            {text}
        </button>
    )

    const App = () => {
        // State variables
        const [left, setLeft] = useState(0)
        const [right, setRight] = useState(0)
        const [allClicks, setAll] = useState([])

        // Event handlers
        const handleLeftClick = () => {
            setAll(allClicks.concat('L'))
            setLeft(left + 1)
        }
        const handleRightClick = () => {
            setAll(allClicks.concat('R'))
            setRight(right + 1)
        }

        // JSX output
        return (
            <div>
                {left}
                <Button handleClick={handleLeftClick} text='left' />
                <Button handleClick={handleRightClick} text='right' />
                {right}
                // The History component will be rendered based on the condition
                <History allClicks={allClicks} />
            </div>
        )
    }
    ```

# Event handling strategies

## A function that returns a function

- Instead of defining separate event handlers for each button, we can create a single function that returns a event handler customized for each button:

    ```jsx
    const App = () => {
        const [value, setValue] = useState(10)

        // A general event handler that returns a customized event handler
        const hello = (who) => {
            const handler = () => {console.log('hello', who)}
            return handler
        }

        return (
            <div>
                <button onClick={hello('world')}>button</button>
                <button onClick={hello('react')}>button</button>
                <button onClick={hello('function')}>button</button>
            </div>
        )
    }
    ```

## Passing event handlers to child components

- Event handlers can be passed as props to child components just like any other data
- For example, we can pass the event handlers `handleLeftClick` and `handleRightClick` from the `Button` component to the HTML element `button`:

    ```jsx
    const Button = ({ handleClick, text }) => (
        <button onClick={handleClick}>
            {text}
        </button>
    )

    const App = () => {

        //...

        return (
            <div>
                <Button handleClick={handleLeftClick} text='left' />
                <Button handleClick={handleRightClick} text='right' />
            </div>
        )
    }
    ```

    - Note: the prop `handleClick` in the `Button` component can be named anything. (It doesn't need to match the name of attribute `onClick` in the HTML element `button`)

# Debugging React apps

- Keep your console open at all times
- Use `console.log` to print values to the console
- Use the command `debugger` to set a breakpoint in your code
- `debugger` also allows you to execute code line by line in the browser's developer tools (See the control panel in the `Sources` tab)
- Use the **React Developer Tools** extension for Chrome to inspect the component tree, state, and props (a new `Components` tab will appear in the developer tools)