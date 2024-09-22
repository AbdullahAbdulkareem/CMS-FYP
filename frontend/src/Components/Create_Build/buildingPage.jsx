import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './buildingPage.css';

const ProcessPage = () => {
  const [building, setBuilding] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/buildingPage')
      .then(response => {
        console.log('Fetched data:', response.data);
        setBuilding(response.data); 
      })    
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 


  return (
    <div className="container">
      <h2 className="title">Buildings Informations</h2>
      <button className="create-button" onClick={() => navigate('/create_build')}>Create Building</button>
      {building.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
                <th className="th">No</th>
                <th className="th">Building ID</th>
                <th className="th">Building Name</th>
                <th className="th">No of Floors</th>
                <th className="th">No of Rooms</th>
                <th className="th">No of Functions</th>
            </tr>
          </thead>
          <tbody>
            {building.map((build, index) => (
              <tr key={index} className="tr">
                <td className="td" >{index+1}</td>
                <td className="td" >{build.building_id}</td>
                <td className="td" >{build.building_name}</td>
                <td className="td" >{build.no_floors}</td>
                <td className="td" >{build.no_rooms}</td>
                <td className="td" >{build.no_functions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="noData">No Building data found</p>
      )}
    </div>
  );
};

export default ProcessPage;
