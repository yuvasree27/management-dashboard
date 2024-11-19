import axios from "axios";

// Base URL for the API
const API_URL = "https://jsonplaceholder.typicode.com";

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    const users = response.data;
    return users.map((user) => ({
      id: user.id,
      firstName: user.name.split(" ")[0],
      lastName: user.name.split(" ")[1] || "",
      email: user.email,
      department: user.company.name || "N/A", // Simulating department with company name
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Add a new user
export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
};

// Update an existing user
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
