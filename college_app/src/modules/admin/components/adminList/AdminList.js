import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminList.css";

function AdminList() {
  const [adminData, setAdminData] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    adminUsername: "",
    adminPhoneNumber: "",
    adminEmail: "",
    adminSecretKey: "",
  });

  const getAdminAPIURL = "http://localhost:5000/getAdmins";
  const addAdminAPIURL = "http://localhost:5000/newAdmin";
  const deleteAdminAPIURL = "http://localhost:5000/deleteAdmin";

  useEffect(() => {
    const getAdminData = async () => {
      try {
        const response = await axios.get(getAdminAPIURL);
        setAdminData(response.data);
      } catch (error) {
        console.log("Error fetching the admins", error);
      }
    };
    getAdminData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(addAdminAPIURL, newAdmin);
      const response = await axios.get(getAdminAPIURL);
      setAdminData(response.data);
      setNewAdmin({
        adminUsername: "",
        adminPhoneNumber: "",
        adminEmail: "",
        adminPassword: "",
        adminSecretKey: "",
      });
      console.log("New admin added successfully");
    } catch (error) {
      console.log("Error adding new admin:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${deleteAdminAPIURL}/${id}`);
      const updatedAdmins = adminData.filter((admin) => admin._id !== id);
      setAdminData(updatedAdmins);
      console.log("Admin deleted successfully");
    } catch (error) {
      console.log("Error deleting admin:", error);
    }
  };

  return (
    <div className="adminList-container">
      <div className="addAdmin-form">
        <h1>Add new Admin</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="adminUsername">Admin:</label>
            <input
              type="text"
              id="adminUsername"
              name="adminUsername"
              value={newAdmin.adminUsername}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adminPhoneNumber">Admin Phone Number:</label>
            <input
              type="text"
              id="adminPhoneNumber"
              name="adminPhoneNumber"
              value={newAdmin.adminPhoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adminEmail">Admin Email:</label>
            <input
              type="email"
              id="adminEmail"
              name="adminEmail"
              value={newAdmin.adminEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adminPassword">Admin Password:</label>
            <input
              type="text"
              id="adminPassword"
              name="adminPassword"
              value={newAdmin.adminPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adminSecretKey">Admin Secret Key:</label>
            <input
              type="text"
              id="adminSecretKey"
              name="adminSecretKey"
              value={newAdmin.adminSecretKey}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add Admin</button>
        </form>
      </div>
      <div className="adminList">
        <h1>Admin List</h1>
        <table>
          <thead>
            <tr>
              <th>Admin</th>
              <th>Admin Phone Number</th>
              <th>Admin Email</th>
              <th>Admin Secret Key</th>
              <th>Action</th> {/* New column for delete action */}
            </tr>
          </thead>
          <tbody>
            {adminData.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.adminUsername}</td>
                <td>{admin.adminPhoneNumber}</td>
                <td>{admin.adminEmail}</td>
                <td>{admin.adminSecretKey}</td>
                <td>
                  <button onClick={() => handleDelete(admin._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminList;
