import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './functionPage.css'; 

const FunctionList = () => {
  const [buildings, setBuildings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('https://cms-fyp-ten.vercel.app//functionPage')
      .then(response => {
        console.log('Fetched data:', response.data);
        setBuildings(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  const handlenavigate = (id) => {
    navigate('/function', { state: { buildingId: id } });
  };

  return (
    <div className="container">
      <h2 className="title">Please select the building to which the function will be assigned: </h2>
      {buildings.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
                <th className="th">No</th>
                <th className="th">Building ID</th>
                <th className="th">Building Name</th>
                <th className="th">No of Floors</th>
            </tr>
          </thead>
          <tbody>
            {buildings.map((func, index) => (
              <tr key={index} className="tr">
                <td className="td" onClick={()=>handlenavigate(func.building_id)}>{index+1}</td>
                <td className="td" onClick={()=>handlenavigate(func.building_id)}>{func.building_id}</td>
                <td className="td" onClick={()=>handlenavigate(func.building_id)}>{func.building_name}</td>
                <td className="td" onClick={()=>handlenavigate(func.building_id)}>{func.no_floors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="noData">No functions building found</p>
      )}
    </div>
  );
};

export default FunctionList;
