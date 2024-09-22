import React, { useState,useEffect } from 'react';
import axios from 'axios';
import NavBar from "../Navbar/NavBar";
import Sidebar from "../Sidebar/SideBar";
import './create_build.css';

const BuildingForm = () => {
  const [buildingName, setBuildingName] = useState('');
  const [numFloors, setnumFloors] = useState('');
  const [roomsPerFloor, setRoomsPerFloor] = useState([]);
  const [noFunctions, setNoFunctions] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    
    setIsAuthenticated(false);
    localStorage.removeItem("profileData");
  
    //navigate('/login');
  };
  
  axios.defaults.withCredentials = true;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleFloorChange = (event) => {
    const value = event.target.value;
    setnumFloors(value);

    const newRoomsPerFloor = Array.from({ length: value }, () => '');
    setRoomsPerFloor(newRoomsPerFloor);   
  }

  
  const handleRoomChange = (floorIndex, event) => {
  const value = Number(event.target.value);

  setRoomsPerFloor((prevRooms) =>
    prevRooms.map((rooms, index) => (index === floorIndex ? value : rooms))
  );
};

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!buildingName ) 
      {
        alert("Please enter a building name");
        return;
      }
    else if(!numFloors) {
      alert("Please enter the number of floors");
      return;
    }
    else if(roomsPerFloor.includes('')) 
      {
        alert("Please enter the number of rooms on each floor");
      }
  
    
    const data = {
      buildingName: buildingName,
      totalFloors: Number(numFloors),
      roomsPerFloor: roomsPerFloor.map(Number), 
      noFunctions: Number(noFunctions),
    };
    
    axios.post('http://localhost:5000/create_build', data)
      .then(response => {
        console.log('Success:');
      })
      .catch(error => {
        console.error('Error:');
      });
  };
  

  return (
    <>
    <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
    <NavBar isOpen={isOpen} />
    <form className="building-form" onSubmit={handleSubmit}>
     <div className="form-group">
        <label className="form-label">
          Enter the building name:
          <input
            type="text"
            className="form-input-text"
            value={buildingName}
            onChange={(e)=>setBuildingName(e.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Enter the number of functions in the building:
          <input
            type="number"
            className="form-input"
            value={noFunctions}
            onChange={(e)=>setNoFunctions(e.target.value)}
            min="1"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Number of Floors:
          <input
            type="number"
            className="form-input"
            value={numFloors}
            onChange={handleFloorChange}
            min="1"
          />
        </label>
      </div>

      {numFloors && roomsPerFloor.map((floorData, index) => (
        <div className="form-group" key={index}>
          <label className="form-label">
            Rooms on Floor {index + 1}:
            <input
              type="number"
              className="form-input"
              value={floorData.rooms}
              onChange={(event) => handleRoomChange(index, event)}
              min="1"
              max="4"
            />
          </label>
        </div>
      ))}

      <button type="submit" className="build-submit-button">Generate</button>
    </form>
  </>
  );
};

export default BuildingForm;
