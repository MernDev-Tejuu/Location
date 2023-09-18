import React, { useState } from 'react';
import './App.css';

function App() {
  const [locationData, setLocationData] = useState(null);

  function fetchLocationData() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setLocationData(data);
          console.log(data)
        });
        
    });
  }

  return (
    <>
      <h1>Location Information</h1>

      <button onClick={fetchLocationData}>Get Location Info</button>

      {locationData && (
        <div>
          <p>Address: {locationData.display_name}</p>
          
          <p></p>
        </div>
      )}
    </>
  );
}

export default App;
