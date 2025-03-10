# To-Do List Application

This is a web application for a simple to-do list, built with Express.js and Firebase for data storage. This application also demonstrates a the basic CRUD commands (Create, Read, Update, Delete) while using the Firebase Firestore API.

## Features

- Create new tasks
- View all tasks
- Mark tasks as completed
- Delete tasks
- Real-time updates with Firebase Firestore

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Dependencies**: dotenv, cors, firebase-admin

## Demo

[View Demo](...)

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/TyroneMartin/cloudbase-db-todo-list
   cd cloudbase-db-todo-list
   ```

2. **Firebase Setup**:
   - Create a project in the [Firebase Console](https://console.firebase.google.com/)
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key" to download your service account JSON file
   - Set up Firestore database in your Firebase project

3. **Environment Variables**:
   - Create a `.env` file in the project root
   - Add the following variables:
   ```
   databaseURL="https://your-project-id.firebaseio.com"
   SERVICE_ACCOUNT_KEY={"type":"service_account",...} # Paste your entire service account JSON here
   ```

4. **Install Dependencies**:
   ```bash
   npm install
   ```

5. **Run the Application**:
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

6. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`


## API Endpoints

The application provides the following RESTful API endpoints:

- **GET /api/tasks**: Retrieve all tasks
- **POST /api/tasks**: Create a new task
- **PUT /api/tasks/:id**: Update a task's completion status
- **DELETE /api/tasks/:id**: Delete a task

## Troubleshooting

### Firebase Connection Issues
- Verify that your `.env` file contains the correct Firebase credentials
- Ensure that Firestore is enabled in your Firebase project
- Check that your service account has the necessary permissions

### Application Not Loading
- Make sure all dependencies are installed: `npm install`
- Verify the server is running: `npm start`
- Check the browser console for errors

## Future Improvements

- User authentication
- Task categories/tags
- Due dates for tasks
- Task priorities
- Filter and search functionality
- Dark mode toggle

## Hours Spent

- Approximately 20-30 hours