import React, { useState } from "react";
import "./login.css";
import Navbar from "../../../components/navbar/Navbar";
import axios from "axios";

// Images
import Avatar from "../../../assets/user-img.png";
import { useNavigate } from "react-router-dom";
import loginBanner from "../../../assets/loginPage.png";

export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Role:", role);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Secret Key:", secretKey);

    const adminLoginAPI = "http://localhost:5000/admLogin";
    const teacherLoginAPI = "http://localhost:5000/thrLogin";
    const studentLoginAPI = "http://localhost:5000/stdLogin";

    if (role === "admin") {
      axios
        .post(`${adminLoginAPI}`, {
          adminEmail: email,
          adminPassword: password,
          adminSecretKey: secretKey,
        })
        .then((response) => {
          console.log(response.data);
          const id = response.data._id
          console.log(id);
          if (response.status === 200) {
            console.log("Admin login successful");
            navigate(`/admdash/${id}`);
          } else {
            console.error("Admin login failed");
          }
        })
        .catch((error) => {
          console.error("Error during admin login:", error.message);
        });
    }

    if (role === "teacher") {
      axios
        .post(`${teacherLoginAPI}`, {
          thrEmail: email,
          thrPassword: password,
        })
        .then((response) => {
          console.log(response.data._id);
          const id = response.data._id
          if (response.status === 200) {
            console.log("Teacher login successful");
            navigate(`/thrDash/${id}`);
          } else {
            console.error("Teacher login failed");
          }
        })
        .catch((error) => {
          console.error("Error during teacher login:", error.message);
        });
    }

    if (role === "student") {
      axios
        .post(`${studentLoginAPI}`, {
          stdEmail: email,
          stdPassword: password,
        })
        .then((response) => {
          console.log(response.data);
          const id = response.data._id
          console.log(id);
          if (response.status === 200) {
            console.log("Student login successful");
            navigate(`/stdDash/${id}`);
          } else {
            console.error("Student login failed");
          }
        })
        .catch((error) => {
          console.error("Error during student login:", error.message);
        });
    }
  };

  return (
    <div className="loginPageMain">
      <Navbar />
      <div className="banner">
          <img src={loginBanner}/>
        </div>
      <div className="login-container">
       
        <img className="avatar" src={Avatar} />
        <h2>Login</h2>
        <div className="form-group">
          <label>Select Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {role === "admin" && (
          <div className="form-group">
            <label>Secret Key:</label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
        )}
        <div className="form-group">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
