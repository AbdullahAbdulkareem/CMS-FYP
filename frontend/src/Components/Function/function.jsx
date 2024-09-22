import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './function.css';

const Functions = () => {
  const location = useLocation();
  const { buildingId } = location.state;

  const [personName, setPersonName] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [noOfJobs, setNoOfJobs] = useState();
  
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      personName: personName,
      functionName: functionName, 
      noOfJobs: Number(noOfJobs), 
      buildingId: Number(buildingId),
    };
    
  
    console.log('Payload:', data);
  
    axios.post('http://localhost:5000/function', data)
      .then(response => {
        console.log('Success:');
      })
      .catch(error => {
        console.error('Error:');
      });
  };
  

  return (
    <form className="function-form" onSubmit={handleSubmit}>
     <div className="form-group">
        <label className="form-label">
          Enter the person name:
          <input
            type="text"
            className="form-input-text"
            value={personName}
            onChange={(e)=>setPersonName(e.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Enter the function name:
          <input
            type="text"
            className="form-input-text"
            value={functionName}
            onChange={(e)=>setFunctionName(e.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Number of jobs:
          <input
            type="number"
            className="form-input"
            value={noOfJobs}
            onChange={(e)=>setNoOfJobs(e.target.value)}
            min="1" 
          />
        </label>
      </div>

      

      <button type="submit" className="function-submit-button">Assign</button>
    </form>
  );
};

export default Functions;
