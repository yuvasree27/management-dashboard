# User Management Dashboard

This is a simple **User Management Dashboard** application built with **React**. It allows users to manage a list of users by adding, editing, and deleting user data. Each user has basic details such as **First Name**, **Last Name**, **Email**, and **Department**.

## Features
- **Add User**: Add a new user with the following details: First Name, Last Name, Email, Department.
- **Edit User**: Modify the details of an existing user.
- **Delete User**: Remove a user from the list.
- **List View**: Display all users in a table format with the ability to edit or delete.
- **Responsive Design**: The application is designed to work well on both desktop and mobile screens.

## Tech Stack
- **Frontend**: React.js
- **State Management**: React's `useState` and `useEffect` hooks
- **UI Framework**: Custom styles with CSS
- **API**: Axios to communicate with the backend API

## Installation

### Prerequisites
Ensure that you have **Node.js** and **npm** installed. You can download and install them from [nodejs.org](https://nodejs.org/).

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/yuvasree27/User-Management-Dashboard.git
    ```

2. Navigate to the project directory:

    ```bash
    cd User-Management-Dashboard
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Start the application:

    ```bash
    npm start
    ```

    This will start the development server at `http://localhost:3000`.

## Usage

- **Add User**: Click the "Add User" button to show the form. Fill in the user details and click "Submit" to add the user.
- **Edit User**: Click the "Edit" icon next to the user's name to modify their details.
- **Delete User**: Click the "Delete" icon to remove the user from the list.

## Folder Structure

/src /components UserForm.js # Form for adding or editing users UserList.js # Displays the list of users /api api.js # Contains axios functions for interacting with the backend App.js # Main component that manages user interactions and state App.css # Styles for the application index.js # Entry point for React app

## Contribution

Feel free to fork the project and submit pull requests for improvements or new features.

