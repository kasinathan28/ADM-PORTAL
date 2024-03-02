import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Students.css"; // Import CSS file

export default function Student() {
  const getStudentsAPIURL = "http://localhost:5000/getStudents";
  const addStudentAPIURL = "http://localhost:5000/newStudent";
  const deleteStudentAPI = "http://localhost:5000/deleteStudent";

  const [studentData, setStudentData] = useState([]);
  const [newStudent, setNewStudent] = useState({
    stdName: "",
    stdEmail: "",
    stdPhoneNumber: "",
    regNo: "",
    stdDept: "",
    stdPassword: "",
    stdSem: "",
  });

  useEffect(() => {
    getStudentData();
  }, []);

  const getStudentData = async () => {
    try {
      const response = await axios.get(getStudentsAPIURL);
      setStudentData(response.data);
    } catch (error) {
      console.log("Error fetching students", error);
    }
  };

  const deleteStudent = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`${deleteStudentAPI}/${id}`);
      console.log(response.data);
      getStudentData();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newStudent);
    try {
      await axios.post(addStudentAPIURL, newStudent);
      const response = await axios.get(getStudentsAPIURL);
      setStudentData(response.data);
      setNewStudent({
        stdName: "",
        stdEmail: "",
        regNo: "",
        stdPhoneNumber: "",
        stdDept: "",
        stdPassword: "",
        stdSem: "",
      });
      console.log("New student added successfully");
    } catch (error) {
      console.log("Error adding new student:", error);
    }
  };

  const [selectedStudent, setSelectedStudent] = useState(null);

  const openPopup = (student) => {
    setSelectedStudent(student);
  };

  const closePopup = () => {
    setSelectedStudent(null);
  };

  return (
    <div>
      <div className="addStudent-form">
        <h1>Add New Student</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="stdName">Name:</label>
            <input
              type="text"
              id="stdName"
              name="stdName"
              value={newStudent.stdName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="regNo">Reg No:</label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              value={newStudent.regNo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="stdEmail">Email:</label>
            <input
              type="email"
              id="stdEmail"
              name="stdEmail"
              value={newStudent.stdEmail}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="stdPassword">Password:</label>
            <input
              type="password"
              id="stdPassword"
              name="stdPassword"
              value={newStudent.stdPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="stdPhoneNumber">Phone Number:</label>
            <input
              type="text"
              id="stdPhoneNumber"
              name="stdPhoneNumber"
              value={newStudent.stdPhoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="stdDept">Department:</label>
            <input
              type="text"
              id="stdDept"
              name="stdDept"
              value={newStudent.stdDept}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="stdSem"> Semester:</label>
            <select
              id="stdSem"
              name="stdSem"
              onChange={handleChange}
              value={newStudent.stdSem}
            >
              <option value="">--Select--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <button type="submit">Add Student</button>
        </form>
      </div>
      <div className="studentsList">
        <h1>Students List</h1>
        <div className="students-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Department</th>
                <th>Reg No</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={index} onClick={() => openPopup(student)}>
                  <td>{student.stdName}</td>
                  <td>{student.stdEmail}</td>
                  <td>{student.stdPhoneNumber}</td>
                  <td>{student.stdDept}</td>
                  <td>{student.regNo}</td>
                  <td>{student.stdPassword}</td>
                
                  <td>
                  
                    <button onClick={() => deleteStudent(student._id)}>
                      <i className="fa-solid fa-trash ms-2"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Popup component */}
      {selectedStudent && (
        <div className="popup-content1">
          <h2>{selectedStudent.stdName}'s Certificates</h2>
          <ul>
            {selectedStudent.certificates.map((certificate, index) => (
              <li key={index}>{certificate.certificateName}</li>
            ))}
          </ul>
          <h2>Activity Points: {selectedStudent.ActivityPoints}</h2>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
}
