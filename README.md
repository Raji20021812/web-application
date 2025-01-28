UserForm.js


import React, { useState, useEffect } from "react";

const UserForm = ({ onSave, editingUser, onCancel }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ firstName: "", lastName: "", email: "", department: "" });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
    setUser({ firstName: "", lastName: "", email: "", department: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={user.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={user.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={user.department}
        onChange={handleChange}
        required
      />
      <button type="submit">{editingUser ? "Update" : "Add"}</button>
      {editingUser && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default UserForm;





UserList.js 


import React from "react";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div>
      <h2>User List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;





App.js 


import React, { useState, useEffect } from "react";
import axios from "./api";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  const addUser = async (user) => {
    try {
      const response = await axios.post("/users", user);
      setUsers([...users, response.data]);
    } catch (err) {
      setError("Failed to add user");
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(`/users/${id}`, updatedUser);
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
    } catch (err) {
      setError("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <UserList
        users={users}
        onEdit={setEditingUser}
        onDelete={deleteUser}
      />
      <UserForm
        onSave={(user) =>
          editingUser ? updateUser(editingUser.id, user) : addUser(user)
        }
        editingUser={editingUser}
        onCancel={() => setEditingUser(null)}
      />
    </div>
  );
};

export default App;



