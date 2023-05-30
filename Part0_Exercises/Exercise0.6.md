```mermaid
sequenceDiagram
    participant browser
    participant server
    participant user

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: [Status Code: 200] Sends HTML File
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: [Status Code 200] Send CSS File
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: [Status Code 200] Send JSON File
    deactivate server

    user->>browser: ENTER & SUBMIT text into form
    browser->>server: Send POST
    activate server
    server-->>browser: [Status Code 201] Data Received & Changed
    deactive server
```