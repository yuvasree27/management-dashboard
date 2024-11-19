import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div className="user-card" key={user.id}>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <div className="user-actions">
            {/* Edit button with FontAwesome icon */}
            <button onClick={() => onEdit(user)} title="Edit">
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>

            {/* Delete button with FontAwesome icon */}
            <button onClick={() => onDelete(user.id)} title="Delete">
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
