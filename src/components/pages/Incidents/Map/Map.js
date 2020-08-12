import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

import { axiosBase } from '../../../../utils/axiosBase';

const Map = props => {
  const [incidents, setIncidents] = useState([]);
  const center = {
    lat: 38,
    lng: 267,
  };
  console.log(window.screen.width);
  let zoom = 3;
  if (window.screen.width >= 768) {
    zoom = 4;
  }
  if (window.screen.width >= 1200) {
    zoom = 5;
  }

  useEffect(() => {
    axiosBase()
      .get('/incidents')
      .then(res => {
        console.log(res);
        setIncidents(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const createMarkers = incidents.map(incident => {
    return (
      <Marker
        key={incident.latitude + incident.longitude}
        lat={incident.latitude}
        lng={incident.longitude}
        text="Incident"
      />
    );
  });
  console.log(incidents, 'STATE');
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {createMarkers}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
