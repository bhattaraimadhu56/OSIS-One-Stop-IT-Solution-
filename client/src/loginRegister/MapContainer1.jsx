import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useState, useEffect } from "react";

export const MapContainer = () => {
  // 3 Infobox
  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };
  // Step 2 Definfe location or get from api
  const locations = [
    {
      name: "Location 1",
      location: {
        lat: 41.3954,
        lng: 2.162,
      },
    },
    {
      name: "Location 2",
      location: {
        lat: 41.3917,
        lng: 2.1649,
      },
    },
    {
      name: "Location 3",
      location: {
        lat: 41.3773,
        lng: 2.1585,
      },
    },
    {
      name: "Location 4",
      location: {
        lat: 41.3797,
        lng: 2.1682,
      },
    },
    {
      name: "Location 5",
      location: {
        lat: 41.4055,
        lng: 2.1915,
      },
    },
  ];

  //   const mapStyles = {
  //     height: "100vh",
  //     width: "100%",
  //   };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

  return (
    // If there is no use of google api key in index.html then use <LoadScript googleMapsApiKey="AIzaSyDxTV3a6oL6vAaRookXxpiJhynuUpSccjY" ></LoadScript>
    // <LoadScript googleMapsApiKey="AIzaSyDxTV3a6oL6vAaRookXxpiJhynuUpSccjY">
    <GoogleMap
      mapContainerStyle={{
        height: "100vh",
        width: "100%",
      }}
      zoom={15}
      center={defaultCenter}
    >
      {/* step 3.1 */}
      {locations.map((item, key) => {
        return (
          <Marker
            key={item.name}
            position={item.location}
            onClick={() => onSelect(item)}
          />
        );
      })}
      {selected.location && (
        <InfoWindow
          position={selected.location}
          clickable={true}
          onCloseClick={() => setSelected({})}
        >
          <p>{selected.name}</p>
        </InfoWindow>
      )}
    </GoogleMap>
    // </LoadScript>
  );
};
