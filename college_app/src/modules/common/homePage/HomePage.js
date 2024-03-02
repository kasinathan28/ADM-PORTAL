// HomePage.js
import React from "react";
import "./HomePage.css";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";

// Images
import homeImg from "../../../assets/home-img.png";
import adminImg from "../../../assets/admin-img.png";
import teacherImg from "../../../assets/teaher-img.png";
import studentImg from "../../../assets/student-img.png";
import { useNavigate } from "react-router-dom";



function HomePage() {

  const navigate = useNavigate();

  const handleLogin =()=>{
    navigate("/auth");
  }
  return (
    <div>
      <Navbar />
      <div className="homepage-container">
        <div className="content">
          <h1>Carmel Polytechnic College</h1>
          <h2>Activity Points Manager</h2>
          <div className="desc">
            <p>
              It helps to manage the "Activity Points" points the student
              easily.
            </p>
          </div>
        </div>
        <div className="home-img">
          <img src={homeImg} alt="Home" />
        </div>
      </div>

      <div className="admindet-container">
        <div className="admin-img">
          <img src={adminImg} alt="Admin" />
        </div>
        <div className="content">
          <h1>Admin's</h1>
          <div className="desc">
            <p>
              The Admins can manage all the faculty in charge and manages the
              students accommodation and manages the details of each and every
              student without fail.
            </p>
          </div>
          <div className="Login-btn">
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>

      <div className="teacherdet-container">
        <div className="content">
          <h1>Teacher Details</h1>
          <div className="desc">
            <p>
              Teachers play a vital role in the education system. They impart
              knowledge, guide students, and contribute to their overall
              development.
            </p>
          </div>
          <div className="Login-btn">
          <button onClick={handleLogin}>Login</button>
          </div>
        </div>
        <div className="teacher-img">
          <img src={teacherImg} alt="Teacher" />
        </div>
        
      </div>

      <div className="studentdet-container">
        <div className="student-img">
          <img src={studentImg} alt="Student" />
        </div>
        <div className="content">
          <h1>Student Details</h1>
          <div className="desc">
            <p>
              Students are the backbone of any educational institution. They
              come to learn, grow, and shape their future.
            </p>
          </div>
          <div className="Login-btn">
          <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
