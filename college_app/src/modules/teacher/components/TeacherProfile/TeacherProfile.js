import React, { useEffect, useState } from 'react';
import './TeacherProfile.css';
import axios from 'axios';

function TeacherProfile({ id }) {
  console.log(id);

  const teacherProfileAPI = `http://localhost:5000/getTeacher/${id}`;
  const updateTeacherAPIURL = `http://localhost:5000/updateTeacher/${id}`;

  // State to hold the fetched admin data
  const [profileData, setProfileData] = useState({
    thrUsername: '',
    thrPassword: '',
    thrEmail: '',
    thrDept: '',
    thrPhoneNumber: '',
    thrAadhar: '',
  });
  // State to hold edited profile data
  const [editedProfileData, setEditedProfileData] = useState({
    thrUsername: '',
    thrPassword: '',
    thrEmail: '',
    thrDept: '',
    thrPhoneNumber: '',
    thrAadhar: '',
  });

  // State to track edit mode
  const [editMode, setEditMode] = useState(false);

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setEditedProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Function to submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(editedProfileData);
    try {
      await axios.put(updateTeacherAPIURL, editedProfileData);
      console.log('Profile data updated successfully');
      window.location.reload();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  // Fetch the teacher details and show them in the teacher profile
  useEffect(() => {
    const teacherDetails = async () => {
      try {
        const response = await axios.get(teacherProfileAPI);
        console.log(response.data);
        setProfileData(response.data); // Set actual data from response
      } catch (error) {
        console.error('Error fetching teacher details:', error);
      }
    };
    teacherDetails();
  }, [teacherProfileAPI]);

  return (
    <div>
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
                      name="thrUsername"
                      defaultValue={editedProfileData.thrUsername}
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
                      name="thrPassword"
                      defaultValue={editedProfileData.thrPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="label" htmlFor="email">
                        Email
                      </label>
                      <div className="input-container">
                        <input
                          type="email"
                          id="email"
                          name="thrEmail"
                          defaultValue={editedProfileData.thrEmail}
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
                          name="thrPhoneNumber"
                          defaultValue={editedProfileData.thrPhoneNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="label" htmlFor="phone">
                        Aadhar No
                      </label>
                      <div className="input-container">
                        <input
                          type="tel"
                          id="phone"
                          name="thrAadhar"
                          defaultValue={editedProfileData.thrAadhar}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="department">
                        Department
                      </label>
                      <div className="input-container">
                        <input
                          type="text"
                          id="department"
                          name="thrDept"
                          defaultValue={editedProfileData.thrDept}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
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
                <p>
                  <strong>Username:</strong> {profileData.thrUsername}
                </p>
                <p>
                  <strong>Password:</strong> {profileData.thrPassword}
                </p>
                <div className="row">
                  <div className="col">
                    <p>
                      <strong>Email:</strong> {profileData.thrEmail}
                    </p>
                    <p>
                      <strong>Phone No:</strong> {profileData.thrPhoneNumber}
                    </p>
                  </div>
                  <div className="col">
                    <p>
                      <strong>Aadhar No:</strong> {profileData.thrAadhar}
                    </p>
                    <p>
                      <strong>Department:</strong> {profileData.thrDept}
                    </p>
                  </div>
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
    </div>
  );
}

export default TeacherProfile;
