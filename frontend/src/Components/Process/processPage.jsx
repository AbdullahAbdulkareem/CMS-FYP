import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProcessPage = () => {
  const [process, setProcess] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/processPage')
      .then(response => {
        console.log('Fetched data:', response.data);
        setProcess(response.data); 
      })    
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  const handlenavigate = (proces) => {
    navigate('/process', { state: { process: proces } });
  };

  return (
    <div className="container">
      <h2 className="title">Please select the process to assign tasks: </h2>
      <button className="create-button" onClick={() => navigate('/create_process')}>Create Process</button>
      {process.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
                <th className="th">No</th>
                <th className="th">Process ID</th>
                <th className="th">Process Name</th>
                <th className="th">No of Tasks</th>
                <th className="th">Complete time</th>
                <th className="th">Building ID</th>
            </tr>
          </thead>
          <tbody>
            {process.map((proces, index) => (
              <tr key={index} className="tr">
                <td className="td" onClick={()=>handlenavigate(proces)}>{index+1}</td>
                <td className="td" onClick={()=>handlenavigate(proces)}>{proces.process_id}</td>
                <td className="td" onClick={()=>handlenavigate(proces)}>{proces.process_name}</td>
                <td className="td" onClick={()=>handlenavigate(proces)}>{proces.no_tasks}</td>
                <td className="td" onClick={()=>handlenavigate(proces)}>{proces.complete_time}</td>
                <td className="td" onClick={()=>handlenavigate(proces)}>{proces.building_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="noData">No process data found</p>
      )}
    </div>
  );
};

export default ProcessPage;
