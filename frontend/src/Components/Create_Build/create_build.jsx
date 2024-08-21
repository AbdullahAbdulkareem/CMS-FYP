import React, { useState } from 'react';
import axios from 'axios';
import './create_build.css';

const BuildingForm = () => {
  const [numFloors, setnumFloors] = useState('');
  const [roomsPerFloor, setRoomsPerFloor] = useState([]);
  axios.defaults.withCredentials = true;
  const handleFloorChange = (event) => {
    const value = event.target.value;
    setnumFloors(value);

    const newRoomsPerFloor = Array.from({ length: value }, () => '');
    setRoomsPerFloor(newRoomsPerFloor);
  }

  const handleRoomChange = (floorIndex, event) => {
  const value = Number(event.target.value); // Convert input value to a number
  setRoomsPerFloor((prevRooms) =>
    prevRooms.map((rooms, index) => (index === floorIndex ? value : rooms))
  );
};

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
      totalFloors: Number(numFloors),
      roomsPerFloor: roomsPerFloor.map(Number), 
    };
    
  
    console.log('Payload:', data);
  
    axios.post('https://cms-fyp-ten.vercel.app/create_build', data.json())
      .then(response => {
        console.log('Success:');
      })
      .catch(error => {
        console.error('Error:');
      });
  };
  

  return (
    <form className="building-form" onSubmit={handleSubmit}>
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

      <button type="submit" className="submit-button">Generate</button>
    </form>
  );
};

export default BuildingForm;
