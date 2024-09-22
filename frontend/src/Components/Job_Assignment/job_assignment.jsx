import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './job_assignment.css';

const Job_assignment = () => {
  const location = useLocation();
  const { functionId } = location.state;
  const [jobName, setJobName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
      jobName: jobName,
      jobDescription: jobDescription,
      functionId: Number(functionId),
    };
    
  
    console.log('Payload:', data);
  
    axios.post('http://localhost:5000/job_assignment', data)
      .then(response => {
        console.log('Success:');
      })
      .catch(error => {
        console.error('Error:');
      });
  };
  

  return (
    <form className="job-form" onSubmit={handleSubmit}>
     <div className="form-group">
        <label className="form-label">
          Enter the job name:
          <input
            type="text"
            className="form-input-text"
            value={jobName}
            onChange={(e)=>setJobName(e.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Enter the job description:
          <input
            type="text"
            className="form-input-text"
            value={jobDescription}
            onChange={(e)=>setJobDescription(e.target.value)}
          />
        </label>
      </div>
      <button type="submit" className="submit-button">Assign</button>
    </form>
  );
};

export default Job_assignment;
