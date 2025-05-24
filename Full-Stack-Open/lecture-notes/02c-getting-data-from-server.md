# 2c Getting Data from Server

- Part 3 will be about the backend (server-side functionality), but before that, we will learn how the browser communicates with the backend in this part.

# Setup

- We will use a **JSON Server** to simulate a backend.
- To create a JSON Server:
1. Create a file named `db.json` in the root directory of the *notes* app in the previous part.
2. Add the following content to `db.json`:
    
    ```json
    {
    "notes": [
        {
        "id": "1",
        "content": "HTML is easy",
        "important": true
        },
        {
        "id": "2",
        "content": "Browser can execute only JavaScript",
        "important": false
        },
        {
        "id": "3",
        "content": "GET and POST are the most important methods of HTTP protocol",
        "important": true
        }
    ]
    }
    ```

3. You can start the JSON Server by running the following `npx` command in the root directory of the app:

    ```bash
    npx json-server --port 3001 db.json
    ```

    - JSON Server starts running on port 3000 by default, but we will now define an alternate port 3001.
    - Navigate to the address http://localhost:3001/notes in the browser. We can see that JSON Server serves the notes we previously wrote to the file in JSON format (you can install JSONView extension in the browser to view JSON data more easily):

        ```json
        [
            {
                "id": "1",
                "content": "HTML is easy",
                "important": true
            },
            {
                "id": "2",
                "content": "Browser can execute only JavaScript",
                "important": false
            },

            // ...

        ]
        ```
    
- P.S. You don't need to install JSON Server globally, as `npx` allows you to run it without a separate installation. (Global installation means you can run it from any directory without specifying the path to the executable.)
- What we want to do:
    - save the notes to the json-server
    - fetches the notes from the server and renders them in the browser
    - In other words, whenever a new note is added to the application, the React code also sends it to the server to make the new note persist in "memory".
- json-server stores all the data in `db.json` (which resides on the server)
    - In the real world, data would be stored in some kind of database.
    - However, json-server is a simple way to simulate a backend for development purposes.

# The browser as a runtime environment