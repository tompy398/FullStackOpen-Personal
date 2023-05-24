```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server
    
    user->>browser: Place Pointer on Text Input Field
    user->>browser: Type Somthing in Text Input Field
    user->>browser: Press Browser Page Submit Button
    
    browser->>server: Send HTTP POST Request
    activate server
    server-->>browser: Receives HTTP Status Code 302
    deactivate server

    Note right of browser: Asks the browser to do a new HTTP GET Request at {Response Header's Location}
    Note right of server: Below are the operations to load the page (Copied from fullstackopen.com)

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```