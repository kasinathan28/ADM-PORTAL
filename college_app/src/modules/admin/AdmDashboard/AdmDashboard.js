import React, { useState } from 'react';
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
