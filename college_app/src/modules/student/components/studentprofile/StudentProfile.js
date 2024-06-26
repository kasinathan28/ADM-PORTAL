import React, { useEffect, useState } from 'react';
import './StudentProfile.css';
import axios from 'axios';

function StudentProfile({ id }) {
  console.log(id);

  const studentProfileAPI = `http://localhost:5000/getStudent/${id}`;
  const updateStudentAPIURL = `http://localhost:5000/updateStudent/${id}`;

  // State to hold the fetched student data
  const [profileData, setProfileData] = useState({
    stdName: '',
    stdEmail: '',
    stdPassword: '',
    stdPhoneNumber: '',
    regNo: '',
    stdDept: '',
    stdSem: ''
  });

  // State to hold edited profile data
  const [editedProfileData, setEditedProfileData] = useState({
    stdName: '',
    stdEmail: '',
    stdPassword: '',
    stdPhoneNumber: '',
    regNo: '',
    stdDept: '',
    stdSem: ''
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
      await axios.put(updateStudentAPIURL, editedProfileData);
      console.log('Profile data updated successfully');
      window.location.reload();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  useEffect(() => {
    const studentDetails = async () => {
      try {
        const response = await axios.get(studentProfileAPI);
        console.log(response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };
    studentDetails();
  }, [studentProfileAPI]);

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
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="label" htmlFor="stdName">
                        Student Name
                      </label>
                      <div className="input-container">
                        <input
                          type="text"
                          id="stdName"
                          name="stdName"
                          defaultValue={editedProfileData.stdName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="stdEmail">
                        Email
                      </label>
                      <div className="input-container">
                        <input
                          type="email"
                          id="stdEmail"
                          name="stdEmail"
                          defaultValue={editedProfileData.stdEmail}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="stdPhoneNumber">
                        Phone No
                      </label>
                      <div className="input-container">
                        <input
                          type="tel"
                          id="stdPhoneNumber"
                          name="stdPhoneNumber"
                          defaultValue={editedProfileData.stdPhoneNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="label" htmlFor="stdPassword">
                        Password
                      </label>
                      <div className="input-container">
                        <input
                          type="password"
                          id="stdPassword"
                          name="stdPassword"
                          defaultValue={editedProfileData.stdPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="regNo">
                        Reg. No
                      </label>
                      <div className="input-container">
                        <input
                          type="text"
                          id="regNo"
                          name="regNo"
                          defaultValue={editedProfileData.regNo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="stdDept">
                        Department
                      </label>
                      <div className="input-container">
                        <input
                          type="text"
                          id="stdDept"
                          name="stdDept"
                          defaultValue={editedProfileData.stdDept}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="label" htmlFor="stdSem">
                        Semester
                      </label>
                      <div className="input-container">
                        <input
                          type="text"
                          id="stdSem"
                          name="stdSem"
                          defaultValue={editedProfileData.stdSem}
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
                <div className="row">
                  <div className="col">
                    <p>
                      <strong>Student Name:</strong> {profileData.stdName}
                    </p>
                    <p>
                      <strong>Email:</strong> {profileData.stdEmail}
                    </p>
                    <p>
                      <strong>Phone No:</strong> {profileData.stdPhoneNumber}
                    </p>
                  </div>
                  <div className="col">
                    <p>
                      <strong>Password:</strong> {profileData.stdPassword}
                    </p>
                    <p>
                      <strong>Reg No:</strong> {profileData.regNo}
                    </p>
                    <p>
                      <strong>Department:</strong> {profileData.stdDept}
                    </p>
                  </div>
                  <div className="col">
                    <p>
                      <strong>Semester:</strong> {profileData.stdSem}
                    </p>
                    <p>
                      <strong>Activity Point:</strong> {profileData.ActivityPoints}
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

export default StudentProfile;
