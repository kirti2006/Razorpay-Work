# Minimal Vanilla JS Frontend

This is a lightweight Vanilla JavaScript frontend for the Reimbursement Management API. It demonstrates how to interact with the backend API endpoints using the native `fetch` API.

## Features

- **Authentication**: Register and Login functionality.
- **Session Management**: Automatically sends and receives `HttpOnly` JWT cookies across requests.
- **Dashboard**: View a list of user reimbursements.
- **Reimbursement Submission**: Form to submit new reimbursement requests.

## Prerequisites

1. The **Backend server must be running**. (By default, it expects the backend to be running on `http://localhost:7002`).
2. Your backend `cors` configuration must have `credentials: true` enabled.

## How to Run

Because this frontend interacts with an API using cookies for authentication, it is highly recommended to serve the files using a local development server rather than simply opening `index.html` via the `file://` protocol.

You can use the `npx serve` package to spin up a quick HTTP server:

```bash
# Run this from inside the Frontend directory
npx serve .
```

Alternatively, you can use the Live Server extension in VS Code.

Once the server is running, open the local URL (usually `http://localhost:3000`) in your browser to interact with the application.

## Directory Structure

- `index.html`: The main markup structure.
- `styles.css`: Simple, clean responsive styling.
- `app.js`: All JavaScript logic, including API calls and DOM manipulation.
