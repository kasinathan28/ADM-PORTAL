import React, { useEffect, useState } from "react";
import "./AdmProfile.css";
import axios from "axios";

function AdmProfile({ id }) {
  const adminProfileAPI = `http://localhost:5000/getAdmin/${id}`;
  const updateAdminAPIURL = `http://localhost:5000/updateAdmin/${id}`;

  const [profileData, setProfileData] = useState({
    adminUsername: "",
    adminPassword: "",
    adminEmail: "",
    adminPhoneNumber: "",
    adminSecretKey: "",
  });

  const [editedProfileData, setEditedProfileData] = useState({
    adminUsername: "",
    adminPassword: "",
    adminEmail: "",
    adminPhoneNumber: "",
    adminSecretKey: "",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(updateAdminAPIURL, editedProfileData);
      console.log("Profile data updated successfully");
      window.location.reload();
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  useEffect(() => {
    const getAdminDetails = async () => {
      try {
        const response = await axios.get(adminProfileAPI);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };
    getAdminDetails();
  }, [adminProfileAPI]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="profile-img">
          <img
            src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png"
            alt="Profile"
          />
        </div>
        <div className="text-center">
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label" htmlFor="username">
                  Username
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    id="username"
                    name="adminUsername"
                    value={editedProfileData.adminUsername}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <div className="input-container">
                  <input
                    type="password"
                    id="password"
                    name="adminPassword"
                    value={editedProfileData.adminPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <div className="input-container">
                  <input
                    type="email"
                    id="email"
                    name="adminEmail"
                    value={editedProfileData.adminEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="label" htmlFor="phone">
                  Phone No
                </label>
                <div className="input-container">
                  <input
                    type="tel"
                    id="phone"
                    name="adminPhoneNumber"
                    value={editedProfileData.adminPhoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="label" htmlFor="secretKey">
                  Secret Key
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    id="secretKey"
                    name="adminSecretKey"
                    value={editedProfileData.adminSecretKey}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="btn-container">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="info-label">
                <strong>Username:</strong>
                <p>{profileData.adminUsername}</p>
              </div>
              <div className="info-label">
                <strong>Email:</strong>
                <p>{profileData.adminEmail}</p>
              </div>
              <div className="info-label">
                <strong>Phone No:</strong>
                <p>{profileData.adminPhoneNumber}</p>
              </div>
              <div className="info-label">
                <strong>Secret Key:</strong>
                <p>{profileData.adminSecretKey}</p>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdmProfile;
