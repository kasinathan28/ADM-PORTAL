import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TeacherDashboard.css";
import Navbar from "../../components/navbar/Navbar";
import TeacherProfile from "./components/TeacherProfile/TeacherProfile";
import Students from "./components/Students/Students";
import thrgif from "../../assets/teacherBanner.png";

function TeacherDashboard() {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "profile":
        return <TeacherProfile id={id} />;
      case "students":
        return <Students />;
      case "teachers":

      default:
        return (
          <div className="admigifcontainer">
            <div className="admincot">
              <h1>
                Make the changes you want. It may affect all the faculties.
              </h1>
            </div>
            <img className="admgif" src={thrgif} />
          </div>
        );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="teacherDashboard">
        <div className="sidebar">
          <ul>
            <li>
              <button onClick={() => setSelectedOption("profile")}>
                MY PROFILE
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedOption("students")}>
                STUDENTS
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

export default TeacherDashboard;
