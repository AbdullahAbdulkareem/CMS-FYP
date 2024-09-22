import React, { useState } from 'react';
import axios from 'axios';

const CreateProcess = () => {
  const [processName, setProcessName] = useState('');
  const [buildingID, setBuildingID] = useState();

  axios.defaults.withCredentials = true;


  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
      processName,
      buildingID,
    };
    
    console.log('Payload:', data);
  
    axios.post('http://localhost:5000/createProcess', data)
      .then(response => {
        console.log('Success:', response);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">
          Enter the process name:
          <input
            type="text"
            className="form-input-text"
            value={processName}
            onChange={(e) => setProcessName(e.target.value)}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Enter the building ID:
          <input
            type="number"
            className="form-input-text"
            value={buildingID}
            onChange={(e) => setBuildingID(e.target.value)}
          />
        </label>
      </div>
      <button type="submit" className="submit-button">Create</button>
    </form>
  );
};

export default CreateProcess;
