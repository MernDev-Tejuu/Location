import React, { useState } from 'react';
import './App.css';
import axios from 'axios'; // Import Axios
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [locationData, setLocationData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image selection
  function handleImageSelect(event) {
    const file = event.target.files[0];
    setSelectedImage(file);
  }

  function fetchLocationData() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setLocationData(data);
          
        });
    });
  }

  // Function to send locationData and image to the backend
  function sendLocationDataToBackend() {
    if(!locationData){
      toast.error('Click Getlocation');
      return;
    }
    if (!selectedImage) {
      toast.error('Choose any Image');
      return;
    }
    console.log(selectedImage.file)
     //creating all files in the form of json 
     const allData = {address:locationData.address,imageName:selectedImage.name,type:selectedImage.type,size:selectedImage.size}
      axios
      .post('http://localhost:5000/running', allData, {
        headers: {
          method:"POST",
          'Content-Type': 'application/json', // Set the content type to multipart/form-data
          
        },
      })
      .then((response) => {
        toast.success(response.data.message)
      })
      .catch((error) => {
        toast.error(error)
      });

  }

  return (
    <>
      <h1>Location Information</h1>

    
      <input type="file" accept="image/*" onChange={handleImageSelect} />

      <button onClick={fetchLocationData}>Get Location Info</button>
     <button onClick={sendLocationDataToBackend}>Send Data To Backend</button>
      {locationData && (
        <div>
          <p>Address: {locationData.display_name}</p>
          {/* You can display more location data here as needed */}
        </div>
      )}

      {/* Display the selected image */}
      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" width="200" />
        </div>
      )}
      <ToastContainer/>
    </>
  );
}

export default App;
