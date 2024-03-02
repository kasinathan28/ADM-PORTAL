import React, { useEffect, useState } from 'react';
import './Certificates.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Certificates() {
    const{id} = useParams()
    console.log(id);
    const addCertificateAPI = `http://localhost:5000/addCertificate/${id}`
    const getCertificateAPI = `http://localhost:5000/getCertificate/${id}`

  const [showPopup, setShowPopup] = useState(false);
  const [studentData,setstudentData] = useState([])

  const [certificateData, setCertificateData] = useState({
    certificateName: '',
    grade: '',
    file: null
  });

  const handleAddCertificateClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('certificateName', certificateData.certificateName);
      formData.append('grade', certificateData.grade);
      formData.append('file', certificateData.file);
  
      const response = await axios.post(addCertificateAPI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
  
      console.log(response.data);
      console.log('Certificate uploaded successfully');
  
      // Call the API to calculate activity points
  
      setCertificateData({
        certificateName: '',
        grade: '',
        file: null
      });
      setShowPopup(false);
    } catch (error) {
      console.error('Error uploading certificate:', error.message);
    }
  };
  
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCertificateData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCertificateData(prevData => ({
      ...prevData,
      file
    }));
  };


  const getCertificate=async()=>{
    try{
      const response = await axios.get(getCertificateAPI)
      console.log(response.data);
      setstudentData(response.data)
      console.log(studentData);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
   getCertificate();
  },[])

  return (
    <>
      <div className="card">
        <div className="plus-sign">
          <button className='button' onClick={handleAddCertificateClick}>+</button>
        </div>
        <div className="text">Add Certificates</div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label" htmlFor="certificateName">
                  Certificate Name
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    id="certificateName"
                    name="certificateName"
                    value={certificateData.certificateName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="label" htmlFor="grade">
                  Grade
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    id="grade"
                    name="grade"
                    value={certificateData.grade}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="label" htmlFor="file">
                  Upload Certificate
                </label>
                <div className="input-container">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="btn-container">
                <button type="submit" className="btn btn-primary">
                  Add Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )
      }
    <div className="certificate-container">
    {studentData ? (
  studentData.map((certificate, index) => (
    <div key={index} className="certificate-card">
      <h2>{certificate.certificateName}</h2>
      <a
        href={`http://localhost:5000/${certificate.certificateUrl}`}
        download
      >
        Download
      </a>
      <div className="certificate-details">
        <p>Grade: {certificate.grade}</p>
      </div>
    </div>
  ))
) : (
  <p>No certificates found</p>
)}

</div>
    </>
  );
}

export default Certificates;
