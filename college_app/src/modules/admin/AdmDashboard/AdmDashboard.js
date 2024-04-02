import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar';
import './AdmDashboard.css';
import AdmProfile from '../components/AdmProfile/AdmProfile';
import TeachersList from '../components/Teachers/TeachersList';
import AdminList from '../components/adminList/AdminList';
import StudentsList from '../components/studentsList/StudentsList';
import admgif from "../../../assets/admgif.gif";

function AdmDashboard() {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();
  
  const renderContent = () => {
    switch (selectedOption) {
      case 'profile':
        return <AdmProfile id={id} />;
      case 'admins':
        return <AdminList/> ;
      case 'teachers':
        return <TeachersList/>;
      case 'students':
        return <StudentsList/>;
      default:
        return <div className='admigifcontainer'>
          <div className='admincot'>
          <h1>Make the changes you want. It may affect all the faculties.</h1>
          </div>
          <img  className="admgif" src={admgif} />
        </div>;
    }
  };


  const handleLogout = () => {
    // Implement your logout logic here, such as clearing local storage, etc.
    console.log("Logging out...");
    // For demonstration purposes, let's navigate to the login page
    navigate('/'); // Update the route to your actual login route
  };


  return (
    <div>
      <Navbar />
      <div className="adminDashboard">
        <div className="sidebar">
          <ul>
            <li>
              <button onClick={() => setSelectedOption('profile')}>MY PROFILE</button>
            </li>
            <li>
              <button onClick={() => setSelectedOption('admins')}>ADMINS</button>
            </li>
            <li>
              <button onClick={() => setSelectedOption('teachers')}>TEACHERS</button>
            </li>
            <li>
              <button onClick={() => setSelectedOption('students')}>STUDENTS</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdmDashboard;
