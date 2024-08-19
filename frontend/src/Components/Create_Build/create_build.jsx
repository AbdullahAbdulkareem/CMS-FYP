import React, { useState } from 'react';
import './create_build.css';

const BuildingForm = () => {
  const [numFloors, setnumFloors] = useState('');
  const [roomsPerFloor, setRoomsPerFloor] = useState([]);

  const handleFloorChange = (event) => {
    const value = event.target.value;
    setnumFloors(value);

    const newRoomsPerFloor = Array.from({ length: value }, (_, i) => ({
      floor: i,
      rooms: '',
    }));
    setRoomsPerFloor(newRoomsPerFloor);
  };

  const handleRoomChange = (floorIndex, event) => {
    const value = event.target.value;
    setRoomsPerFloor((prevRooms) =>
      prevRooms.map((item, index) =>
        index === floorIndex ? { ...item, rooms: value } : item
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
      totalFloors: Number(numFloors),
      roomsPerFloor: roomsPerFloor.map((floorData) => [floorData.floor, Number(floorData.rooms)]),
    };
  
    console.log('Payload:', data);
  
      fetch('http://localhost:5000/create_build', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
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
