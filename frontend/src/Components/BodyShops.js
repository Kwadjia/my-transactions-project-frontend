import React, { useState } from 'react';
import '../Styling/BodyShops.css'; 
import logo from '../Images/BSBai.png'; 

const BodyShops = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [bodyShops, setBodyShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch user's current location using the Geolocation API
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          setError('Error fetching location: ' + err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  // Function to call the Rails endpoint with the latitude and longitude
  const fetchBodyShops = () => {
    if (!latitude || !longitude) {
      setError('Please provide both latitude and longitude.');
      return;
    }
    setLoading(true);
    setError('');
    // Adjust the URL as needed; if running React locally and Rails in a container, use localhost here.
    fetch(`http://localhost:3000/body_shops/search?latitude=${latitude}&longitude=${longitude}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBodyShops(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching body shops: ' + err.message);
        setLoading(false);
      });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBodyShops();
  };

  return (
    <div className="bodyShopsContainer">
      <img src={logo} alt="Company Logo" className="logo" />

      <h2>Find Nearby Body Shops</h2>

      <button className="locationButton" onClick={fetchCurrentLocation}>
        Use My Current Location
      </button>

      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="latitude">Latitude:</label>
          <input
            id="latitude"
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="longitude">Longitude:</label>
          <input
            id="longitude"
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>

        <button type="submit" className="submitButton">
          Find Body Shops
        </button>
      </form>

      {loading && <p className="loadingMessage">Loading...</p>}
      {error && <p className="errorMessage">{error}</p>}

      {bodyShops.length > 0 && (
        <ul className="bodyShopsList">
          {bodyShops.map((shop, index) => (
            <li key={index}>
              <strong>{shop.displayName?.text || 'Unknown Shop'}</strong>
              <br />
              {shop.formattedAddress || 'No Address'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BodyShops;
