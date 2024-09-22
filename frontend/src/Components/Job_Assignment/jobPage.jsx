import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './jobPage.css'; 

const JobPage = () => {
  const [functions, setFunctions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('https://cms-fyp-ten.vercel.app//jobPage')
      .then(response => {
        console.log('Fetched data:', response.data);
        setFunctions(response.data); 
      })    
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  const handlenavigate = (id) => {
    navigate('/job_assignment', { state: { functionId: id } });
  };

  return (
    <div className="container">
      <h2 className="title">Please select the Function which you want to assign job: </h2>
      {functions.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
                <th className="th">No</th>
                <th className="th">Function Name</th>
                <th className="th">Person Name</th>
            </tr>
          </thead>
          <tbody>
            {functions.map((func, index) => (
              <tr key={index} className="tr">
                <td className="td" onClick={()=>handlenavigate(func.function_id)}>{index+1}</td>
                <td className="td" onClick={()=>handlenavigate(func.function_id)}>{func.function_name}</td>
                <td className="td" onClick={()=>handlenavigate(func.function_id)}>{func.person_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="noData">No functions data found</p>
      )}
    </div>
  );
};

export default JobPage;
