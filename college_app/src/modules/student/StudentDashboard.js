import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './StudentDashboard.css';
import Navbar from '../../components/navbar/Navbar';
import StudentProfile from './components/studentprofile/StudentProfile';
import Certificates from './components/certificates/Certificates';

function StudentDashboard() {
  const { id } = useParams();
  console.log(id);
  const [selectedOption, setSelectedOption] = useState(null);

  const renderContent = () => {
    switch (selectedOption) {
      case 'profile':
        return <StudentProfile id={id} />;
      case 'certificates':
        return <Certificates id = {id}/> ;
    
      default:
        return <div>Select an option to view content</div>;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="studentDashboard">
        <div className="sidebar">
          <ul>
            <li>
              <button onClick={() => setSelectedOption('profile')}>MY PROFILE</button>
            </li>
            <li>
              <button onClick={() => setSelectedOption('certificates')}>CERTIFICATES</button>
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

export default StudentDashboard;
