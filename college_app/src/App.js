import './App.css';
import HomePage from './modules/common/homePage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './modules/common/loginPage/Login';
import AdmDashboard from './modules/admin/AdmDashboard/AdmDashboard';
import TeacherDashboard from './modules/teacher/TeacherDashboard';
import StudentDashboard from './modules/student/StudentDashboard';
import AdmProfile from './modules/admin/components/AdmProfile/AdmProfile';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/auth' element={<Login/>}/>
        <Route path='/admdash/:id' element={<AdmDashboard/>}/>
        <Route path='/thrDash/:id' element={<TeacherDashboard/>}/>
        <Route path='/stdDash/:id' element={<StudentDashboard/>}/>
        <Route path='/admprofile' element={<AdmProfile/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
