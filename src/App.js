import React, { useState, useEffect } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "./api"; // Import API functions
import UserForm from "./components/UserForm";
import UserList from "./components/UserList"; // Import UserList component
import "./App.css"; // Import CSS

const App = () => {
  const [users, setUsers] = useState([]); // List of users
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for editing
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  // Fetch users from the API on component mount
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data); // Set the fetched users in state
    });
  }, []);

  // Handle adding a new user
  const handleAdd = () => {
    setSelectedUser(null); // Clear selected user
    setShowForm(true);     // Show the user form
  };

  // Handle editing an existing user
  const handleEdit = (user) => {
    setSelectedUser(user); // Set the selected user for editing
    setShowForm(true);     // Show the form with the selected user's data
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    await deleteUser(id); // Call the delete API function
    setUsers(users.filter((user) => user.id !== id)); // Remove the user from state
  };

  // Handle form submission (add or edit)
  const handleFormSubmit = async (userData) => {
    if (selectedUser) {
      const updatedUser = await updateUser(selectedUser.id, userData); // Update the user
      setUsers(users.map((u) => (u.id === selectedUser.id ? updatedUser : u))); // Update the list of users
    } else {
      const newUser = await addUser(userData); // Add the new user
      setUsers([...users, newUser]); // Add the new user to the state
    }
    setShowForm(false); // Hide the form after submission
  };

  return (
    <div className="App">
      <h1>User Management Dashboard</h1>

      {showForm ? (
        <div className="form-card">
        <UserForm
        user={selectedUser || {}} // If selectedUser is null, pass an empty object
        onSubmit={handleFormSubmit}
        onCancel={() => setShowForm(false)} // Close the form
        />

        </div>
      ) : (
        <>
          <button className="add-user-button" onClick={handleAdd}>Add User</button>

          {/* Display the list of users */}
          <UserList
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default App;
