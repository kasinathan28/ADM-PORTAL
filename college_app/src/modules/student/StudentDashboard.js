import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import Navbar from "../../components/navbar/Navbar";
import StudentProfile from "./components/studentprofile/StudentProfile";
import Certificates from "./components/certificates/Certificates";
import welcomeImage from "../../assets/student-img.png";

function StudentDashboard() {
  const { id } = useParams();
  console.log(id);
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/"); // Navigate to the login page
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "profile":
        return <StudentProfile id={id} />;
      case "certificates":
        return <Certificates id={id} />;
      default:
        // Display the welcome image by default
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
              flexDirection:"column"
            }}
          >

            <img src={welcomeImage} alt="Welcome" />
            <h2>Student Dashboard</h2>
          </div>
        );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="studentDashboard">
        <div className="sidebar">
          <ul>
            <li>
              <button onClick={() => setSelectedOption("profile")}>
                MY PROFILE
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedOption("certificates")}>
                CERTIFICATES
              </button>
            </li>
            <li>
              <button onClick={handleLogout} id="logout">
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default StudentDashboard;
