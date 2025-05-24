# 2b Forms 

- [2b Forms](#2b-forms)
- [Introduction](#introduction)
- [Controlled component](#controlled-component)
- [Filtering Displayed Elements](#filtering-displayed-elements)

# Introduction

- In this section, we will create a form that allows users to add new notes.
- We will store the notes in the App component's state using the `useState` hook:

    ```jsx
    import { useState } from 'react'

    const App = (props) => {
        const [notes, setNotes] = useState(props.notes)

        return (
        //...
        )
    }
    ``` 

    - Here we initialize the `notes` state with the initial notes passed as `props`.
- We will create a form with an input field and a submit button:
    ```jsx
    const App = (props) => {
        const [notes, setNotes] = useState(props.notes)

        // event handler for form submission
        const addNote = (event) => {
            event.preventDefault()
            console.log('button clicked', event.target)
            // some code to add a new note
        }

        return (
            <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note => 
                <Note key={note.id} note={note} />
                )}
            </ul>

            // Form to add a new note
            <form onSubmit={addNote}>
                <input />
                <button type="submit">save</button>
            </form>   
            </div>
        )
    }
    ```
    - In the `<form>` element, we have an `<input>` field and a `<button>` of type "submit".
    - The event handler `addNote` calls `event.preventDefault()` to prevent the default form submission behavior (e.g. page reload, see [this](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)). This allows us to handle the form submission in a controlled manner:
        - `event.target` refers to the target of the event, i.e. the form element. We can access the value of the input field by using something like `event.target[0].value` (`target[0]` refers to the first input field).
        - However, this is not the recommended way to handle form inputs in React. Instead, we will use a controlled component approach (see below).

# Controlled component

- A controlled component is a form element whose value is controlled by React state. (So we are not using `event.target` to access the input value.)
- To create a controlled component, we need to:
1. Set the value of the input field to a state variable:
 
    ```jsx
    const [newNote, setNewNote] = useState(
        'a new note...' // this will be shown as the initial value in the input field
    ) 
    ```

2. Assign the `value` of the input field to this state variable:

    ```jsx
    // Inside the App component
    <form onSubmit={addNote}>
        <input value={newNote} />
        <button type="submit">save</button>
    </form>
    //...
    ```

3. At this point, the value of the input field is entirely controlled by the App component's state `newNote`, it does not change when the user types in it. To enable editing of the input field, we need an event handler that updates the state when the user types in the input field:

    ```jsx
    const handleNoteChange = (event) => {
        // console.log(event.target.value)
        setNewNote(event.target.value)
    }
    ```

    - The `event` object contains the target of the event (i.e. the input field). It is passed to the event handler so that it can access the value of the input field via `event.target.value`.
    - Unlike the `addNote` function, we do not need to call `event.preventDefault()` here as there is no default form submission involved in an input change. 

4. Now we can assign this event handler to the `onChange` event of `<input>`:

    ```jsx
    <form onSubmit={addNote}>
        <input
            value={newNote}
            onChange={handleNoteChange}
        />
        <button type="submit">save</button>
    </form>
    ```

- Now the value of the input field is controlled by the `newNote` state variable, which updates whenever the user types in the input field.
    - You can view the state update as you type in the input field using the component tab of the React Developer Tools in Chrome.
- Let's finish the `addNote` event handler so it can add user's input as a new note to the `notes` array:
    ```jsx
    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote, // content is user input
            important: Math.random() < 0.5,
            id: String(notes.length + 1),
        }

        setNotes(notes.concat(noteObject)) // add to 'notes'
        setNewNote('') // clear the input field
    }
    ```

    - The `concat` does not mutate the original `notes` array but creates a new array with the new note added to it at the end. (**This is important**: see [this](https://react.dev/learn/updating-objects-in-state#why-is-mutating-state-not-recommended-in-react).)
    - We also clear the input field by setting `newNote` to an empty string.

# Filtering Displayed Elements

- We will add a button to toggle the visibility of important notes:

1. Create a new state variable `showAll` to keep track of whether to show all notes or only important ones:

    ```jsx
    const [showAll, setShowAll] = useState(true)
    ```

2. Create a variable that stores the filtered notes based on the `showAll` state:

    ```jsx
    const notesToShow = showAll 
        ? notes
        : notes.filter(note => note.important)
    ```

    The conditional operators:
      - `const result = condition ? val1 : val2` 
      - `?` checks if `showAll` is true, and if so, it returns all notes. 
      - `:` is the "else" part, which filters the notes using a callback function (in this case, it filters notes that are marked as important).
      - Note that the callback function `note => note.important` is equivalent to `note => note.important === true`. We can omit the `=== true` part because the `important` property is a boolean value.

3. Use `notesToShow` in the `map` function to render the list of notes:

    ```jsx
    <ul>
        {notesToShow.map(note => 
            <Note key={note.id} note={note} />
        )}
    </ul>
    ```

4. Add a button to toggle the `showAll` state:

    ```jsx
    <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
    </button>
    ```
    
    `setShowAll(!showAll)` flips the value of `showAll` when the button is clicked.


