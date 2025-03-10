Here’s a `README.md` file for your project, including setup instructions for Cloud Firestore and Express.js, as well as a section for the technologies used:

---

# To-Do List API

This project is a simple To-Do List application that uses **Cloud Firestore** as the database and **Express.js** as the backend framework. It allows users to create, read, update, and delete tasks, which are stored in a Firestore database.

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Setup Instructions](#setup-instructions)
   - [Prerequisites](#prerequisites)
   - [Setting Up Cloud Firestore](#setting-up-cloud-firestore)
   - [Setting Up Express.js](#setting-up-expressjs)
   - [Running the Application](#running-the-application)
3. [Project Structure](#project-structure)
4. [License](#license)

---

## Technologies Used

The following technologies were used to build this project:

- **Node.js**: A JavaScript runtime for building the backend.
- **Express.js**: A web framework for Node.js used to create the API.
- **Cloud Firestore**: A NoSQL document database for storing task data.
- **Firebase Admin SDK**: Used to interact with Firestore from the backend.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **Dotenv**: For managing environment variables.
- **Nodemon**: A development tool to automatically restart the server on file changes.

---

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Firebase Account](https://firebase.google.com/) (for Firestore setup)
- A code editor (e.g., [VS Code](https://code.visualstudio.com/))

---

### Setting Up Cloud Firestore

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on **Add Project** and follow the steps to create a new project.

2. **Set Up Firestore**:
   - In the Firebase Console, navigate to **Firestore Database** under the **Build** section.
   - Click **Create Database** and follow the prompts to set up Firestore in **test mode** (for development purposes).

3. **Generate a Private Key**:
   - Go to **Project Settings** > **Service Accounts**.
   - Click **Generate New Private Key** and download the JSON file.
   - Rename the file to `serviceAccountKey.json` and place it in the root of your project.

4. **Add Firestore Configuration**:
   - In your `.env` file, add the following environment variable:
     ```env
     GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
     ```

---

### Setting Up Express.js

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/to-do-list-api.git
   cd to-do-list-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file in the root directory and add the following:
     ```env
     PORT=3000
     GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
     ```

---

### Running the Application

1. **Start the Server**:
   ```bash
   npm start
   ```

2. **Access the API**:
   - The API will be running at `http://localhost:3000`.
   - Use tools like [Postman](https://www.postman.com/) or your browser to interact with the API.

---

## Project Structure

```
to-do-list-api/
├── src/
│   ├── routes/             # Express routes
│   ├── js/                 # Firebase configuration
│   └── views/              # Frontend files (if applicable)
├── .env                    # Environment variables
├── app.js                  # Main application file
├── serviceAccountKey.json  # Firebase service account key
├── package.json            # Project dependencies
├── README.md               # Project documentation
└── main.js                 # Frontend JavaScript (if applicable)
```

---

## License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---


