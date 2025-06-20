import React from 'react';
import { Marker } from 'react-native-maps';
import { Polygon } from 'react-native-maps';  // Import the Polygon component

const CrimeTriangle = ({ event, onPress }) => {
  const { lat, lon, type } = event;

  // Define the triangle's coordinates (in this case, an equilateral triangle)
  const triangleCoords = [
    { latitude: lat, longitude: lon }, // Apex of the triangle
    { latitude: lat + 0.001, longitude: lon - 0.001 }, // Bottom left corner
    { latitude: lat + 0.001, longitude: lon + 0.001 }, // Bottom right corner
  ];

  // Determine the color based on crime type
  const fillColor = getColorFromProb(type);

  return (
    <>
      {/* Invisible marker to capture onPress */}
      <Marker
        coordinate={{ latitude: lat, longitude: lon }}
        onPress={() => onPress(event)} // Pass the event to the onPress callback
        opacity={0}
      />

      {/* Draw the triangle using Polygon */}
      <Polygon
        coordinates={triangleCoords}
        fillColor={fillColor}
        strokeColor="black" // Outline color
        strokeWidth={2}     // Outline thickness
      />
    </>
  );
};

// Helper function for determining color based on crime probability (adjust if needed)
const getColorFromProb = (type) => {
  if (type === 'ASSAULT') return 'rgba(255,0,0,0.6)';      // red
  if (type === 'THEFT') return 'rgba(255,165,0,0.6)';    // orange
  return 'rgba(255,255,0,0.6)';                    // yellow
};

export default CrimeTriangle;