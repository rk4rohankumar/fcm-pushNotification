import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const LocationTracker = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('location-channel');
    channel.bind('update', (data) => {
        console.log('Received update:', data); // Add this for debugging
        setLocations((prev) => [...prev, data]);
      });
      

    return () => {
      pusher.unsubscribe('location-channel');
      pusher.disconnect();
    };
  }, []);

  const updateLocation = async () => {
    try {
      const response = await fetch('http://localhost:5000/update-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user1',
          latitude: 12.9716,
          longitude: 77.5946,
        }),
      });

      if (response.ok) {
        console.log('Location updated');
      } else {
        console.error('Failed to update location');
      }
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  return (
    <div>
      <h2>Location Updates</h2>
      <ul>
        {locations.map((loc, index) => (
          <li key={index}>
            User {loc.userId}: {loc.latitude}, {loc.longitude}
          </li>
        ))}
      </ul>
      <button onClick={updateLocation}>Update Location</button>
    </div>
  );
};

export default LocationTracker;
